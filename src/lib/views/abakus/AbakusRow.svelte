<script lang="ts">
	import type { AbakusRow } from "./abakus.ts";
	import AbakusItem from "./AbakusItem.svelte";
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';

	let { row }: { row: AbakusRow } = $props();

	// Derive selected and unselected items for optimized rendering
	const selectedItems = $derived(row.items.filter((item) => item.selected));
	const unselectedItems = $derived(row.items.filter((item) => !item.selected));
</script>

<div>
	<div class="relative md:h-20 h-10 rounded-2xl overflow-hidden">
		<!-- Selected items on the right -->
		<div class="absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center gap-1">
			{#each selectedItems as item (item.id)}
				<div class="min-h-1 min-w-1" animate:flip={{ duration: 400, easing: quintOut }}>
					<AbakusItem enabled={true} rowItem={item} />
				</div>
			{/each}
		</div>

		<!-- Unselected items on the left -->
		<div class="absolute left-4 top-1/2 -translate-y-1/2 inline-flex items-center gap-1">
			{#each unselectedItems as item (item.id)}
				<div class="min-h-1 min-w-1" animate:flip={{ duration: 400, easing: quintOut }}>
					<AbakusItem enabled={true} rowItem={item} />
				</div>
			{/each}
		</div>
	</div>
</div>