/**
 * Data governance utilities for farm data management
 * Based on USDA and agricultural data management best practices
 */

/**
 * Data organization structure
 */
export interface DataOrganization {
  year: number;
  crop?: string;
  field?: string;
  farm?: string;
}

/**
 * Metadata standards
 */
export interface AgricultureMetadata {
  dataType: string;
  collectionDate: Date;
  location: string;
  source: string;
  quality: string;
  version: string;
}

/**
 * Generate folder structure path for agricultural data
 * @param org - Data organization parameters
 * @returns Structured path string
 */
export function generateDataPath(org: DataOrganization): string {
  let path = `data/${org.year}`;

  if (org.farm) path += `/${org.farm}`;
  if (org.field) path += `/${org.field}`;
  if (org.crop) path += `/${org.crop}`;

  return path;
}

/**
 * Create metadata object following ICASA standards
 * @param params - Metadata parameters
 * @returns Formatted metadata object
 */
export function createMetadata(
  params: Partial<AgricultureMetadata>
): AgricultureMetadata {
  return {
    dataType: params.dataType || 'unknown',
    collectionDate: params.collectionDate || new Date(),
    location: params.location || 'unspecified',
    source: params.source || 'manual',
    quality: params.quality || 'raw',
    version: params.version || '1.0',
  };
}

/**
 * Validate data quality score
 * @param accuracy - Accuracy percentage
 * @param completeness - Completeness percentage
 * @param timeliness - Data freshness in days
 * @returns Quality score (0-100)
 */
export function calculateQualityScore(
  accuracy: number,
  completeness: number,
  timeliness: number
): number {
  const timelinessScore = Math.max(0, 100 - timeliness * 2);
  return Math.round(
    (accuracy * 0.4 + completeness * 0.4 + timelinessScore * 0.2)
  );
}
