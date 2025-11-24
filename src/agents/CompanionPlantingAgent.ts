import type { Agent, AgentContext, AgentResponse, AgentStatus } from '../types/agents';

export class CompanionPlantingAgent implements Agent {
  type = 'companion-planting' as const;
  name = 'Companion Planting Expert';
  description = 'Provides advice on beneficial plant combinations and crop rotation';
  status: AgentStatus = 'idle';

  canHandle(query: string): boolean {
    const keywords = [
      'consociazione',
      'consociare',
      'vicino',
      'insieme',
      'compatibile',
      'incompatibile',
      'rotazione',
      'alternare',
      'combinazione',
      'abbinamento',
      'compagn',
      'accanto',
    ];

    const lowerQuery = query.toLowerCase();
    return keywords.some(keyword => lowerQuery.includes(keyword));
  }

  async process(context: AgentContext): Promise<AgentResponse> {
    this.status = 'thinking';

    try {
      await new Promise(resolve => setTimeout(resolve, 650));

      this.status = 'processing';

      const { currentProduct, additionalData } = context;
      const suggestions: string[] = [];
      let content = '';
      let confidence = 0.85;

      content = `🌿 **Consociazioni e Rotazioni**\n\n`;

      if (currentProduct) {
        const product = currentProduct;
        content += `**Analisi per ${product.name}**\n\n`;

        // Good companions
        if (product.goodCompanions && product.goodCompanions.length > 0) {
          content += `✅ **Ottime consociazioni:**\n`;
          product.goodCompanions.forEach((companion: string) => {
            const benefit = this.getCompanionBenefit(product.name, companion);
            content += `• **${companion}** - ${benefit}\n`;
          });
          content += `\n`;
        }

        // Bad companions
        if (product.badCompanions && product.badCompanions.length > 0) {
          content += `❌ **Evita di coltivare con:**\n`;
          product.badCompanions.forEach((badCompanion: string) => {
            const reason = this.getBadCompanionReason(product.name, badCompanion);
            content += `• **${badCompanion}** - ${reason}\n`;
          });
          content += `\n`;
        }

        // Spatial arrangement
        content += `📐 **Disposizione spaziale:**\n`;
        content += this.getSpatialArrangement(product);
        content += `\n`;

        // Rotation advice
        content += `🔄 **Rotazione colturale:**\n`;
        content += this.getRotationAdvice(product);
        content += `\n`;

        // Additional garden planning tips
        const planningTips = this.getPlanningTips(product);
        if (planningTips.length > 0) {
          content += `💡 **Consigli per la pianificazione:**\n`;
          planningTips.forEach(tip => {
            content += `• ${tip}\n`;
          });
          content += `\n`;
        }

        suggestions.push(
          `Prova ${product.goodCompanions[0]} accanto a ${product.name}`,
          `Non piantare mai ${product.badCompanions[0]} vicino`,
          `Pianifica la rotazione con famiglia diversa`
        );

        confidence = 0.9;
      } else {
        // General companion planting principles
        content += this.getGeneralCompanionAdvice();

        suggestions.push(
          'Seleziona una coltura specifica per consigli dettagliati',
          'Considera le famiglie botaniche per la rotazione',
          'Pianifica l\'orto su carta prima di piantare'
        );

        confidence = 0.75;
      }

      // Check if user has multiple products (garden planning)
      if (additionalData?.gardenProducts && additionalData.gardenProducts.length > 1) {
        content += this.analyzeGardenCombination(additionalData.gardenProducts);
        confidence = 0.88;
      }

      this.status = 'completed';

      return {
        agentType: this.type,
        content,
        confidence,
        suggestions,
        data: {
          productAnalyzed: currentProduct?.name,
          goodCompanions: currentProduct?.goodCompanions || [],
          badCompanions: currentProduct?.badCompanions || [],
          family: currentProduct?.category,
        },
      };
    } catch (error) {
      this.status = 'error';
      throw error;
    }
  }

