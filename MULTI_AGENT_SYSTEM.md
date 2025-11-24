# 🤖 Sistema Multi-Agente per Agricoltura

Un sistema di intelligenza artificiale distribuita dove agenti specializzati collaborano per fornire consigli agricoli completi e accurati.

## 📋 Indice

- [Architettura](#architettura)
- [Agenti Disponibili](#agenti-disponibili)
- [Come Funziona](#come-funziona)
- [Installazione](#installazione)
- [Utilizzo](#utilizzo)
- [API Reference](#api-reference)
- [Esempi](#esempi)
- [Personalizzazione](#personalizzazione)

## 🏗️ Architettura

Il sistema è basato sul **Pattern Multi-Agent con Context Manager**, dove:

```
User Query → Orchestrator → Agent Selection → Parallel/Sequential Execution → Aggregation → Response
```

### Componenti Principali

1. **AgentOrchestrator**: Coordina gli agenti e gestisce le strategie di esecuzione
2. **Specialized Agents**: Agenti esperti in domini specifici
3. **MultiAgentContext**: Gestisce lo stato e fornisce l'interfaccia React
4. **AgentChat**: Interfaccia utente per interagire con il sistema

## 🤖 Agenti Disponibili

### 1. Crop Advisor Agent 🌱
**Responsabilità**: Consigli su coltivazioni e tecniche colturali

**Keywords**: piantare, seminare, coltivare, quando, come, orto, coltura, crescita

**Capacità**:
- Periodi ottimali di semina e trapianto
- Condizioni ideali di coltivazione
- Gestione spazi e distanze
- Consigli per principianti e esperti

### 2. Weather Analysis Agent 🌤️
**Responsabilità**: Analisi meteo e raccomandazioni climatiche

**Keywords**: meteo, tempo, clima, temperatura, pioggia, freddo, caldo, stagione

**Capacità**:
- Analisi stagionale
- Gestione irrigazione in base al clima
- Avvisi temperatura
- Protezioni contro gelo/caldo

### 3. Disease Detection Agent 🔬
**Responsabilità**: Identificazione malattie e soluzioni fitosanitarie

**Keywords**: malattia, problema, foglie gialle, macchie, muffe, parassiti, afidi

**Capacità**:
- Diagnosi sintomi
- Identificazione malattie comuni
- Trattamenti biologici e chimici
- Misure preventive

### 4. Companion Planting Agent 🌿
**Responsabilità**: Consociazioni e rotazione colturale

**Keywords**: consociazione, vicino, insieme, compatibile, rotazione, abbinamento

**Capacità**:
- Consociazioni ottimali
- Piante da evitare insieme
- Pianificazione spaziale
- Rotazione colturale

### 5. Garden Design Agent 🏡
**Responsabilità**: Progettazione orto con principi permacultura

**Keywords**: progetta, progettazione, design, layout, disposizione, organizza, spazio, dimensioni, orto, giardino

**Capacità**:
- Layout orto ottimale (Mandala, Raised Beds, Keyhole, etc.)
- Zone planning (sistema 0-5 permacultura)
- Orientamento aiuole per massima produzione
- Gestione acqua e drenaggio
- Microclimi e sfruttamento spazio

**Best Practices basate su**:
- [Permaculture Garden Design](https://www.permaculturegardens.org/design-your-permaculture-garden)
- [6 Maps for Permaculture Design](https://www.tenthacrefarm.com/6-maps-permaculture-farm-design/)
- [Permaculture Design Principles](https://greenglobaltravel.com/permaculture-garden-guide/)

### 6. Database Management Agent 💾
**Responsabilità**: Organizzazione e qualità dati agricoli

**Keywords**: database, dati, salva, archivia, organizza, traccia, registro, storico, esporta, importa

**Capacità**:
- Struttura organizzativa dati (anno/farm/field/crop)
- Data quality assurance e validazione
- Metadata management (ICASA standards)
- Backup strategy e data governance
- Data integration e standardizzazione

**Best Practices basate su**:
- [USDA Data Management Planning](https://www.nal.usda.gov/services/data-management-planning)
- [Agricultural Data Management Best Practices](https://acsess.onlinelibrary.wiley.com/doi/10.1002/agj2.20639)
- [Data Analytics for Crop Management](https://journalofbigdata.springeropen.com/articles/10.1186/s40537-022-00668-2)

## ⚙️ Come Funziona

### 1. Analisi Query
L'orchestratore analizza la domanda dell'utente e seleziona gli agenti più adatti:

```typescript
const selectedAgents = orchestrator.selectAgents(context);
// Esempio: "Quando seminare pomodori?" → CropAdvisorAgent, WeatherAnalysisAgent
```

### 2. Strategia di Esecuzione
Determina se eseguire gli agenti in parallelo o sequenzialmente:

```typescript
const strategy: OrchestratorStrategy = {
  parallel: true,              // Esecuzione parallela
  requiredAgents: ['crop-advisor', 'weather-analysis'],
  aggregationMethod: 'merge'   // Come combinare le risposte
}
```

### 3. Aggregazione Risposte
Le risposte vengono combinate usando diverse strategie:

- **Merge**: Combina tutte le risposte in un output completo
- **Prioritize**: Usa la risposta più rilevante, aggiungendo contesto dagli altri
- **Vote**: Risolve conflitti tramite voting ponderato per confidenza

## 📦 Installazione

Il sistema è già integrato nel progetto. I file sono organizzati così:

```
src/
├── types/
│   └── agents.ts              # Type definitions
├── agents/
│   ├── CropAdvisorAgent.ts
│   ├── WeatherAnalysisAgent.ts
│   ├── DiseaseDetectionAgent.ts
│   ├── CompanionPlantingAgent.ts
│   ├── AgentOrchestrator.ts
│   └── index.ts
├── context/
│   └── MultiAgentContext.tsx  # React Context
├── components/
│   └── AgentChat.tsx          # UI Component
└── pages/
    └── AgentDemo.tsx          # Demo page
```

## 🚀 Utilizzo

### Uso Base con React

```tsx
import { MultiAgentProvider, useMultiAgent } from './context/MultiAgentContext';
import AgentChat from './components/AgentChat';

function App() {
  return (
    <MultiAgentProvider>
      <AgentChat />
    </MultiAgentProvider>
  );
}
```

### Uso Programmatico

```typescript
import { AgentOrchestrator } from './agents';
import type { AgentContext } from './types/agents';

const orchestrator = new AgentOrchestrator();

const context: AgentContext = {
  userQuery: 'Quando seminare i pomodori?',
  conversationHistory: [],
  currentDate: new Date(),
  userLocation: {
    region: 'Centro Italia',
    climate: 'Mediterraneo',
  },
};

const response = await orchestrator.process(context);
console.log(response.primaryResponse);
```

### Hook personalizzato

```tsx
function MyComponent() {
  const { sendQuery, messages, isProcessing } = useMultiAgent();

  const handleQuestion = async () => {
    await sendQuery('Come curo le foglie gialle?', {
      currentProduct: myProduct,
    });
  };

  return (
    <div>
      <button onClick={handleQuestion} disabled={isProcessing}>
        Chiedi agli agenti
      </button>
      {messages.map(msg => (
        <div key={msg.id}>{msg.content}</div>
      ))}
    </div>
  );
}
```

## 📚 API Reference

### AgentOrchestrator

```typescript
class AgentOrchestrator {
  // Processa una query con gli agenti appropriati
  async process(context: AgentContext): Promise<MultiAgentResponse>

  // Ottieni un agente specifico
  getAgent(type: AgentType): Agent | undefined

  // Lista tutti gli agenti registrati
  getAllAgents(): Agent[]

  // Anteprima quali agenti gestiranno una query (senza eseguire)
  previewAgents(query: string): Agent[]
}
```

### useMultiAgent Hook

```typescript
interface MultiAgentContextType {
  messages: AgentMessage[]          // Cronologia messaggi
  isProcessing: boolean              // Stato elaborazione
  currentResponse: MultiAgentResponse | null  // Ultima risposta

  // Invia una query agli agenti
  sendQuery: (query: string, context?: Partial<AgentContext>) => Promise<void>

  // Cancella cronologia
  clearMessages: () => void

  // Ottieni tutti gli agenti attivi
  getActiveAgents: () => Agent[]

  // Anteprima agenti per una query
  previewAgentsForQuery: (query: string) => Agent[]
}
```

### AgentContext

```typescript
interface AgentContext {
  userQuery: string                    // Query dell'utente
  conversationHistory: AgentMessage[]  // Cronologia conversazione
  currentProduct?: AgricultureProduct  // Prodotto corrente
  userLocation?: {                     // Posizione utente
    region: string
    climate: string
    soilType?: string
  }
  currentDate?: Date                   // Data corrente
  additionalData?: Record<string, any> // Dati aggiuntivi
}
```

## 💡 Esempi

### Esempio 1: Query Semplice

```typescript
await sendQuery('Quando seminare i pomodori?');
```

**Agenti attivati**: CropAdvisorAgent, WeatherAnalysisAgent
**Risultato**: Consigli su periodo di semina + analisi condizioni meteo

### Esempio 2: Diagnosi Malattia con Prodotto

```typescript
await sendQuery('Le foglie hanno macchie gialle', {
  currentProduct: tomatoProduct,
});
```

**Agenti attivati**: DiseaseDetectionAgent, CropAdvisorAgent
**Risultato**: Diagnosi possibili malattie + consigli specifici per pomodori

### Esempio 3: Pianificazione Orto

```typescript
await sendQuery('Cosa posso piantare vicino alle carote?', {
  additionalData: {
    gardenProducts: [carrotProduct, tomatoProduct],
  },
});
```

**Agenti attivati**: CompanionPlantingAgent, CropAdvisorAgent
**Risultato**: Consociazioni ottimali + analisi compatibilità nell'orto

### Esempio 4: Query Complessa Multi-Agente

```typescript
await sendQuery('Come e quando seminare basilico, e con cosa consociarlo?');
```

**Agenti attivati**: CropAdvisorAgent, WeatherAnalysisAgent, CompanionPlantingAgent
**Risultato**: Risposta completa che copre tutti gli aspetti

## 🔧 Personalizzazione

### Creare un Nuovo Agente

```typescript
import type { Agent, AgentContext, AgentResponse } from '../types/agents';

export class MyCustomAgent implements Agent {
  type = 'my-custom-agent' as const;
  name = 'My Custom Agent';
  description = 'Custom agent description';
  status = 'idle' as const;

  canHandle(query: string): boolean {
    const keywords = ['keyword1', 'keyword2'];
    return keywords.some(k => query.toLowerCase().includes(k));
  }

  async process(context: AgentContext): Promise<AgentResponse> {
    this.status = 'thinking';

    // Your logic here
    const content = 'Agent response...';

    this.status = 'completed';

    return {
      agentType: this.type,
      content,
      confidence: 0.85,
      suggestions: ['suggestion 1', 'suggestion 2'],
    };
  }
}
```

### Registrare l'Agente

Aggiungi il tuo agente in `AgentOrchestrator.ts`:

```typescript
private registerAgents(): void {
  const agentInstances = [
    new CropAdvisorAgent(),
    new WeatherAnalysisAgent(),
    new MyCustomAgent(),  // ← Aggiungi qui
  ];
  // ...
}
```

### Modificare Strategia di Aggregazione

Personalizza `determineStrategy` in `AgentOrchestrator.ts`:

```typescript
private determineStrategy(query: string, agents: Agent[]): OrchestratorStrategy {
  // Tua logica personalizzata
  return {
    parallel: shouldRunParallel(query),
    requiredAgents: agents.map(a => a.type),
    aggregationMethod: 'merge',
  };
}
```

## 🎨 Personalizzare l'UI

### Cambiare Colori Agenti

In `AgentChat.tsx`:

```typescript
const getAgentColor = (agentType: AgentType): string => {
  return {
    'crop-advisor': 'bg-emerald-100 border-emerald-400',  // ← Personalizza
    // ...
  }[agentType];
};
```

### Aggiungere Informazioni Metadata

```typescript
<div className="message">
  {message.content}
  {message.metadata?.customInfo && (
    <div className="custom-info">
      {message.metadata.customInfo}
    </div>
  )}
</div>
```

## 🚀 Integrare con Gemini API

Per integrare con Gemini (attualmente il sistema usa risposte simulate):

```typescript
// In ogni Agent, modifica il metodo process
async process(context: AgentContext): Promise<AgentResponse> {
  const geminiPrompt = this.buildPrompt(context);

  const response = await fetch('GEMINI_API_ENDPOINT', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GEMINI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: geminiPrompt,
      // ...altri parametri
    }),
  });

  const data = await response.json();

  return {
    agentType: this.type,
    content: data.response,
    confidence: data.confidence,
  };
}
```

## 📊 Metriche e Monitoring

Il sistema fornisce automaticamente:

- **Confidence Score**: Livello di fiducia della risposta (0-1)
- **Agent Count**: Numero di agenti coinvolti
- **Strategy Used**: Strategia di aggregazione utilizzata
- **Processing Time**: Tempo di elaborazione

Accesso tramite `currentResponse`:

```typescript
const { currentResponse } = useMultiAgent();

console.log('Confidence:', currentResponse.confidence);
console.log('Agents used:', currentResponse.agentResponses.length);
console.log('Strategy:', currentResponse.strategy.aggregationMethod);
```

## 🐛 Debugging

### Visualizzare Agenti Selezionati

```typescript
const agents = orchestrator.previewAgents('La mia domanda');
console.log('Agents that will respond:', agents.map(a => a.name));
```

### Log delle Risposte degli Agenti

```typescript
response.agentResponses.forEach(agentResp => {
  console.log(`${agentResp.agentType}: ${agentResp.confidence}`);
  console.log(agentResp.content);
});
```

### Tracciare Esecuzione

Aggiungi logging in `AgentOrchestrator.ts`:

```typescript
async process(context: AgentContext): Promise<MultiAgentResponse> {
  console.log('🎯 Query:', context.userQuery);
  const selectedAgents = this.selectAgents(context);
  console.log('🤖 Selected agents:', selectedAgents.map(a => a.name));
  // ...
}
```

## 📝 Best Practices

1. **Context Enrichment**: Fornisci sempre il massimo contesto possibile
   ```typescript
   sendQuery(question, {
     currentProduct: product,
     userLocation: location,
     additionalData: { ... }
   });
   ```

2. **Error Handling**: Gestisci gli errori appropriatamente
   ```typescript
   try {
     await sendQuery(question);
   } catch (error) {
     console.error('Agent processing failed:', error);
   }
   ```

3. **Performance**: Per query semplici, considera di disabilitare agenti non necessari
   ```typescript
   // Implementa logica di caching per query frequenti
   ```

4. **Testing**: Testa ogni agente individualmente prima dell'integrazione
   ```typescript
   const agent = new CropAdvisorAgent();
   const response = await agent.process(testContext);
   ```

## 🤝 Contribuire

Per aggiungere nuovi agenti o migliorare quelli esistenti:

1. Crea l'agente in `src/agents/`
2. Implementa l'interfaccia `Agent`
3. Registra in `AgentOrchestrator`
4. Aggiungi tests e documentazione
5. Aggiorna questo README

## 📄 Licenza

Parte del progetto Agro.io

---

**Nota**: Questo sistema è progettato per essere estensibile. Puoi facilmente aggiungere nuovi agenti specializzati per gestire altri aspetti dell'agricoltura (irrigazione automatica, gestione fertilizzanti, previsioni raccolto, ecc.).
