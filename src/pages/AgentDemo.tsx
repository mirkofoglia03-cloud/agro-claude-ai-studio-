import React from 'react';
import { MultiAgentProvider } from '../context/MultiAgentContext';
import AgentChat from '../components/AgentChat';

/**
 * Demo page showing the Multi-Agent system in action
 *
 * This page demonstrates how to integrate the multi-agent system
 * into your application. You can customize the initial context
 * to provide user-specific information like location, climate, etc.
 */
const AgentDemo: React.FC = () => {
  // Example: You can provide initial context for all agents
  const initialContext = {
    userLocation: {
      region: 'Centro Italia',
      climate: 'Mediterraneo',
      soilType: 'Argilloso-limoso',
    },
    // You can also pass the current product from your app state
    // currentProduct: selectedProduct,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🤖 Sistema Multi-Agente per Agricoltura
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Un sistema di intelligenza artificiale distribuita dove agenti specializzati
            collaborano per fornire consigli agricoli completi e accurati.
          </p>
        </div>

        {/* Agent Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <AgentInfoCard
            icon="🌱"
            title="Crop Advisor"
            description="Consigli su coltivazioni, periodi di semina e tecniche colturali"
            color="bg-green-100 border-green-300"
          />
          <AgentInfoCard
            icon="🌤️"
            title="Weather Analyst"
            description="Analisi meteo e raccomandazioni climatiche"
            color="bg-blue-100 border-blue-300"
          />
          <AgentInfoCard
            icon="🔬"
            title="Disease Detector"
            description="Identificazione malattie e soluzioni fitosanitarie"
            color="bg-red-100 border-red-300"
          />
          <AgentInfoCard
            icon="🌿"
            title="Companion Planting"
            description="Consociazioni ottimali e rotazione colturale"
            color="bg-purple-100 border-purple-300"
          />
          <AgentInfoCard
            icon="🏡"
            title="Garden Design"
            description="Progettazione orto con principi permacultura"
            color="bg-yellow-100 border-yellow-300"
          />
          <AgentInfoCard
            icon="💾"
            title="Database Management"
            description="Organizzazione e qualità dati agricoli"
            color="bg-indigo-100 border-indigo-300"
          />
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[600px]">
          <MultiAgentProvider initialContext={initialContext}>
            <AgentChat />
          </MultiAgentProvider>
        </div>

        {/* How It Works */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🔧 Come Funziona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-2">1️⃣</div>
              <h3 className="font-semibold text-lg mb-2">Analisi Query</h3>
              <p className="text-gray-600 text-sm">
                L'orchestratore analizza la tua domanda e seleziona gli agenti più adatti
                per rispondere in base alle parole chiave e al contesto.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">2️⃣</div>
              <h3 className="font-semibold text-lg mb-2">Elaborazione Parallela</h3>
              <p className="text-gray-600 text-sm">
                Gli agenti specializzati elaborano la richiesta in parallelo o sequenzialmente,
                ognuno contribuendo con la propria expertise specifica.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">3️⃣</div>
              <h3 className="font-semibold text-lg mb-2">Aggregazione Risposte</h3>
              <p className="text-gray-600 text-sm">
                Le risposte vengono aggregate usando strategie intelligenti (merge, prioritize, vote)
                per fornire una risposta completa e coerente.
              </p>
            </div>
          </div>
        </div>

        {/* Integration Example */}
        <div className="mt-8 bg-gray-900 text-gray-100 rounded-xl shadow-lg p-6 overflow-x-auto">
          <h2 className="text-xl font-bold mb-4">📝 Esempio di Integrazione</h2>
          <pre className="text-sm">
            <code>{`import { MultiAgentProvider, useMultiAgent } from './context/MultiAgentContext';
import { AgentChat } from './components/AgentChat';

function MyApp() {
  return (
    <MultiAgentProvider
      initialContext={{
        userLocation: {
          region: 'Toscana',
          climate: 'Mediterraneo',
        },
        currentProduct: selectedProduct,
      }}
    >
      <AgentChat />
    </MultiAgentProvider>
  );
}

// Or use the hook directly in your components
function MyComponent() {
  const { sendQuery, messages, isProcessing } = useMultiAgent();

  const handleQuestion = async () => {
    await sendQuery('Quando seminare i pomodori?', {
      currentProduct: tomatoProduct,
    });
  };

  return (
    <button onClick={handleQuestion}>
      Chiedi agli agenti
    </button>
  );
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

interface AgentInfoCardProps {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const AgentInfoCard: React.FC<AgentInfoCardProps> = ({ icon, title, description, color }) => {
  return (
    <div className={`${color} border-2 rounded-xl p-4 transition-transform hover:scale-105`}>
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
};

export default AgentDemo;
