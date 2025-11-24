/**
 * GardenDesignAgent - Expert system for garden planning and design
 *
 * Implements permaculture principles and best practices from:
 * - https://www.permaculturegardens.org/design-your-permaculture-garden
 * - https://www.tenthacrefarm.com/6-maps-permaculture-farm-design/
 * - https://greenglobaltravel.com/permaculture-garden-guide/
 *
 * @author Multi-Agent System
 * @version 1.0.0
 */

import type { Agent, AgentContext, AgentResponse, AgentStatus } from '../types/agents';
import {
  recommendLayout,
  calculateBedDimensions,
  GardenLayout,
} from './utils/PermacultureUtils';
import { recommendBedOrientation } from './utils/SolarUtils';

/**
 * Garden Design Agent Class
 * Specializes in permaculture garden planning, layout design, and spatial optimization
 */
export class GardenDesignAgent implements Agent {
  type = 'garden-design' as const;
  name = 'Garden Design Expert';
  description = 'Specializes in permaculture garden planning, layout optimization, and spatial design';
  status: AgentStatus = 'idle';

  /**
   * Determines if this agent can handle the given query
   * @param query - User query string
   * @returns True if agent should handle this query
   */
  canHandle(query: string): boolean {
    const keywords = [
      'progetta',
      'progettazione',
      'design',
      'layout',
      'disposizione',
      'organizza',
      'spazio',
      'dimensioni',
      'orto',
      'giardino',
      'aiuola',
      'permacultura',
      'zona',
      'mappa',
      'pianta',
      'schema',
    ];

    const lowerQuery = query.toLowerCase();
    return keywords.some(keyword => lowerQuery.includes(keyword));
  }

  /**
   * Main processing method
   * @param context - Agent context with user query and data
   * @returns Agent response with design recommendations
   */
  async process(context: AgentContext): Promise<AgentResponse> {
    this.status = 'thinking';

    try {
      await this.simulateProcessing(700);
      this.status = 'processing';

      const response = this.generateDesignResponse(context);

      this.status = 'completed';
      return response;
    } catch (error) {
      this.status = 'error';
      throw error;
    }
  }

  /**
   * Generate comprehensive design response
   * @param context - Agent context
   * @returns Formatted agent response
   */
  private generateDesignResponse(context: AgentContext): AgentResponse {
    const { additionalData } = context;
    let content = '🏡 **Progettazione Orto - Esperto Permacultura**\n\n';
    const suggestions: string[] = [];
    let confidence = 0.85;

    // Extract garden parameters from context
    const gardenData = this.extractGardenParameters(additionalData);

    if (gardenData.area) {
      content += this.generateLayoutRecommendation(gardenData);
      content += this.generateZonePlanning(gardenData);
      content += this.generateBedConfiguration(gardenData);
      confidence = 0.9;
    } else {
      content += this.generateGeneralDesignAdvice();
      confidence = 0.75;
    }

    // Add permaculture principles
    content += this.addPermaculturePrinciples();

    suggestions.push(
      'Osserva il terreno per 1-2 settimane prima di piantare',
      'Considera l\'accesso all\'acqua per l\'irrigazione',
      'Pianifica zone in base alla frequenza di manutenzione'
    );

    return {
      agentType: this.type,
      content,
      confidence,
      suggestions,
      data: { gardenParameters: gardenData },
    };
  }

  /**
   * Extract garden parameters from additional data
   * @param data - Additional context data
   * @returns Garden parameters object
   */
  private extractGardenParameters(data?: Record<string, any>): {
    area?: number;
    orientation?: string;
    waterAvailability?: 'low' | 'medium' | 'high';
    slope?: boolean;
    products?: any[];
  } {
    return {
      area: data?.gardenArea,
      orientation: data?.gardenOrientation,
      waterAvailability: data?.waterAvailability || 'medium',
      slope: data?.hasSlope,
      products: data?.selectedProducts || [],
    };
  }

  /**
   * Generate layout recommendation section
   * @param gardenData - Garden parameters
   * @returns Formatted layout recommendation
   */
  private generateLayoutRecommendation(gardenData: any): string {
    const layout = recommendLayout(
      gardenData.area,
      gardenData.waterAvailability
    );
    const dimensions = calculateBedDimensions(layout);

    let content = '📐 **Layout Consigliato:**\n';
    content += `Sistema: **${this.getLayoutName(layout)}**\n\n`;
    content += this.getLayoutDescription(layout);
    content += `\n**Dimensioni aiuole:**\n`;
    content += `• Larghezza: ${dimensions.width} cm\n`;
    content += `• Lunghezza: ${dimensions.length} cm\n`;
    content += `• Larghezza sentieri: ${dimensions.pathWidth} cm\n\n`;

    return content;
  }

  /**
   * Get Italian name for layout type
   * @param layout - Garden layout type
   * @returns Italian layout name
   */
  private getLayoutName(layout: GardenLayout): string {
    const names: Record<GardenLayout, string> = {
      [GardenLayout.MANDALA]: 'Mandala Circolare',
      [GardenLayout.RAISED_BEDS]: 'Aiuole Rialzate',
      [GardenLayout.KEYHOLE]: 'Keyhole (Buco di serratura)',
      [GardenLayout.SPIRAL]: 'Spirale',
      [GardenLayout.ROWS]: 'File Tradizionali',
    };
    return names[layout];
  }

