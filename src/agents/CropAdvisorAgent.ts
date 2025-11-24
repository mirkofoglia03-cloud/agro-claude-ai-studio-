import type { Agent, AgentContext, AgentResponse, AgentStatus } from '../types/agents';

export class CropAdvisorAgent implements Agent {
  type = 'crop-advisor' as const;
  name = 'Crop Advisor';
  description = 'Provides expert advice on crop selection, planting times, and cultivation methods';
  status: AgentStatus = 'idle';

  canHandle(query: string): boolean {
    const keywords = [
      'piantare',
      'seminare',
      'coltivare',
      'quando',
      'come',
      'orto',
      'coltura',
      'crescita',
      'raccolto',
      'varietà',
      'migliore',
      'consiglio',
      'periodo',
    ];

    const lowerQuery = query.toLowerCase();
    return keywords.some(keyword => lowerQuery.includes(keyword));
  }

  async process(context: AgentContext): Promise<AgentResponse> {
    this.status = 'thinking';

    try {
      // Simulate AI processing - in production, this would call Gemini API
      await new Promise(resolve => setTimeout(resolve, 800));

      this.status = 'processing';

      const { userQuery, currentProduct, userLocation, currentDate } = context;
      const suggestions: string[] = [];
      let content = '';
      let confidence = 0.8;

      if (currentProduct) {
        // Product-specific advice
        const product = currentProduct;
        content = `Per **${product.name}** (${product.scientificName}), ecco i miei consigli:\n\n`;

        // Sowing period advice
        if (currentDate) {
          // Future: Use month for seasonal recommendations
          // const month = currentDate.getMonth() + 1;
          content += `📅 **Periodo di semina**: ${product.sowingPeriod}\n`;
          content += `🌱 **Germinazione**: ${product.germinationDays} giorni\n`;
          content += `📦 **Raccolta**: dopo ${product.harvestDays} giorni\n\n`;
        }

        // Growing conditions
        content += `**Condizioni ideali:**\n`;
        content += `☀️ Esposizione: ${this.formatSunExposure(product.sunExposure)}\n`;
        content += `💧 Acqua: necessità ${product.waterNeeds}\n`;
        content += `🌡️ Temperatura ideale: ${product.temperatureIdeal}°C\n`;
        content += `📊 pH terreno: ${product.soilPH}\n\n`;

        // Spacing
        content += `**Distanze di piantagione:**\n`;
        content += `• Tra le file: ${product.rowDistance} cm\n`;
        content += `• Tra le piante: ${product.plantDistance} cm\n`;
        content += `• Profondità semina: ${product.sowingDepth} cm\n\n`;

        // Difficulty
        content += `**Difficoltà**: ${this.formatDifficulty(product.difficulty)}\n`;

        suggestions.push(
          `Considera la consociazione con: ${product.goodCompanions.slice(0, 3).join(', ')}`,
          `Adatto per: ${product.suitableFor.join(', ')}`,
          `Monitora per: ${product.diseases.slice(0, 2).join(', ')}`
        );

        confidence = 0.9;
      } else {
        // General advice based on query
        content = this.generateGeneralAdvice(userQuery, userLocation);
        confidence = 0.7;

        suggestions.push(
          'Seleziona un prodotto specifico per consigli dettagliati',
          'Considera il clima della tua regione',
          'Verifica il calendario lunare per la semina'
        );
      }

      this.status = 'completed';

      return {
        agentType: this.type,
        content,
        confidence,
        suggestions,
        data: {
          productAnalyzed: currentProduct?.name,
          advisoryType: currentProduct ? 'specific' : 'general',
        },
      };
    } catch (error) {
      this.status = 'error';
      throw error;
    }
  }

  private formatSunExposure(exposure: string): string {
    const map: Record<string, string> = {
      'pieno-sole': 'Pieno sole (6-8 ore)',
      'mezz-ombra': "Mezz'ombra (4-6 ore)",
      'ombra': 'Ombra (2-4 ore)',
    };
    return map[exposure] || exposure;
  }

  private formatDifficulty(difficulty: string): string {
    const map: Record<string, string> = {
      'facile': '✅ Facile - Ideale per principianti',
      'medio': '⚠️ Medio - Richiede attenzione',
      'difficile': '🔴 Difficile - Per esperti',
    };
    return map[difficulty] || difficulty;
  }

  private generateGeneralAdvice(query: string, _location?: any): string {
    // Basic pattern matching for general queries
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('quando') && lowerQuery.includes('semina')) {
      return `Per sapere quando seminare, considera:\n\n` +
        `1. **Stagione**: La maggior parte degli ortaggi si semina in primavera (marzo-maggio)\n` +
        `2. **Clima locale**: Attendi che il rischio di gelate sia passato\n` +
        `3. **Tipo di coltura**: Le colture a ciclo lungo vanno seminate prima\n\n` +
        `Seleziona un prodotto specifico per indicazioni precise!`;
    }

    if (lowerQuery.includes('principiante') || lowerQuery.includes('facile')) {
      return `Per iniziare con l'orto, ti consiglio colture facili:\n\n` +
        `🥬 **Insalate** - Crescita rapida, 30-40 giorni\n` +
        `🥕 **Ravanelli** - Pronti in 3-4 settimane\n` +
        `🌿 **Basilico** - Aromatica resistente\n` +
        `🍅 **Pomodori ciliegino** - Produttivi e gratificanti\n` +
        `🥒 **Zucchine** - Resa abbondante\n\n` +
        `Esplora il catalogo per dettagli specifici!`;
    }

    return `Come esperto di coltivazioni, posso aiutarti con:\n\n` +
      `• Scelta delle colture adatte al tuo clima\n` +
      `• Periodi ottimali di semina e trapianto\n` +
      `• Tecniche di coltivazione specifiche\n` +
      `• Gestione dello spazio nell'orto\n\n` +
      `Fammi una domanda specifica o seleziona un prodotto!`;
  }
}
