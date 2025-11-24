import type {
  Agent,
  AgentContext,
  AgentResponse,
  MultiAgentResponse,
  OrchestratorStrategy,
  AgentType,
} from '../types/agents';

import { CropAdvisorAgent } from './CropAdvisorAgent';
import { WeatherAnalysisAgent } from './WeatherAnalysisAgent';
import { DiseaseDetectionAgent } from './DiseaseDetectionAgent';
import { CompanionPlantingAgent } from './CompanionPlantingAgent';
import { GardenDesignAgent } from './GardenDesignAgent';
import { DatabaseManagementAgent } from './DatabaseManagementAgent';

export class AgentOrchestrator {
  private agents: Map<AgentType, Agent>;

  constructor() {
    this.agents = new Map();
    this.registerAgents();
  }

  private registerAgents(): void {
    const agentInstances = [
      new CropAdvisorAgent(),
      new WeatherAnalysisAgent(),
      new DiseaseDetectionAgent(),
      new CompanionPlantingAgent(),
      new GardenDesignAgent(),
      new DatabaseManagementAgent(),
    ];

    agentInstances.forEach(agent => {
      this.agents.set(agent.type, agent);
    });
  }

  /**
   * Determines which agents should handle a query
   */
  private selectAgents(context: AgentContext): Agent[] {
    const selectedAgents: Agent[] = [];

    this.agents.forEach(agent => {
      if (agent.canHandle(context.userQuery)) {
        selectedAgents.push(agent);
      }
    });

    // If no agent matches, default to CropAdvisor
    if (selectedAgents.length === 0) {
      const cropAdvisor = this.agents.get('crop-advisor');
      if (cropAdvisor) {
        selectedAgents.push(cropAdvisor);
      }
    }

    return selectedAgents;
  }

  /**
   * Determines the best strategy based on query and selected agents
   */
  private determineStrategy(
    query: string,
    selectedAgents: Agent[]
  ): OrchestratorStrategy {
    const lowerQuery = query.toLowerCase();

    // Multiple concerns require multiple agents
    const hasMultipleConcerns =
      selectedAgents.length > 2 ||
      (lowerQuery.includes('e') && selectedAgents.length > 1);

    // Disease detection often benefits from crop advisor context
    const hasDiseaseAgent = selectedAgents.some(a => a.type === 'disease-detection');
    const hasCropAgent = selectedAgents.some(a => a.type === 'crop-advisor');

    if (hasDiseaseAgent && !hasCropAgent) {
      // Add crop advisor for context
      const cropAdvisor = this.agents.get('crop-advisor');
      if (cropAdvisor) {
        selectedAgents.push(cropAdvisor);
      }
    }

    return {
      parallel: selectedAgents.length > 1 && !hasMultipleConcerns,
      requiredAgents: selectedAgents.map(a => a.type),
      aggregationMethod: this.chooseAggregationMethod(selectedAgents),
    };
  }

  private chooseAggregationMethod(
    agents: Agent[]
  ): 'merge' | 'prioritize' | 'vote' {
    // If disease detection is involved, prioritize it
    if (agents.some(a => a.type === 'disease-detection')) {
      return 'prioritize';
    }

    // If only one or two agents, merge their responses
    if (agents.length <= 2) {
      return 'merge';
    }

    // For multiple agents with different opinions, use voting
    return 'vote';
  }

  /**
   * Main orchestration method
   */
  async process(context: AgentContext): Promise<MultiAgentResponse> {
    // Track processing time for potential future metrics
    // const startTime = Date.now();

    // 1. Select appropriate agents
    const selectedAgents = this.selectAgents(context);

    // 2. Determine execution strategy
    const strategy = this.determineStrategy(context.userQuery, selectedAgents);

    // 3. Execute agents based on strategy
    let agentResponses: AgentResponse[];

    if (strategy.parallel) {
      // Execute all agents in parallel
      agentResponses = await this.executeParallel(selectedAgents, context);
    } else {
      // Execute agents sequentially (allowing context enrichment)
      agentResponses = await this.executeSequential(selectedAgents, context);
    }

    // 4. Aggregate responses
    const aggregatedResult = this.aggregateResponses(
      agentResponses,
      strategy.aggregationMethod
    );

    // Track processing time for potential future metrics
    // const processingTime = Date.now() - startTime;

    return {
      primaryResponse: aggregatedResult.content,
      agentResponses,
      confidence: aggregatedResult.confidence,
      timestamp: new Date(),
      strategy,
    };
  }

  /**
   * Execute agents in parallel
   */
  private async executeParallel(
    agents: Agent[],
    context: AgentContext
  ): Promise<AgentResponse[]> {
    const promises = agents.map(agent => agent.process(context));
    return Promise.all(promises);
  }

  /**
   * Execute agents sequentially with context enrichment
   */
  private async executeSequential(
    agents: Agent[],
    context: AgentContext
  ): Promise<AgentResponse[]> {
    const responses: AgentResponse[] = [];
    let enrichedContext = { ...context };

    for (const agent of agents) {
      const response = await agent.process(enrichedContext);
      responses.push(response);

      // Enrich context with previous agent's data
      if (response.data) {
        enrichedContext.additionalData = {
          ...enrichedContext.additionalData,
          [`${agent.type}_result`]: response.data,
        };
      }
    }

    return responses;
  }

