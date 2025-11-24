// Multi-Agent System Types for AgroIO

export type AgentType =
  | 'crop-advisor'
  | 'weather-analysis'
  | 'disease-detection'
  | 'companion-planting'
  | 'garden-design'
  | 'database-management'
  | 'orchestrator';

export type AgentStatus = 'idle' | 'thinking' | 'processing' | 'completed' | 'error';

export interface AgentMessage {
  id: string;
  agentType: AgentType;
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface AgentResponse {
  agentType: AgentType;
  content: string;
  confidence: number; // 0-1
  suggestions?: string[];
  data?: Record<string, any>;
  needsMoreInfo?: boolean;
  followUpQuestions?: string[];
}

export interface AgentContext {
  userQuery: string;
  conversationHistory: AgentMessage[];
  currentProduct?: any; // AgricultureProduct
  userLocation?: {
    region: string;
    climate: string;
    soilType?: string;
  };
  currentDate?: Date;
  additionalData?: Record<string, any>;
}

export interface Agent {
  type: AgentType;
  name: string;
  description: string;
  status: AgentStatus;
  process: (context: AgentContext) => Promise<AgentResponse>;
  canHandle: (query: string) => boolean;
}

export interface OrchestratorStrategy {
  parallel: boolean; // Execute agents in parallel or sequential
  requiredAgents?: AgentType[]; // Which agents must respond
  optionalAgents?: AgentType[]; // Which agents can optionally respond
  aggregationMethod: 'merge' | 'prioritize' | 'vote'; // How to combine responses
}

export interface MultiAgentResponse {
  primaryResponse: string;
  agentResponses: AgentResponse[];
  confidence: number;
  timestamp: Date;
  strategy: OrchestratorStrategy;
}
