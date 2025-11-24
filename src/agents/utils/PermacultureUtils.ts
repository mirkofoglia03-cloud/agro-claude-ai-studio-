/**
 * Permaculture utilities for garden design
 * Based on best practices from:
 * - https://www.permaculturegardens.org/design-your-permaculture-garden
 * - https://permaculturepractice.com/permaculture-design-for-beginners/
 */

/**
 * Permaculture zones (0-5 system)
 */
export enum PermacultureZone {
  ZONE_0 = 0, // Inside home
  ZONE_1 = 1, // Immediate surroundings (herbs, salads)
  ZONE_2 = 2, // Intensively cultivated (vegetables)
  ZONE_3 = 3, // Main crops, orchards
  ZONE_4 = 4, // Semi-wild, foraging
  ZONE_5 = 5, // Wilderness
}

/**
 * Calculate optimal zone for a plant based on maintenance needs
 * @param maintenanceFrequency - Daily visits needed (0-7)
 * @returns Recommended permaculture zone
 */
export function calculatePermacultureZone(
  maintenanceFrequency: number
): PermacultureZone {
  if (maintenanceFrequency >= 5) return PermacultureZone.ZONE_1;
  if (maintenanceFrequency >= 3) return PermacultureZone.ZONE_2;
  if (maintenanceFrequency >= 1) return PermacultureZone.ZONE_3;
  return PermacultureZone.ZONE_4;
}

/**
 * Garden layout patterns
 */
export enum GardenLayout {
  MANDALA = 'mandala',
  RAISED_BEDS = 'raised-beds',
  KEYHOLE = 'keyhole',
  SPIRAL = 'spiral',
  ROWS = 'rows',
}

/**
 * Get layout recommendation based on garden size and goals
 * @param areaM2 - Garden area in square meters
 * @param waterAvailability - Water availability level (low/medium/high)
 * @returns Recommended layout pattern
 */
export function recommendLayout(
  areaM2: number,
  waterAvailability: 'low' | 'medium' | 'high'
): GardenLayout {
  if (areaM2 < 10) return GardenLayout.KEYHOLE;
  if (areaM2 < 30 && waterAvailability === 'low') {
    return GardenLayout.MANDALA;
  }
  if (areaM2 < 50) return GardenLayout.RAISED_BEDS;
  return GardenLayout.ROWS;
}

/**
 * Calculate bed dimensions for optimal access
 * @param layoutType - Type of garden layout
 * @returns Width and length in cm
 */
export function calculateBedDimensions(layoutType: GardenLayout): {
  width: number;
  length: number;
  pathWidth: number;
} {
  const configs = {
    [GardenLayout.MANDALA]: { width: 120, length: 120, pathWidth: 50 },
    [GardenLayout.RAISED_BEDS]: { width: 120, length: 300, pathWidth: 60 },
    [GardenLayout.KEYHOLE]: { width: 180, length: 180, pathWidth: 80 },
    [GardenLayout.SPIRAL]: { width: 150, length: 150, pathWidth: 60 },
    [GardenLayout.ROWS]: { width: 100, length: 500, pathWidth: 50 },
  };
  return configs[layoutType];
}
