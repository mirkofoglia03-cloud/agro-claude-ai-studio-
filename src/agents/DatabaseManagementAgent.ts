/**
 * DatabaseManagementAgent - Expert system for agricultural data management
 *
 * Implements best practices from:
 * - https://www.nal.usda.gov/services/data-management-planning
 * - https://acsess.onlinelibrary.wiley.com/doi/10.1002/agj2.20639
 * - https://journalofbigdata.springeropen.com/articles/10.1186/s40537-022-00668-2
 *
 * @author Multi-Agent System
 * @version 1.0.0
 */

import type { Agent, AgentContext, AgentResponse, AgentStatus } from '../types/agents';
import {
  validateDataStructure,
  calculateCompletenessScore,
} from './utils/DataModelingUtils';
import {
  generateDataPath,
} from './utils/DataGovernanceUtils';

/**
 * Database Management Agent Class
 * Specializes in agricultural data organization, quality, and governance
 */
export class DatabaseManagementAgent implements Agent {
  type = 'database-management' as const;
  name = 'Database Management Expert';
  description = 'Specializes in agricultural data organization, quality assurance, and governance';
  status: AgentStatus = 'idle';

  /**
   * Determines if this agent can handle the given query
   * @param query - User query string
   * @returns True if agent should handle this query
   */
  canHandle(query: string): boolean {
    const keywords = [
      'database',
      'dati',
      'salva',
      'archivia',
      'organizza',
      'traccia',
      'registro',
      'storico',
      'esporta',
      'importa',
      'backup',
      'struttura',
      'modello',
      'schema',
      'qualità',
    ];

    const lowerQuery = query.toLowerCase();
    return keywords.some(keyword => lowerQuery.includes(keyword));
  }

  /**
   * Main processing method
   * @param context - Agent context with user query and data
   * @returns Agent response with data management recommendations
   */
  async process(context: AgentContext): Promise<AgentResponse> {
    this.status = 'thinking';

    try {
      await this.simulateProcessing(650);
      this.status = 'processing';

      const response = this.generateDataManagementResponse(context);

      this.status = 'completed';
      return response;
    } catch (error) {
      this.status = 'error';
      throw error;
    }
  }

  /**
   * Generate comprehensive data management response
   * @param context - Agent context
   * @returns Formatted agent response
   */
  private generateDataManagementResponse(context: AgentContext): AgentResponse {
    const { additionalData } = context;
    let content = '💾 **Gestione Database Agricolo**\n\n';
    const suggestions: string[] = [];
    let confidence = 0.88;

    // Check if there's specific data to analyze
    if (additionalData?.dataToAnalyze) {
      content += this.analyzeDataQuality(additionalData.dataToAnalyze);
      confidence = 0.92;
    } else {
      content += this.provideGeneralDataManagementAdvice();
    }

    // Add data organization strategy
    content += this.generateOrganizationStrategy();

    // Add best practices
    content += this.addDataGovernanceBestPractices();

    suggestions.push(
      'Mantieni sempre una copia raw dei dati originali',
      'Organizza per anno, poi per coltura/campo',
      'Documenta la fonte e qualità di ogni dato'
    );

    return {
      agentType: this.type,
      content,
      confidence,
      suggestions,
      data: { dataManagementRecommendations: true },
    };
  }

  /**
   * Analyze data quality of provided dataset
   * @param data - Data to analyze
   * @returns Quality analysis report
   */
  private analyzeDataQuality(data: any): string {
    let report = '📊 **Analisi Qualità Dati:**\n\n';

    // Validate structure
    const requiredFields = this.getRequiredFieldsForType(data.type || 'crop');
    const validation = validateDataStructure(data, requiredFields);

    report += `**Completezza Struttura:**\n`;
    if (validation.isValid) {
      report += '✅ Tutti i campi richiesti presenti\n';
    } else {
      report += `⚠️ Campi mancanti: ${validation.missingFields.join(', ')}\n`;
    }

    // Calculate completeness score
    const completeness = calculateCompletenessScore(data, requiredFields.length);
    report += `• Score completezza: ${completeness}%\n\n`;

    // Quality recommendations
    report += this.generateQualityRecommendations(completeness, validation);

    return report;
  }

  /**
   * Get required fields for data type
   * @param type - Data category type
   * @returns Array of required field names
   */
  private getRequiredFieldsForType(type: string): string[] {
    const fieldMap: Record<string, string[]> = {
      crop: ['id', 'name', 'variety', 'sowingDate', 'location'],
      harvest: ['id', 'cropId', 'harvestDate', 'quantity', 'quality'],
      cultivation: ['id', 'cropId', 'action', 'date', 'notes'],
      weather: ['date', 'temperature', 'humidity', 'rainfall', 'location'],
    };

    return fieldMap[type] || ['id', 'name', 'date'];
  }

