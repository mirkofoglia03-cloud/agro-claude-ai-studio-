/**
 * Solar orientation and sun exposure utilities
 * Based on permaculture best practices
 */

export type Orientation = 'north' | 'south' | 'east' | 'west' | 'ne' | 'nw' | 'se' | 'sw';
export type Hemisphere = 'northern' | 'southern';

/**
 * Calculate sun hours based on orientation and season
 * @param orientation - Garden orientation
 * @param hemisphere - Geographic hemisphere
 * @param season - Current season
 * @returns Average daily sun hours
 */
export function calculateSunHours(
  orientation: Orientation,
  hemisphere: Hemisphere,
  season: 'spring' | 'summer' | 'fall' | 'winter'
): number {
  const baseHours = {
    spring: 8,
    summer: 12,
    fall: 8,
    winter: 6,
  }[season];

  const orientationMultipliers: Record<Orientation, number> = {
    south: hemisphere === 'northern' ? 1.0 : 0.6,
    north: hemisphere === 'northern' ? 0.6 : 1.0,
    east: 0.7,
    west: 0.7,
    se: hemisphere === 'northern' ? 0.9 : 0.7,
    sw: hemisphere === 'northern' ? 0.9 : 0.7,
    ne: hemisphere === 'northern' ? 0.7 : 0.8,
    nw: hemisphere === 'northern' ? 0.7 : 0.8,
  };

  return Math.round(baseHours * orientationMultipliers[orientation]);
}

/**
 * Recommend optimal bed orientation
 * @param slopeDirection - Direction of slope
 * @param rainLevel - Rainfall level
 * @returns Recommended orientation
 */
export function recommendBedOrientation(
  slopeDirection?: Orientation,
  rainLevel?: 'low' | 'medium' | 'high'
): 'north-south' | 'east-west' | 'contour' {
  if (slopeDirection && rainLevel === 'low') {
    return 'contour'; // Follow contours to retain water
  }
  return 'north-south'; // Default for sun exposure
}
