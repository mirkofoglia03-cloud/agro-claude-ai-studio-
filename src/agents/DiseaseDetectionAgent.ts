import type { Agent, AgentContext, AgentResponse, AgentStatus } from '../types/agents';

export class DiseaseDetectionAgent implements Agent {
  type = 'disease-detection' as const;
  name = 'Disease Detector';
  description = 'Identifies plant diseases and provides treatment recommendations';
  status: AgentStatus = 'idle';

  canHandle(query: string): boolean {
    const keywords = [
      'malattia',
      'malato',
      'problema',
      'foglie',
      'gialle',
      'macchie',
      'muffe',
      'parassiti',
      'insetti',
      'marciume',
      'appassimento',
      'oidio',
      'peronospora',
      'afidi',
      'trattamento',
      'cura',
      'difesa',
    ];

    const lowerQuery = query.toLowerCase();
    return keywords.some(keyword => lowerQuery.includes(keyword));
  }

  async process(context: AgentContext): Promise<AgentResponse> {
    this.status = 'thinking';

    try {
      await new Promise(resolve => setTimeout(resolve, 700));

      this.status = 'processing';

      const { userQuery, currentProduct, additionalData } = context;
      const suggestions: string[] = [];
      let content = '';
      let confidence = 0.8;

      content = `🔬 **Analisi Fitosanitaria**\n\n`;

      // Check if there's an image for analysis
      if (additionalData?.image) {
        content += `📸 Immagine analizzata: Rilevata\n\n`;
        // In production, this would use image recognition
        confidence = 0.65;
      }

      if (currentProduct) {
        const product = currentProduct;
        content += `**Analisi per ${product.name}**\n\n`;

        // List common diseases
        if (product.diseases && product.diseases.length > 0) {
          content += `⚠️ **Malattie comuni:**\n`;
          product.diseases.forEach((disease: string) => {
            content += `• ${disease}\n`;
          });
          content += `\n`;
        }

        // Preventive measures
        content += `🛡️ **Prevenzione:**\n`;
        content += this.getPreventiveMeasures(product);
        content += `\n`;

        // Symptom analysis from query
        const symptoms = this.extractSymptoms(userQuery);
        if (symptoms.length > 0) {
          content += `**Sintomi rilevati:**\n`;
          symptoms.forEach(symptom => {
            content += `• ${symptom}\n`;
          });
          content += `\n`;

          // Possible diagnoses
          const diagnoses = this.getDiagnoses(symptoms, product);
          content += `**Possibili diagnosi:**\n`;
          diagnoses.forEach(diagnosis => {
            content += `\n**${diagnosis.name}** (probabilità: ${diagnosis.probability}%)\n`;
            content += `${diagnosis.description}\n`;
            content += `**Trattamento:** ${diagnosis.treatment}\n`;
          });

          confidence = 0.75;
        } else {
          // General disease info
          content += this.getGeneralDiseaseInfo(product);
        }

        suggestions.push(
          'Ispeziona regolarmente le piante (ogni 2-3 giorni)',
          'Mantieni buona circolazione d\'aria',
          'Rimuovi immediatamente foglie malate'
        );

        confidence = 0.82;
      } else {
        // General disease detection advice
        content += this.getGeneralDiseaseAdvice(userQuery);

        suggestions.push(
          'Fornisci una foto della pianta malata per analisi dettagliata',
          'Specifica quale pianta è affetta',
          'Descrivi i sintomi osservati'
        );

        confidence = 0.6;
      }

      this.status = 'completed';

      return {
        agentType: this.type,
        content,
        confidence,
        suggestions,
        data: {
          productAnalyzed: currentProduct?.name,
          symptomsDetected: this.extractSymptoms(userQuery),
          hasImage: !!additionalData?.image,
        },
        needsMoreInfo: !currentProduct || !additionalData?.image,
        followUpQuestions: this.generateFollowUpQuestions(currentProduct, additionalData),
      };
    } catch (error) {
      this.status = 'error';
      throw error;
    }
  }