  private getCompanionBenefit(_plant: string, companion: string): string {
    // Simulate knowledge base - in production this would be more extensive
    const benefits: Record<string, string> = {
      'Basilico': 'migliora sapore e respinge afidi',
      'Carote': 'migliora crescita e allontana parassiti',
      'Cipolle': 'repelle afidi e migliora la salute',
      'Aglio': 'azione antibatterica e antifungina',
      'Lattuga': 'sfrutta ombra, non compete per nutrienti',
      'Spinaci': 'arricchisce il terreno, ombreggia radici',
      'Ravanelli': 'allontana coleotteri, crescita rapida',
      'Tagete': 'repelle nematodi e insetti dannosi',
      'Calendula': 'attira insetti benefici, proprietà nematicide',
      'Prezzemolo': 'attira insetti utili',
      'Trifoglio': 'fissa azoto, migliora terreno',
      'Nasturzio': 'pianta-trappola per afidi',
      'Cetriolo': 'compatibile, non compete',
      'Fagioli': 'fissano azoto, arricchiscono terreno',
      'Piselli': 'fissano azoto nel terreno',
      'Erba cipollina': 'respinge afidi e migliora sapore',
      'Aneto': 'attira insetti benefici',
    };

    return benefits[companion] || 'crescita sinergica e utilizzo efficiente dello spazio';
  }

  private getBadCompanionReason(_plant: string, badCompanion: string): string {
    const reasons: Record<string, string> = {
      'Pomodori': 'competizione nutrienti, stessa famiglia (allelopatia)',
      'Patate': 'competizione e rischio malattie condivise',
      'Finocchio': 'inibisce crescita di molte piante (allelopatia)',
      'Cavoli': 'competizione per nutrienti, attrae stessi parassiti',
      'Broccoli': 'competizione elevata, stessa famiglia',
      'Peperoni': 'stessa famiglia, competono per risorse',
      'Melanzane': 'stessa famiglia (Solanaceae), malattie condivise',
      'Zucchine': 'competizione spazio e nutrienti',
      'Cetrioli': 'incompatibilità allelopatica',
    };

    return reasons[badCompanion] || 'competizione per risorse o incompatibilità chimica';
  }

  private getSpatialArrangement(product: any): string {
    let arrangement = '';

    // Calculate space per plant
    const rowDist = this.extractNumber(product.rowDistance);
    const plantDist = this.extractNumber(product.plantDistance);

    arrangement += `• Distanza tra file: **${product.rowDistance} cm**\n`;
    arrangement += `• Distanza tra piante: **${product.plantDistance} cm**\n`;
    arrangement += `• Spazio per pianta: ~${Math.round((rowDist * plantDist) / 100) / 100} m²\n`;

    // Intercropping suggestions
    if (rowDist > 50) {
      arrangement += `\n💡 Con file distanziate, puoi intercalare:\n`;
      arrangement += `  • Colture a crescita rapida (ravanelli, lattuga)\n`;
      arrangement += `  • Erbe aromatiche\n`;
    }

    return arrangement;
  }

  private extractNumber(str: string): number {
    const match = str.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }

  private getRotationAdvice(product: any): string {
    const family = product.category;
    let advice = '';

    advice += `Famiglia: **${family}**\n\n`;
    advice += `**Principi di rotazione:**\n`;
    advice += `1. Non coltivare piante della stessa famiglia per 2-3 anni nello stesso posto\n`;
    advice += `2. Alterna piante con esigenze nutritive diverse\n`;
    advice += `3. Dopo ${product.name}, pianifica:\n`;

    // Rotation suggestions based on family
    const rotationMap: Record<string, string[]> = {
      'solanacee': ['leguminose (fissano azoto)', 'brassicacee (pulizia terreno)', 'ombrellifere'],
      'brassicacee': ['solanacee', 'leguminose', 'cucurbitacee'],
      'leguminose': ['solanacee (beneficiano azoto)', 'cucurbitacee', 'brassicacee'],
      'cucurbitacee': ['leguminose (arricchimento)', 'brassicacee', 'liliacee'],
      'liliacee': ['leguminose', 'solanacee', 'asteracee'],
    };

    const suggestions = rotationMap[family] || ['leguminose', 'altre famiglie botaniche'];
    suggestions.forEach((sugg, i) => {
      advice += `   ${i + 1}. ${sugg}\n`;
    });

    return advice;
  }

