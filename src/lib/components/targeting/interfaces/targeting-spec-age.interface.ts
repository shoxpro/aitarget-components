export interface AgeSpec {
  /**
   * Minimum age. If used, must be 13 or higher. If omitted, will default to 18
   */
  age_min?: number;
  /**
   * Maximum age. If used, must be 65 or lower.
   */
  age_max?: number;
}

export const ageInitial = {
  age_min: 18,
  age_max: 65
};