  private extractSymptoms(query: string): string[] {
    const symptoms: string[] = [];
    const lowerQuery = query.toLowerCase();

    const symptomPatterns = [
      { pattern: /fogli[ea] giall[ea]/i, symptom: 'Foglie gialle' },
      { pattern: /macchi[ea]/i, symptom: 'Macchie sulle foglie' },
      { pattern: /marciume/i, symptom: 'Marciume' },
      { pattern: /muff[ea]/i, symptom: 'Presenza di muffe' },
      { pattern: /appassit/i, symptom: 'Appassimento' },
      { pattern: /insett[io]/i, symptom: 'Presenza di insetti' },
      { pattern: /afid[io]/i, symptom: 'Afidi' },
      { pattern: /bianche/i, symptom: 'Macchie bianche (possibile oidio)' },
      { pattern: /nere/i, symptom: 'Macchie nere' },
      { pattern: /bucherellat[ea]/i, symptom: 'Foglie bucherellate' },
    ];

    symptomPatterns.forEach(({ pattern, symptom }) => {
      if (pattern.test(lowerQuery)) {
        symptoms.push(symptom);
      }
    });

    return symptoms;
  }

  private getDiagnoses(symptoms: string[], _product: any): Array<{
    name: string;
    probability: number;
    description: string;
    treatment: string;
  }> {
    const diagnoses: any[] = [];

    // Yellowing leaves
    if (symptoms.some(s => s.includes('gialle'))) {
      diagnoses.push({
        name: 'Carenza nutrizionale',
        probability: 70,
        description: 'Ingiallimento fogliare spesso causato da carenza di azoto, ferro o magnesio.',
        treatment: 'Fertilizza con concime organico ricco di azoto. Per carenza di ferro usa chelato di ferro.',
      });

      diagnoses.push({
        name: 'Eccesso di acqua',
        probability: 50,
        description: 'Ristagno idrico che compromette l\'ossigenazione delle radici.',
        treatment: 'Riduci irrigazioni. Verifica il drenaggio. Lascia asciugare il terreno tra un\'irrigazione e l\'altra.',
      });
    }

    // White spots (powdery mildew)
    if (symptoms.some(s => s.includes('bianche') || s.includes('oidio'))) {
      diagnoses.push({
        name: 'Oidio (Mal bianco)',
        probability: 85,
        description: 'Fungo che forma patina biancastra polverulenta su foglie e fusti.',
        treatment: 'Rimuovi parti infette. Tratta con zolfo bagnabile o bicarbonato di potassio. Migliora ventilazione.',
      });
    }

    // Dark spots
    if (symptoms.some(s => s.includes('macchie') && s.includes('nere'))) {
      diagnoses.push({
        name: 'Peronospora',
        probability: 75,
        description: 'Malattia fungina che causa macchie scure sulle foglie.',
        treatment: 'Tratta con rame. Rimuovi foglie infette. Evita bagnare le foglie durante irrigazione.',
      });
    }

    // Aphids
    if (symptoms.some(s => s.includes('Afidi') || s.includes('insetti'))) {
      diagnoses.push({
        name: 'Infestazione da Afidi',
        probability: 90,
        description: 'Piccoli insetti che succhiano linfa, causando deformazione delle foglie.',
        treatment: 'Tratta con sapone di Marsiglia diluito (10-20 g/L). Favorisci insetti predatori (coccinelle).',
      });
    }

    // Wilting
    if (symptoms.some(s => s.includes('Appassimento'))) {
      diagnoses.push({
        name: 'Stress idrico o Fusarium',
        probability: 65,
        description: 'Appassimento può essere causato da disidratazione o malattia fungina vascolare.',
        treatment: 'Verifica umidità terreno. Se ben irrigato, potrebbe essere fusarium (rimuovi pianta infetta).',
      });
    }

    // Rot
    if (symptoms.some(s => s.includes('Marciume'))) {
      diagnoses.push({
        name: 'Marciume radicale',
        probability: 80,
        description: 'Eccesso idrico o funghi patogeni che attaccano radici e colletto.',
        treatment: 'Riduci irrigazioni drasticamente. Migliora drenaggio. Considera trapianto in terreno fresco.',
      });
    }

    // Holes in leaves
    if (symptoms.some(s => s.includes('bucherellat'))) {
      diagnoses.push({
        name: 'Attacco di lepidotteri o coleotteri',
        probability: 85,
        description: 'Larve di farfalle o coleotteri che si nutrono delle foglie.',
        treatment: 'Raccogli manualmente larve visibili. Usa Bacillus thuringiensis (biologico). Controllo notturno.',
      });
    }

    return diagnoses.sort((a, b) => b.probability - a.probability);
  }