  private getPlanningTips(product: any): string[] {
    const tips: string[] = [];

    // Height-based tips
    if (product.name.toLowerCase().includes('pomodoro') ||
        product.name.toLowerCase().includes('fagioli rampicanti')) {
      tips.push('Pianta a nord per non ombreggiare altre colture');
    }

    // Water needs tips
    if (product.waterNeeds === 'molto-alto') {
      tips.push('Raggruppa con altre piante idro-esigenti per irrigazione efficiente');
    }

    // Sun exposure tips
    if (product.sunExposure === 'pieno-sole') {
      tips.push('Posiziona in zona più soleggiata dell\'orto (esposizione sud)');
    } else if (product.sunExposure === 'mezz-ombra') {
      tips.push('Può beneficiare dell\'ombra di piante più alte nelle ore più calde');
    }

    // Container tips
    if (product.suitableFor.includes('Vaso')) {
      tips.push(`Coltivabile in contenitore (min. ${this.getContainerSize(product)} litri)`);
    }

    // Companion tip
    if (product.goodCompanions.length > 0) {
      tips.push(`Crea un "trio" con ${product.goodCompanions.slice(0, 2).join(' e ')}`);
    }

    return tips;
  }

  private getContainerSize(product: any): number {
    // Estimate container size based on root system
    const plantDist = this.extractNumber(product.plantDistance);
    if (plantDist < 20) return 5;
    if (plantDist < 40) return 10;
    if (plantDist < 60) return 20;
    return 30;
  }

  private getGeneralCompanionAdvice(): string {
    return `**Principi della consociazione:**\n\n` +
      `✅ **Benefici:**\n` +
      `• Uso efficiente dello spazio verticale e orizzontale\n` +
      `• Repulsione naturale dei parassiti\n` +
      `• Miglioramento della biodiversità\n` +
      `• Arricchimento del terreno (leguminose)\n` +
      `• Attrazione di impollinatori e predatori naturali\n\n` +
      `🌟 **Combinazioni classiche:**\n` +
      `• **Tre sorelle**: Mais + Fagioli + Zucca\n` +
      `• **Pomodoro + Basilico** (migliora sapore, respinge insetti)\n` +
      `• **Carote + Cipolle** (allontanano rispettivi parassiti)\n` +
      `• **Lattuga + Ravanelli** (uso efficiente spazio)\n\n` +
      `⚠️ **Evita:**\n` +
      `• Piante della stessa famiglia vicine\n` +
      `• Finocchio con quasi tutte le altre piante\n` +
      `• Solanacee tra loro (pomodori, patate, melanzane)\n\n` +
      `**Rotazione colturale:**\n` +
      `Cambia famiglia botanica ogni stagione:\n` +
      `Anno 1: Solanacee → Anno 2: Leguminose → Anno 3: Brassicacee → Anno 4: Cucurbitacee`;
  }

  private analyzeGardenCombination(products: any[]): string {
    let analysis = `\n🏡 **Analisi combinazione orto:**\n\n`;

    const conflicts: string[] = [];
    const synergies: string[] = [];

    // Check all pairs
    for (let i = 0; i < products.length; i++) {
      for (let j = i + 1; j < products.length; j++) {
        const prod1 = products[i];
        const prod2 = products[j];

        // Check if they're good companions
        if (prod1.goodCompanions?.includes(prod2.name)) {
          synergies.push(`✅ ${prod1.name} + ${prod2.name}`);
        }

        // Check if they're bad companions
        if (prod1.badCompanions?.includes(prod2.name)) {
          conflicts.push(`❌ ${prod1.name} ↔ ${prod2.name} (evita vicinanza)`);
        }
      }
    }

    if (synergies.length > 0) {
      analysis += `**Sinergie positive:**\n`;
      synergies.forEach(s => analysis += `${s}\n`);
      analysis += `\n`;
    }

    if (conflicts.length > 0) {
      analysis += `**⚠️ Attenzione - conflitti:**\n`;
      conflicts.forEach(c => analysis += `${c}\n`);
      analysis += `\n`;
    }

    if (synergies.length === 0 && conflicts.length === 0) {
      analysis += `Le piante selezionate sono compatibili tra loro.\n\n`;
    }

    return analysis;
  }
}
