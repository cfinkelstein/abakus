<script lang="ts">
	import type { AbakusData } from "$lib/views/abakus/abakus.ts";
	import AbakusDashboard from "$lib/views/abakus/AbakusDashboard.svelte";
	import AbakusTask from "$lib/views/abakus/AbakusTask.svelte";
	import { DELAYS, PROBLEM_CONFIG, ABACUS_CONFIG } from "$lib/views/abakus/constants";

	// Track timeout IDs to prevent race conditions
	let hintTimeouts = new Map<string, number>();
	let resetTimeout: number | null = null;

	/**
	 * Generate random addition problem terms
	 */
	function calculateTerms(): number[] {
		const terms: number[] = [];
		for (let i = 0; i < PROBLEM_CONFIG.TERMS_COUNT; i++) {
			terms.push(
				Math.floor(Math.random() * PROBLEM_CONFIG.MAX_TERM_VALUE) +
					PROBLEM_CONFIG.MIN_TERM_VALUE
			);
		}
		return terms;
	}

	/**
	 * Initialize abacus state with reactive Svelte 5 $state
	 */
	let exampleData = $state<AbakusData>({
		rows: [],
		title: "Abakus Example",
		task: { terms: [], actual: 0, expected: 0 }
	});

	/**
	 * Derived value: Calculate absolute value from selected beads
	 */
	const absoluteValue = $derived(
		exampleData.rows.reduce(
			(sum, row) =>
				sum +
				row.items.reduce((rowSum, item) => rowSum + (item.selected ? item.value : 0), 0),
			0
		)
	);

	/**
	 * Initialize or reset the abacus state
	 */
	function init() {
		// Clear any pending timeouts
		clearAllTimeouts();

		const hundreds = {
			name: "Hundreds",
			shortName: "100s",
			index: 0,
			items: Array(ABACUS_CONFIG.BEADS_PER_ROW)
				.fill(0)
				.map((_, i) => ({
					id: `hundreds-${i + 1}`,
					nr: i + 1,
					value: 100,
					selected: false,
					hint: false,
					parentName: "Hundreds",
					callback: () => clickCallBack(i, 0)
				}))
		};

		const tens = {
			name: "Tens",
			shortName: "10s",
			index: 1,
			items: Array(ABACUS_CONFIG.BEADS_PER_ROW)
				.fill(0)
				.map((_, i) => ({
					id: `tens-${i + 1}`,
					nr: i + 1,
					value: 10,
					selected: false,
					parentName: "Tens",
					hint: false,
					callback: () => clickCallBack(i, 1)
				}))
		};

		const ones = {
			name: "Ones",
			shortName: "1s",
			index: 2,
			items: Array(ABACUS_CONFIG.BEADS_PER_ROW)
				.fill(0)
				.map((_, i) => ({
					id: `ones-${i + 1}`,
					nr: i + 1,
					value: 1,
					selected: false,
					parentName: "Ones",
					hint: false,
					callback: () => clickCallBack(i, 2)
				}))
		};

		const initialTerms = calculateTerms();
		const initialExpected = initialTerms.reduce((a, b) => a + b, 0);

		exampleData.rows = [hundreds, tens, ones];
		exampleData.task = { terms: initialTerms, actual: 0, expected: initialExpected };
	}

	/**
	 * Clear all pending timeouts
	 */
	function clearAllTimeouts() {
		hintTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
		hintTimeouts.clear();
		if (resetTimeout !== null) {
			clearTimeout(resetTimeout);
			resetTimeout = null;
		}
	}

	/**
	 * Clear hint timeout for a specific item
	 */
	function clearHintTimeout(itemId: string) {
		const timeoutId = hintTimeouts.get(itemId);
		if (timeoutId) {
			clearTimeout(timeoutId);
			hintTimeouts.delete(itemId);
		}
	}

	/**
	 * Handle bead click callback
	 */
	function clickCallBack(itemIndex: number, rowIndex: number, pulseHint: boolean = false) {
		const row = exampleData.rows[rowIndex];
		const item = row.items[itemIndex];

		// Toggle selection
		item.selected = !item.selected;

		// Handle hint pulse
		if (pulseHint) {
			const itemId = item.id;
			clearHintTimeout(itemId);

			item.hint = true;
			const timeoutId = window.setTimeout(() => {
				item.hint = false;
				hintTimeouts.delete(itemId);
			}, DELAYS.HINT_DURATION);

			hintTimeouts.set(itemId, timeoutId);
		}

		// Apply abacus constraint: all beads to the right are selected, all to the left are unselected
		row.items.forEach((rowItem, index) => {
			if (index < itemIndex) {
				rowItem.selected = false;
			} else if (index > itemIndex) {
				rowItem.selected = true;
			}
		});

		// Update task actual value using derived absoluteValue
		exampleData.task.actual = absoluteValue;

		// Check if answer is correct
		if (exampleData.task.actual === exampleData.task.expected) {
			// Clear any existing reset timeout
			if (resetTimeout !== null) {
				clearTimeout(resetTimeout);
			}

			resetTimeout = window.setTimeout(() => {
				init();
				resetTimeout = null;
			}, DELAYS.RESET_AFTER_CORRECT);
		} else {
			// Hint system: suggest next step after delay
			window.setTimeout(() => {
				const allSelected = row.items.every((i) => i.selected);
				if (allSelected) {
					// Deselect all beads in current row
					clickCallBack(row.items.length - 1, rowIndex);

					// If not the first row, suggest incrementing the previous row
					if (rowIndex > 0) {
						const previousRow = exampleData.rows[rowIndex - 1];
						let lastSelected = previousRow.items.findIndex((i) => i.selected);
						if (lastSelected === -1) {
							lastSelected = previousRow.items.length;
						}
						clickCallBack(lastSelected - 1, rowIndex - 1, true);
					}
				}
			}, DELAYS.HINT_INITIAL);
		}
	}

	// Initialize on component load
	init();
</script>

<div class="w-full max-w-6xl">
	<div class="p-8">
		<div class="text-center">
			<AbakusTask task={exampleData.task} />
		</div>
	</div>
	<div>
		<AbakusDashboard data={exampleData} />
	</div>
</div>
