import type { Agent, AgentContext, AgentResponse, AgentStatus } from '../types/agents';

export class WeatherAnalysisAgent implements Agent {
  type = 'weather-analysis' as const;
  name = 'Weather Analyst';
  description = 'Analyzes weather conditions and provides climate-based recommendations';
  status: AgentStatus = 'idle';

  canHandle(query: string): boolean {
    const keywords = [
      'meteo',
      'tempo',
      'clima',
      'temperatura',
      'pioggia',
      'freddo',
      'caldo',
      'stagione',
      'inverno',
      'estate',
      'primavera',
      'autunno',
      'gelo',
      'siccità',
    ];

    const lowerQuery = query.toLowerCase();
    return keywords.some(keyword => lowerQuery.includes(keyword));
  }

  async process(context: AgentContext): Promise<AgentResponse> {
    this.status = 'thinking';

    try {
      await new Promise(resolve => setTimeout(resolve, 600));

      this.status = 'processing';

      const { currentProduct, userLocation, currentDate } = context;
      const suggestions: string[] = [];
      let content = '';
      let confidence = 0.75;

      // Get current season
      const season = this.getCurrentSeason(currentDate);
      const monthName = this.getMonthName(currentDate);

      content = `🌤️ **Analisi Meteo e Clima**\n\n`;
      content += `📅 Mese corrente: **${monthName}**\n`;
      content += `🍂 Stagione: **${season}**\n\n`;

      if (userLocation) {
        content += `📍 Regione: ${userLocation.region}\n`;
        content += `🌡️ Clima: ${userLocation.climate}\n\n`;
      }

      if (currentProduct) {
        const product = currentProduct;
        content += `**Analisi per ${product.name}:**\n\n`;

        // Temperature analysis
        const tempWarnings = this.analyzeTemperature(product, season);
        if (tempWarnings.length > 0) {
          content += `⚠️ **Avvisi temperatura:**\n`;
          tempWarnings.forEach(warning => {
            content += `• ${warning}\n`;
          });
          content += `\n`;
        }

        // Water needs analysis
        content += this.analyzeWaterNeeds(product, season);
        content += `\n`;

        // Seasonal recommendations
        const seasonalAdvice = this.getSeasonalAdvice(product, season);
        if (seasonalAdvice) {
          content += `💡 **Consiglio stagionale:**\n${seasonalAdvice}\n\n`;
        }

        suggestions.push(
          `Temperatura ideale per ${product.name}: ${product.temperatureIdeal}°C`,
          `Necessità idrica: ${product.waterNeeds}`,
          this.getProtectionAdvice(product, season)
        );

        confidence = 0.85;
      } else {
        // General seasonal advice
        content += this.getGeneralSeasonalAdvice(season, userLocation);

        suggestions.push(
          'Consulta il calendario delle semine per questo periodo',
          'Considera le condizioni climatiche locali',
          'Proteggi le colture sensibili al freddo/caldo'
        );

        confidence = 0.7;
      }

      // Add weather-based tips
      const tips = this.getWeatherTips(season);
      content += `\n📋 **Consigli pratici per ${season}:**\n`;
      tips.forEach(tip => {
        content += `• ${tip}\n`;
      });

      this.status = 'completed';

      return {
        agentType: this.type,
        content,
        confidence,
        suggestions,
        data: {
          season,
          month: monthName,
          productAnalyzed: currentProduct?.name,
        },
      };
    } catch (error) {
      this.status = 'error';
      throw error;
    }
  }

  private getCurrentSeason(date: Date = new Date()): string {
    const month = date.getMonth() + 1;
    if (month >= 3 && month <= 5) return 'Primavera';
    if (month >= 6 && month <= 8) return 'Estate';
    if (month >= 9 && month <= 11) return 'Autunno';
    return 'Inverno';
  }

  private getMonthName(date: Date = new Date()): string {
    const months = [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ];
    return months[date.getMonth()];
  }

  private analyzeTemperature(product: any, season: string): string[] {
    const warnings: string[] = [];

    if (season === 'Inverno' && product.temperatureMin > 5) {
      warnings.push(`Temperatura minima richiesta: ${product.temperatureMin}°C - considera coltura protetta`);
    }

    if (season === 'Estate' && product.temperatureMax < 30) {
      warnings.push(`Temperatura massima tollerata: ${product.temperatureMax}°C - prevedi ombreggiatura`);
    }

    if (product.sunExposure === 'ombra' && season === 'Estate') {
      warnings.push(`Questa pianta preferisce l'ombra - proteggila dal sole diretto estivo`);
    }

    return warnings;
  }

