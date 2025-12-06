<script lang="ts">
	import type { AbakusRowItem } from "./abakus.ts";
	import { playClickSound } from "$lib/audio";

	export let rowItem: AbakusRowItem;
	export let enabled: Boolean;

	function handleClick() {
		playClickSound();
		rowItem.callback();
	}
</script>

{#if enabled}
	<button
	onclick={() => handleClick()}
	class="md:w-12 md:h-12 w-7 h-7 rounded-full transition-all hover:scale-105 active:scale-95
		{rowItem.selected ? 
			(rowItem.nr <= 5
				? 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg hover:shadow-xl'
				: 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg hover:shadow-xl')
			: 
			(rowItem.nr <= 5
				? 'bg-gradient-to-br from-red-300 to-red-400 opacity-40 shadow-md hover:shadow-lg'
				: 'bg-gradient-to-br from-green-300 to-green-400 opacity-40 shadow-md hover:shadow-lg')
		}
		{rowItem.hint ? 'hint-pulse' : ''}"
		aria-label="Set item {rowItem.nr} with value {rowItem.value} for row {rowItem.parentName}"
></button>
{/if}

<style>
	@keyframes pulse {
		0%, 100% {
			transform: scale(1);
		}
		50% {
			transform: scale(0.85);
		}
	}

	.hint-pulse {
		animation: pulse 1.5s ease-in-out infinite;
	}
</style>