  private getPreventiveMeasures(product: any): string {
    let measures = '';

    measures += `• **Rotazione colturale**: Non coltivare ${product.category} nello stesso posto per 2-3 anni\n`;
    measures += `• **Igiene**: Rimuovi residui vegetali e foglie morte\n`;
    measures += `• **Spazio adeguato**: Rispetta distanze (${product.plantDistance} cm) per circolazione aria\n`;
    measures += `• **Irrigazione corretta**: Evita di bagnare foglie, irriga alla base\n`;
    measures += `• **Monitoraggio**: Ispeziona piante regolarmente\n`;

    if (product.waterNeeds === 'alto' || product.waterNeeds === 'molto-alto') {
      measures += `• ⚠️ **Attenzione**: Pianta idro-esigente, evita ristagni\n`;
    }

    return measures;
  }

  private getGeneralDiseaseInfo(product: any): string {
    return `**Gestione fitosanitaria generale:**\n\n` +
      `Le malattie più comuni per ${product.name} includono ${product.diseases.slice(0, 3).join(', ')}.\n\n` +
      `**Strategia integrata:**\n` +
      `1. Prevenzione attraverso buone pratiche colturali\n` +
      `2. Monitoraggio costante per intervento tempestivo\n` +
      `3. Trattamenti biologici come prima scelta\n` +
      `4. Rimozione parti infette per limitare diffusione\n\n` +
      `Descrivi i sintomi specifici per una diagnosi più accurata!`;
  }

  private getGeneralDiseaseAdvice(_query: string): string {
    return `Per aiutarti al meglio nella diagnosi, ho bisogno di più informazioni:\n\n` +
      `📋 **Informazioni utili:**\n` +
      `• Quale pianta è affetta?\n` +
      `• Quali sintomi osservi? (foglie gialle, macchie, muffe, ecc.)\n` +
      `• Da quanto tempo si presenta il problema?\n` +
      `• Le condizioni di coltivazione (irrigazione, esposizione)\n\n` +
      `📸 **Suggerimento:** Carica una foto della pianta per un'analisi visiva più accurata!\n\n` +
      `**Problemi comuni nell'orto:**\n` +
      `• Oidio - patina bianca polverulenta\n` +
      `• Peronospora - macchie scure sulle foglie\n` +
      `• Afidi - piccoli insetti verdi/neri\n` +
      `• Marciume radicale - appassimento improvviso\n` +
      `• Carenze nutrizionali - ingiallimento fogliare`;
  }

  private generateFollowUpQuestions(product: any, additionalData?: any): string[] {
    const questions: string[] = [];

    if (!product) {
      questions.push('Quale pianta presenta il problema?');
    }

    if (!additionalData?.image) {
      questions.push('Puoi fornire una foto della pianta affetta?');
    }

    questions.push(
      'I sintomi sono su foglie giovani o vecchie?',
      'Hai notato insetti sulla pianta?',
      'Come e quanto spesso irrighi?'
    );

    return questions;
  }
}
