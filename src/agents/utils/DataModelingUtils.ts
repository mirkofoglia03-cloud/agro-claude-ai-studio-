/**
 * Data modeling utilities for agricultural databases
 * Based on best practices from:
 * - https://www.mdpi.com/2071-1050/16/15/6554
 * - https://acsess.onlinelibrary.wiley.com/doi/10.1002/agj2.20639
 */

/**
 * Data quality levels
 */
export enum DataQuality {
  RAW = 'raw',
  VALIDATED = 'validated',
  CLEANED = 'cleaned',
  STANDARDIZED = 'standardized',
}

/**
 * Agricultural data categories
 */
export enum DataCategory {
  CROP = 'crop',
  SOIL = 'soil',
  WEATHER = 'weather',
  CULTIVATION = 'cultivation',
  HARVEST = 'harvest',
  FINANCIAL = 'financial',
}

/**
 * Validate data structure completeness
 * @param data - Data object to validate
 * @param requiredFields - Array of required field names
 * @returns Validation result with missing fields
 */
export function validateDataStructure(
  data: Record<string, any>,
  requiredFields: string[]
): { isValid: boolean; missingFields: string[] } {
  const missingFields = requiredFields.filter(
    field => !(field in data) || data[field] === null || data[field] === undefined
  );

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}

/**
 * Generate unique identifier for agricultural data
 * @param category - Data category
 * @param timestamp - Creation timestamp
 * @param uniquePart - Unique identifier part
 * @returns Formatted unique ID
 */
export function generateDataId(
  category: DataCategory,
  timestamp: Date,
  uniquePart: string
): string {
  const dateStr = timestamp.toISOString().split('T')[0].replace(/-/g, '');
  return `${category.toUpperCase()}-${dateStr}-${uniquePart}`;
}

/**
 * Calculate data completeness score
 * @param data - Data object
 * @param totalFields - Total expected fields
 * @returns Completeness percentage (0-100)
 */
export function calculateCompletenessScore(
  data: Record<string, any>,
  totalFields: number
): number {
  const filledFields = Object.values(data).filter(
    value => value !== null && value !== undefined && value !== ''
  ).length;

  return Math.round((filledFields / totalFields) * 100);
}
