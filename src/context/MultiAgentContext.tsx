import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type {
  AgentContext,
  AgentMessage,
  MultiAgentResponse,
  Agent,
} from '../types/agents';
import { AgentOrchestrator } from '../agents/AgentOrchestrator';

interface MultiAgentContextType {
  // State
  messages: AgentMessage[];
  isProcessing: boolean;
  currentResponse: MultiAgentResponse | null;
  orchestrator: AgentOrchestrator;

  // Actions
  sendQuery: (query: string, additionalContext?: Partial<AgentContext>) => Promise<void>;
  clearMessages: () => void;
  getActiveAgents: () => Agent[];
  previewAgentsForQuery: (query: string) => Agent[];
}

const MultiAgentContext = createContext<MultiAgentContextType | undefined>(undefined);

export const useMultiAgent = () => {
  const context = useContext(MultiAgentContext);
  if (!context) {
    throw new Error('useMultiAgent must be used within MultiAgentProvider');
  }
  return context;
};

interface MultiAgentProviderProps {
  children: ReactNode;
  initialContext?: Partial<AgentContext>;
}

export const MultiAgentProvider: React.FC<MultiAgentProviderProps> = ({
  children,
  initialContext = {},
}) => {
  const [orchestrator] = useState(() => new AgentOrchestrator());
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<MultiAgentResponse | null>(null);

  const sendQuery = useCallback(
    async (query: string, additionalContext: Partial<AgentContext> = {}) => {
      setIsProcessing(true);

      // Add user message
      const userMessage: AgentMessage = {
        id: `user-${Date.now()}`,
        agentType: 'orchestrator',
        content: query,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);

      try {
        // Build context
        const context: AgentContext = {
          userQuery: query,
          conversationHistory: messages,
          currentDate: new Date(),
          ...initialContext,
          ...additionalContext,
        };

        // Process with orchestrator
        const response = await orchestrator.process(context);
        setCurrentResponse(response);

        // Add agent responses to message history
        const agentMessages: AgentMessage[] = response.agentResponses.map((agentResp, idx) => ({
          id: `agent-${agentResp.agentType}-${Date.now()}-${idx}`,
          agentType: agentResp.agentType,
          content: agentResp.content,
          timestamp: response.timestamp,
          metadata: {
            confidence: agentResp.confidence,
            suggestions: agentResp.suggestions,
            data: agentResp.data,
          },
        }));

        // Add aggregated response
        const aggregatedMessage: AgentMessage = {
          id: `orchestrator-${Date.now()}`,
          agentType: 'orchestrator',
          content: response.primaryResponse,
          timestamp: response.timestamp,
          metadata: {
            confidence: response.confidence,
            strategy: response.strategy,
            agentCount: response.agentResponses.length,
          },
        };

        setMessages(prev => [...prev, ...agentMessages, aggregatedMessage]);
      } catch (error) {
        console.error('Error processing query:', error);

        const errorMessage: AgentMessage = {
          id: `error-${Date.now()}`,
          agentType: 'orchestrator',
          content: `❌ Si è verificato un errore durante l'elaborazione della richiesta: ${error instanceof Error ? error.message : 'Errore sconosciuto'}`,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsProcessing(false);
      }
    },
    [messages, orchestrator, initialContext]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setCurrentResponse(null);
  }, []);

  const getActiveAgents = useCallback(() => {
    return orchestrator.getAllAgents();
  }, [orchestrator]);

  const previewAgentsForQuery = useCallback(
    (query: string) => {
      return orchestrator.previewAgents(query);
    },
    [orchestrator]
  );

  const value: MultiAgentContextType = {
    messages,
    isProcessing,
    currentResponse,
    orchestrator,
    sendQuery,
    clearMessages,
    getActiveAgents,
    previewAgentsForQuery,
  };

  return (
    <MultiAgentContext.Provider value={value}>
      {children}
    </MultiAgentContext.Provider>
  );
};
