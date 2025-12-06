/**
 * Application-wide constants for the Abakus application
 */

/**
 * Timing constants for delays and animations (in milliseconds)
 */
export const DELAYS = {
	/** Delay before resetting the problem after a correct answer */
	RESET_AFTER_CORRECT: 2000,
	/** Initial delay before showing hint */
	HINT_INITIAL: 500,
	/** Duration to show the hint pulse animation */
	HINT_DURATION: 3000,
} as const;

/**
 * Configuration for problem generation
 */
export const PROBLEM_CONFIG = {
	/** Number of terms in each addition problem */
	TERMS_COUNT: 2,
	/** Minimum value for each term */
	MIN_TERM_VALUE: 1,
	/** Maximum value for each term */
	MAX_TERM_VALUE: 10,
} as const;

/**
 * Abacus row configuration
 */
export const ABACUS_CONFIG = {
	/** Number of beads per row */
	BEADS_PER_ROW: 10,
	/** Number of beads to split colors (1-5 red, 6-10 green) */
	COLOR_SPLIT_THRESHOLD: 5,
} as const;
