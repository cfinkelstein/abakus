<script lang="ts">
	import type { AbakusRowItem } from "./abakus.ts";
	export let rowItem: AbakusRowItem;
	export let enabled: Boolean;
	
	function playClickSound() {
		const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		
		oscillator.frequency.value = 800;
		oscillator.type = 'sine';
		
		gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
		gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
		
		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + 0.1);
	}
	
	function handleClick() {
		playClickSound();
		//rowItem.selected = !rowItem.selected;
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
			/*box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);*/
		}
		50% {
			transform: scale(0.85);
			/*box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);*/
		}
	}
	
	.hint-pulse {
		animation: pulse 1.5s ease-in-out infinite;
	}
</style>