  /**
   * Get detailed layout description
   * @param layout - Garden layout type
   * @returns Layout description
   */
  private getLayoutDescription(layout: GardenLayout): string {
    const descriptions: Record<GardenLayout, string> = {
      [GardenLayout.MANDALA]:
        'Il sistema Mandala massimizza la densità di piante e facilita irrigazione.\n' +
        'Le colture sono disposte in cerchi concentrici attorno ad un punto centrale.\n',
      [GardenLayout.RAISED_BEDS]:
        'Aiuole rialzate ideali per terreni poveri o argillosi.\n' +
        'Non richiedono lavorazione del suolo, preservando nutrienti.\n',
      [GardenLayout.KEYHOLE]:
        'Design circolare con accesso centrale per compostaggio.\n' +
        'Ottimo per spazi ridotti, massima efficienza.\n',
      [GardenLayout.SPIRAL]:
        'Crea microclimi diversi in spazio ridotto.\n' +
        'Ideale per erbe aromatiche con esigenze diverse.\n',
      [GardenLayout.ROWS]:
        'Sistema tradizionale per orti di grandi dimensioni.\n' +
        'Facilita meccanizzazione e gestione.\n',
    };
    return descriptions[layout];
  }

  /**
   * Generate zone planning section
   * @param gardenData - Garden parameters
   * @returns Formatted zone planning
   */
  private generateZonePlanning(_gardenData: any): string {
    let content = '🎯 **Pianificazione Zone Permacultura:**\n\n';
    content += 'Organizza l\'orto in zone basate sulla frequenza di accesso:\n\n';
    content += '**Zona 1** (Vicino casa - accesso quotidiano)\n';
    content += '• Erbe aromatiche, insalate, pomodorini\n';
    content += '• Piante che richiedono raccolta frequente\n\n';
    content += '**Zona 2** (Orto principale - 2-3 volte/settimana)\n';
    content += '• Ortaggi principali, peperoni, melanzane\n';
    content += '• Colture che necessitano manutenzione regolare\n\n';
    content += '**Zona 3** (Colture a ciclo lungo - settimanale)\n';
    content += '• Zucche, cavoli, patate\n';
    content += '• Alberi da frutto giovani\n\n';

    return content;
  }

  /**
   * Generate bed configuration details
   * @param gardenData - Garden parameters
   * @returns Formatted bed configuration
   */
  private generateBedConfiguration(gardenData: any): string {
    const orientation = recommendBedOrientation(
      gardenData.orientation,
      gardenData.waterAvailability
    );

    let content = '🧭 **Configurazione Aiuole:**\n\n';
    content += `Orientamento consigliato: **${orientation}**\n`;

    if (orientation === 'north-south') {
      content += '• Massimizza esposizione solare durante il giorno\n';
      content += '• Ideale per climi temperati\n';
    } else if (orientation === 'contour') {
      content += '• Segue le curve di livello del terreno\n';
      content += '• Ottimale per trattenere acqua in zone siccitose\n';
    }

    content += `\n💧 **Gestione Acqua:**\n`;
    content += this.getWaterManagementAdvice(gardenData.waterAvailability);
    content += '\n';

    return content;
  }

  /**
   * Get water management advice
   * @param availability - Water availability level
   * @returns Water management tips
   */
  private getWaterManagementAdvice(availability: string): string {
    if (availability === 'low') {
      return '• Installa sistema irrigazione a goccia\n' +
             '• Usa pacciamatura pesante per ritenzione\n' +
             '• Considera raccolta acqua piovana\n';
    } else if (availability === 'high') {
      return '• Assicura buon drenaggio\n' +
             '• Crea swales per gestire deflusso\n' +
             '• Sfrutta acqua per zone umide\n';
    }
    return '• Irrigazione manuale 2-3 volte/settimana\n' +
           '• Pacciamatura moderata\n';
  }

  /**
   * Generate general design advice
   * @returns General design guidelines
   */
  private generateGeneralDesignAdvice(): string {
    return '**Principi Base Progettazione Orto:**\n\n' +
      '1. **Osservazione**: Studia il terreno per 1-2 settimane\n' +
      '   • Nota dove batte il sole durante il giorno\n' +
      '   • Identifica zone di ristagno acqua\n' +
      '   • Osserva vento dominante\n\n' +
      '2. **Pianificazione su carta**: Disegna una mappa\n' +
      '   • Segna edifici, alberi esistenti, fonti d\'acqua\n' +
      '   • Definisci zone in base a frequenza di accesso\n' +
      '   • Pianifica rotazioni colturali\n\n' +
      '3. **Implementazione graduale**:\n' +
      '   • Inizia con Zona 1 (vicino casa)\n' +
      '   • Espandi progressivamente\n\n';
  }

  /**
   * Add core permaculture principles
   * @returns Permaculture principles section
   */
  private addPermaculturePrinciples(): string {
    return '🌿 **Principi Permacultura Chiave:**\n\n' +
      '• **Lavora con la natura**, non contro\n' +
      '• **Ottieni più funzioni da ogni elemento**\n' +
      '• **Raccogli e conserva energia** (acqua, sole)\n' +
      '• **Usa risorse rinnovabili**\n' +
      '• **Non produrre rifiuti** - tutto è risorsa\n' +
      '• **Progetta dai pattern ai dettagli**\n' +
      '• **Integra invece di segregare**\n\n';
  }

  /**
   * Simulate processing delay
   * @param ms - Milliseconds to wait
   */
  private async simulateProcessing(ms: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, ms));
  }
}