  /**
   * Generate quality improvement recommendations
   * @param completeness - Completeness score
   * @param validation - Validation results
   * @returns Recommendations text
   */
  private generateQualityRecommendations(
    completeness: number,
    validation: any
  ): string {
    let recs = '**Raccomandazioni Qualità:**\n';

    if (completeness < 70) {
      recs += '🔴 **Priorità Alta**: Completare campi mancanti\n';
      recs += `   → Aggiungi: ${validation.missingFields.join(', ')}\n`;
    } else if (completeness < 90) {
      recs += '🟡 **Buona base**: Migliora dettagli opzionali\n';
    } else {
      recs += '🟢 **Ottima qualità**: Dati completi e strutturati\n';
    }

    recs += '\n**Prossimi passi:**\n';
    recs += '1. Validare accuratezza dei dati inseriti\n';
    recs += '2. Aggiungere metadati (fonte, data raccolta)\n';
    recs += '3. Effettuare backup in location separata\n\n';

    return recs;
  }

  /**
   * Provide general data management advice
   * @returns General advice text
   */
  private provideGeneralDataManagementAdvice(): string {
    return '**Principi Fondamentali Gestione Dati Agricoli:**\n\n' +
      '1. **Data Governance** 📋\n' +
      '   • Stabilisci chi è responsabile di quali dati\n' +
      '   • Definisci standard di qualità e accuratezza\n' +
      '   • Documenta processi di raccolta e validazione\n\n' +
      '2. **Organizzazione Dati** 📁\n' +
      '   • Struttura gerarchica: Anno → Azienda → Campo → Coltura\n' +
      '   • Mantieni sempre versione raw (originale)\n' +
      '   • Usa naming convention consistenti\n\n' +
      '3. **Qualità dei Dati** ✅\n' +
      '   • Valida dati al momento dell\'inserimento\n' +
      '   • Monitora completezza e accuratezza\n' +
      '   • Implementa controlli automatici\n\n';
  }

  /**
   * Generate data organization strategy
   * @returns Organization strategy text
   */
  private generateOrganizationStrategy(): string {
    const currentYear = new Date().getFullYear();
    const examplePath = generateDataPath({
      year: currentYear,
      farm: 'AgroIO_Farm',
      field: 'Campo_A',
      crop: 'Pomodori',
    });

    return '🗂️ **Strategia Organizzazione:**\n\n' +
      '**Struttura Directory Consigliata:**\n' +
      '```\n' +
      `${examplePath}/\n` +
      '  ├── raw/              # Dati originali immutabili\n' +
      '  ├── processed/        # Dati elaborati/puliti\n' +
      '  ├── metadata/         # Informazioni sui dati\n' +
      '  └── backups/          # Copie di sicurezza\n' +
      '```\n\n' +
      '**Convenzioni Naming:**\n' +
      '• File: `TIPO-AAAAMMGG-DESCRIZIONE.ext`\n' +
      '• Esempio: `HARVEST-20240315-Tomatoes-FieldA.csv`\n\n';
  }

  /**
   * Add data governance best practices
   * @returns Best practices text
   */
  private addDataGovernanceBestPractices(): string {
    return '🎯 **Best Practices (USDA/ICASA Standards):**\n\n' +
      '**1. Metadata Completi** 📝\n' +
      '   • Data e ora di raccolta\n' +
      '   • Fonte dei dati (manuale, sensore, importato)\n' +
      '   • Livello di qualità (raw, validated, cleaned)\n' +
      '   • Versione dello schema dati\n\n' +
      '**2. Backup Strategy** 💾\n' +
      '   • Backup on-farm (NAS/disco locale)\n' +
      '   • Backup off-farm (cloud storage)\n' +
      '   • Frequenza: giornaliera per dati critici\n' +
      '   • Test ripristino trimestrale\n\n' +
      '**3. Data Integration** 🔗\n' +
      '   • Usa formati standard (CSV, JSON, GeoJSON)\n' +
      '   • Implementa API per integrazione sistemi\n' +
      '   • Mantieni compatibilità con strumenti comuni\n\n' +
      '**4. Privacy e Sicurezza** 🔒\n' +
      '   • Cripta dati sensibili (finanziari, personali)\n' +
      '   • Controlla accessi (chi può vedere/modificare)\n' +
      '   • Audit trail per modifiche importanti\n\n' +
      '**5. Long-term Stewardship** ⏳\n' +
      '   • Pianifica conservazione multi-anno\n' +
      '   • Migrazione formati obsoleti\n' +
      '   • Documentazione per comprensione futura\n\n';
  }

  /**
   * Simulate processing delay
   * @param ms - Milliseconds to wait
   */
  private async simulateProcessing(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, ms));
  }
}