  private analyzeWaterNeeds(product: any, season: string): string {
    let content = `💧 **Gestione idrica:**\n`;

    const needsMap: Record<string, string> = {
      'basso': '1-2 volte a settimana',
      'medio': '2-3 volte a settimana',
      'alto': '4-5 volte a settimana (quotidiana in estate)',
      'molto-alto': 'Quotidiana, anche due volte al giorno in estate',
    };

    const frequency = needsMap[product.waterNeeds] || product.waterNeeds;
    content += `• Frequenza: ${frequency}\n`;

    if (season === 'Estate') {
      content += `• ⚠️ In estate aumenta la frequenza del 30-50%\n`;
      content += `• Irriga al mattino presto o sera per ridurre evaporazione\n`;
    } else if (season === 'Inverno') {
      content += `• ℹ️ In inverno riduci la frequenza del 50%\n`;
      content += `• Evita ristagni che possono causare marciume radicale\n`;
    }

    return content;
  }

  private getSeasonalAdvice(product: any, season: string): string | null {
    if (season === 'Primavera') {
      return `La primavera è ideale per ${product.name}. Approfitta delle temperature miti per trapiantare all'esterno dopo l'ultima gelata.`;
    }

    if (season === 'Estate' && product.waterNeeds === 'molto-alto') {
      return `In estate, ${product.name} necessita di irrigazioni frequenti. Considera la pacciamatura per trattenere umidità.`;
    }

    if (season === 'Inverno' && product.temperatureMin > 10) {
      return `${product.name} non tollera il freddo. Coltiva in serra o ambiente protetto durante l'inverno.`;
    }

    return null;
  }

  private getProtectionAdvice(product: any, season: string): string {
    if (season === 'Inverno') {
      return 'Considera protezioni anti-gelo (tessuto non tessuto, tunnel)';
    }
    if (season === 'Estate' && product.sunExposure !== 'pieno-sole') {
      return 'Usa reti ombreggianti al 30-50% nelle ore più calde';
    }
    return 'Monitora le condizioni meteo locali';
  }

  private getGeneralSeasonalAdvice(season: string, _location?: any): string {
    const adviceMap: Record<string, string> = {
      'Primavera': `🌱 **Primavera** è la stagione principe per l'orto!\n\n` +
        `• Inizia a seminare ortaggi a ciclo lungo\n` +
        `• Trapianta le piantine dal semenzaio\n` +
        `• Prepara il terreno con compost\n` +
        `• Attenzione alle gelate tardive\n`,

      'Estate': `☀️ **Estate** richiede attenzione all'irrigazione!\n\n` +
        `• Irrigazione frequente, preferibilmente al mattino\n` +
        `• Pacciamatura per conservare umidità\n` +
        `• Raccolti continui di ortaggi estivi\n` +
        `• Proteggi dal sole eccessivo le colture sensibili\n`,

      'Autunno': `🍂 **Autunno** è tempo di raccolti e nuove semine!\n\n` +
        `• Semina ortaggi a ciclo breve\n` +
        `• Raccogli gli ultimi frutti estivi\n` +
        `• Prepara l'orto per l'inverno\n` +
        `• Pianta aglio e cipolle\n`,

      'Inverno': `❄️ **Inverno** richiede protezioni e pianificazione!\n\n` +
        `• Proteggi le colture con tessuto non tessuto\n` +
        `• Riduci le irrigazioni\n` +
        `• Pianifica le semine primaverili\n` +
        `• Prepara il semenzaio riscaldato\n`,
    };

    return adviceMap[season] || '';
  }

  private getWeatherTips(season: string): string[] {
    const tipsMap: Record<string, string[]> = {
      'Primavera': [
        'Monitora le previsioni per gelate tardive',
        'Inizia gradualmente a esporre le piantine all\'esterno',
        'Approfitta delle piogge primaverili',
      ],
      'Estate': [
        'Irriga al mattino presto (5-7 AM) o sera (dopo le 18)',
        'Usa pacciamatura organica per ridurre evaporazione',
        'Controlla frequentemente il terreno nei giorni più caldi',
      ],
      'Autunno': [
        'Raccogli prima delle prime gelate',
        'Copri le colture sensibili nelle notti più fredde',
        'Approfitta delle temperature miti per trapianti',
      ],
      'Inverno': [
        'Proteggi con tunnel o tessuto non tessuto',
        'Riduci drasticamente le irrigazioni',
        'Ventila le serre nelle giornate soleggiate',
      ],
    };

    return tipsMap[season] || [];
  }
}