  /**
   * Aggregate multiple agent responses into a single coherent response
   */
  private aggregateResponses(
    responses: AgentResponse[],
    method: 'merge' | 'prioritize' | 'vote'
  ): { content: string; confidence: number } {
    if (responses.length === 0) {
      return {
        content: 'Nessuna risposta disponibile.',
        confidence: 0,
      };
    }

    if (responses.length === 1) {
      return {
        content: responses[0].content,
        confidence: responses[0].confidence,
      };
    }

    switch (method) {
      case 'merge':
        return this.mergeResponses(responses);
      case 'prioritize':
        return this.prioritizeResponses(responses);
      case 'vote':
        return this.voteResponses(responses);
      default:
        return this.mergeResponses(responses);
    }
  }

  /**
   * Merge multiple responses into a comprehensive answer
   */
  private mergeResponses(
    responses: AgentResponse[]
  ): { content: string; confidence: number } {
    let mergedContent = '';
    let totalConfidence = 0;

    // Sort by agent priority
    const sortedResponses = this.sortByPriority(responses);

    sortedResponses.forEach((response, index) => {
      mergedContent += response.content;
      if (index < sortedResponses.length - 1) {
        mergedContent += '\n\n---\n\n';
      }
      totalConfidence += response.confidence;
    });

    // Add combined suggestions
    const allSuggestions = sortedResponses
      .flatMap(r => r.suggestions || [])
      .filter((s, i, arr) => arr.indexOf(s) === i) // Remove duplicates
      .slice(0, 5);

    if (allSuggestions.length > 0) {
      mergedContent += '\n\n📌 **Suggerimenti combinati:**\n';
      allSuggestions.forEach(suggestion => {
        mergedContent += `• ${suggestion}\n`;
      });
    }

    return {
      content: mergedContent,
      confidence: totalConfidence / responses.length,
    };
  }

  /**
   * Prioritize response from most relevant agent
   */
  private prioritizeResponses(
    responses: AgentResponse[]
  ): { content: string; confidence: number } {
    // Sort by confidence
    const sorted = [...responses].sort((a, b) => b.confidence - a.confidence);
    const primary = sorted[0];
    const secondary = sorted.slice(1);

    let content = primary.content;

    // Add context from other agents if relevant
    if (secondary.length > 0) {
      content += '\n\n📚 **Informazioni aggiuntive:**\n\n';
      secondary.forEach(response => {
        // Add a condensed version of secondary responses
        const preview = this.condenseResponse(response);
        if (preview) {
          content += `**${this.getAgentDisplayName(response.agentType)}:** ${preview}\n\n`;
        }
      });
    }

    return {
      content,
      confidence: primary.confidence,
    };
  }

  /**
   * Use voting mechanism for conflicting responses
   */
  private voteResponses(
    responses: AgentResponse[]
  ): { content: string; confidence: number } {
    // Weight votes by confidence - future implementation
    // const weightedResponses = responses.map(r => ({
    //   ...r,
    //   weight: r.confidence,
    // }));

    // For now, return highest confidence (in production, implement true voting)
    return this.prioritizeResponses(responses);
  }

  /**
   * Sort responses by agent priority
   */
  private sortByPriority(responses: AgentResponse[]): AgentResponse[] {
    const priority: Record<AgentType, number> = {
      'disease-detection': 1,
      'crop-advisor': 2,
      'weather-analysis': 3,
      'companion-planting': 4,
      'garden-design': 5,
      'database-management': 6,
      'orchestrator': 7,
    };

    return [...responses].sort((a, b) => {
      return (priority[a.agentType] || 99) - (priority[b.agentType] || 99);
    });
  }

  /**
   * Condense a response to its key points
   */
  private condenseResponse(response: AgentResponse): string {
    // Extract first meaningful paragraph or suggestion
    const lines = response.content.split('\n').filter(line => line.trim());

    // Find first substantial content (not headers)
    for (const line of lines) {
      if (line.length > 50 && !line.startsWith('#') && !line.startsWith('**')) {
        return line.trim();
      }
    }

    // Fallback to suggestions
    if (response.suggestions && response.suggestions.length > 0) {
      return response.suggestions[0];
    }

    return '';
  }

  /**
   * Get display name for agent type
   */
  private getAgentDisplayName(agentType: AgentType): string {
    const names: Record<AgentType, string> = {
      'crop-advisor': 'Esperto Coltivazioni',
      'weather-analysis': 'Analista Meteo',
      'disease-detection': 'Diagnosi Malattie',
      'companion-planting': 'Consociazioni',
      'garden-design': 'Progettazione Orto',
      'database-management': 'Gestione Database',
      'orchestrator': 'Coordinatore',
    };

    return names[agentType] || agentType;
  }

  /**
   * Get specific agent by type
   */
  getAgent(type: AgentType): Agent | undefined {
    return this.agents.get(type);
  }

  /**
   * Get all registered agents
   */
  getAllAgents(): Agent[] {
    return Array.from(this.agents.values());
  }

  /**
   * Check which agents would handle a query (without executing)
   */
  previewAgents(query: string): Agent[] {
    const context: AgentContext = {
      userQuery: query,
      conversationHistory: [],
    };
    return this.selectAgents(context);
  }
}
