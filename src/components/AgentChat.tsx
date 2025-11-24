import React, { useState, useRef, useEffect } from 'react';
import { useMultiAgent } from '../context/MultiAgentContext';
import type { AgentType } from '../types/agents';

const AgentChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [showAgentPreview, setShowAgentPreview] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isProcessing,
    currentResponse,
    sendQuery,
    clearMessages,
    previewAgentsForQuery,
  } = useMultiAgent();

  const previewAgents = input ? previewAgentsForQuery(input) : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const query = input.trim();
    setInput('');
    setShowAgentPreview(false);

    await sendQuery(query);
  };

  const getAgentIcon = (agentType: AgentType): string => {
    const icons: Record<AgentType, string> = {
      'crop-advisor': '🌱',
      'weather-analysis': '🌤️',
      'disease-detection': '🔬',
      'companion-planting': '🌿',
      'garden-design': '🏡',
      'database-management': '💾',
      'orchestrator': '🤖',
    };
    return icons[agentType] || '💬';
  };

  const getAgentColor = (agentType: AgentType): string => {
    const colors: Record<AgentType, string> = {
      'crop-advisor': 'bg-green-100 border-green-300',
      'weather-analysis': 'bg-blue-100 border-blue-300',
      'disease-detection': 'bg-red-100 border-red-300',
      'companion-planting': 'bg-purple-100 border-purple-300',
      'garden-design': 'bg-yellow-100 border-yellow-300',
      'database-management': 'bg-indigo-100 border-indigo-300',
      'orchestrator': 'bg-gray-100 border-gray-300',
    };
    return colors[agentType] || 'bg-gray-100 border-gray-300';
  };

  const exampleQueries = [
    'Quando posso seminare i pomodori?',
    'Come curo le foglie gialle del basilico?',
    'Quali piante posso consociare con le carote?',
    'Come progetto un orto di 20 mq?',
    'Come organizzo i dati del mio raccolto?',
    'Che verdure seminare in autunno?',
  ];

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">🤖 Multi-Agent Assistant</h2>
          <p className="text-sm text-gray-600">
            Assistente agricolo con agenti specializzati
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearMessages}
            className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          >
            Cancella chat
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌾</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Benvenuto nell'assistente agricolo multi-agente!
            </h3>
            <p className="text-gray-600 mb-6">
              Fai una domanda e gli agenti specializzati collaboreranno per darti la migliore risposta.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl mx-auto">
              {exampleQueries.map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(query)}
                  className="px-4 py-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg text-left text-sm transition-colors"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, idx) => {
          const isUser = message.agentType === 'orchestrator' && message.content.length < 200;
          const isAggregated = message.agentType === 'orchestrator' && message.metadata?.strategy;

          return (
            <div
              key={message.id}
              className={`flex ${isUser && messages[idx - 1]?.agentType !== 'orchestrator' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] ${
                  isUser
                    ? 'bg-green-600 text-white'
                    : getAgentColor(message.agentType)
                } rounded-lg p-4 border-2`}
              >
                {!isUser && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{getAgentIcon(message.agentType)}</span>
                    <span className="font-semibold text-sm">
                      {message.agentType === 'orchestrator' && isAggregated
                        ? 'Risposta Aggregata'
                        : message.agentType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    {message.metadata?.confidence && (
                      <span className="ml-auto text-xs opacity-75">
                        {Math.round(message.metadata.confidence * 100)}% fiducia
                      </span>
                    )}
                  </div>
                )}
                <div className="prose prose-sm max-w-none">
                  {message.content.split('\n').map((line, i) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <h4 key={i} className="font-bold my-2">
                          {line.replace(/\*\*/g, '')}
                        </h4>
                      );
                    }
                    if (line.startsWith('# ')) {
                      return (
                        <h3 key={i} className="text-lg font-bold my-2">
                          {line.substring(2)}
                        </h3>
                      );
                    }
                    if (line.trim().startsWith('•')) {
                      return (
                        <li key={i} className="ml-4">
                          {line.trim().substring(1).trim()}
                        </li>
                      );
                    }
                    if (line.trim() === '---') {
                      return <hr key={i} className="my-4 border-gray-300" />;
                    }
                    return line.trim() ? (
                      <p key={i} className="my-1">
                        {line}
                      </p>
                    ) : null;
                  })}
                </div>
                {message.metadata?.suggestions && (
                  <div className="mt-3 pt-3 border-t border-opacity-20 border-gray-400">
                    <p className="text-xs font-semibold mb-1">💡 Suggerimenti:</p>
                    <ul className="text-xs space-y-1">
                      {message.metadata.suggestions.slice(0, 3).map((suggestion: string, i: number) => (
                        <li key={i} className="opacity-90">
                          • {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <div className="animate-spin h-5 w-5 border-2 border-green-600 border-t-transparent rounded-full"></div>
                <span className="text-sm text-gray-600">Gli agenti stanno elaborando...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Agent Preview */}
      {showAgentPreview && previewAgents.length > 0 && (
        <div className="mb-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs font-semibold text-blue-800 mb-2">
            Agenti che risponderanno:
          </p>
          <div className="flex gap-2 flex-wrap">
            {previewAgents.map(agent => (
              <span
                key={agent.type}
                className="px-2 py-1 bg-white border border-blue-300 rounded text-xs"
              >
                {getAgentIcon(agent.type)} {agent.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => {
            setInput(e.target.value);
            setShowAgentPreview(e.target.value.length > 3);
          }}
          placeholder="Fai una domanda sull'agricoltura..."
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
          disabled={isProcessing}
        />
        <button
          type="submit"
          disabled={!input.trim() || isProcessing}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? '...' : 'Invia'}
        </button>
      </form>

      {/* Current Response Stats */}
      {currentResponse && (
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600">
          <div className="flex items-center justify-between">
            <span>
              Agenti utilizzati: <strong>{currentResponse.agentResponses.length}</strong>
            </span>
            <span>
              Confidenza: <strong>{Math.round(currentResponse.confidence * 100)}%</strong>
            </span>
            <span>
              Strategia: <strong>{currentResponse.strategy.aggregationMethod}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentChat;
