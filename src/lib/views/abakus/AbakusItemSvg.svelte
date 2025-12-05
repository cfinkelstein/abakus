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
		rowItem.selected = !rowItem.selected;
		rowItem.callback();
	}
	
	// Determine colors based on state
	$: isFirstRow = rowItem.nr <= 5;
	$: gradientId = `gradient-${rowItem.parentName}-${rowItem.nr}`;
	$: glossId = `gloss-${rowItem.parentName}-${rowItem.nr}`;
	$: shadowId = `shadow-${rowItem.parentName}-${rowItem.nr}`;
	$: innerShadowId = `inner-shadow-${rowItem.parentName}-${rowItem.nr}`;
	
	// iOS-style colors with richer saturation
	$: colors = rowItem.selected 
		? (isFirstRow 
			? { light: '#ff6b6b', mid: '#ee5a52', dark: '#dc2626', base: '#ef4444' } // Vibrant red
			: { light: '#4ade80', mid: '#22c55e', dark: '#16a34a', base: '#10b981' }) // Vibrant green
		: (isFirstRow
			? { light: '#ffcccb', mid: '#fca5a5', dark: '#f87171', base: '#fca5a5' } // Muted red
			: { light: '#bbf7d0', mid: '#86efac', dark: '#4ade80', base: '#86efac' }); // Muted green
	
	$: opacity = rowItem.selected ? 1 : 0.5;
</script>

{#if enabled}
	<button
		onclick={() => handleClick()}
		class="w-12 h-12 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
		aria-label="Set item {rowItem.nr} with value {rowItem.value} for row {rowItem.parentName}"
	>
		<svg 
			width="48" 
			height="48" 
			viewBox="0 0 48 48" 
			xmlns="http://www.w3.org/2000/svg"
			class="transition-all drop-shadow-lg"
		>
			<defs>
				<!-- Main gradient: iOS-style top-to-bottom with multiple stops -->
				<linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" style="stop-color:{colors.light};stop-opacity:1" />
					<stop offset="50%" style="stop-color:{colors.mid};stop-opacity:1" />
					<stop offset="100%" style="stop-color:{colors.dark};stop-opacity:1" />
				</linearGradient>
				
				<!-- Glossy highlight gradient -->
				<radialGradient id={glossId} cx="30%" cy="25%">
					<stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.8" />
					<stop offset="40%" style="stop-color:#ffffff;stop-opacity:0.3" />
					<stop offset="100%" style="stop-color:#ffffff;stop-opacity:0" />
				</radialGradient>
				
				<!-- Outer shadow filter (drop shadow) -->
				<filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur in="SourceAlpha" stdDeviation={rowItem.selected ? "3" : "2"} />
					<feOffset dx="0" dy={rowItem.selected ? "3" : "2"} result="offsetblur" />
					<feComponentTransfer>
						<feFuncA type="linear" slope={rowItem.selected ? "0.4" : "0.25"} />
					</feComponentTransfer>
					<feMerge>
						<feMergeNode />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
				
				<!-- Inner shadow for depth -->
				<filter id={innerShadowId}>
					<feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
					<feOffset in="blur" dx="0" dy="2" result="offsetBlur" />
					<feFlood flood-color="#000000" flood-opacity="0.3" result="color" />
					<feComposite in="color" in2="offsetBlur" operator="in" result="shadow" />
					<feComposite in="shadow" in2="SourceAlpha" operator="in" result="innerShadow" />
					<feMerge>
						<feMergeNode in="SourceGraphic" />
						<feMergeNode in="innerShadow" />
					</feMerge>
				</filter>
			</defs>
			
			<!-- Outer glow for selected state -->
			{#if rowItem.selected}
				<circle
					cx="24"
					cy="24"
					r="24"
					fill={colors.base}
					opacity="0.2"
				/>
			{/if}
			
			<!-- Main circle with gradient -->
			<circle
				cx="24"
				cy="24"
				r="20"
				fill="url(#{gradientId})"
				opacity={opacity}
				filter="url(#{shadowId})"
			/>
			
			<!-- Glossy top highlight (iOS signature shine) -->
			<ellipse
				cx="24"
				cy="16"
				rx="14"
				ry="10"
				fill="url(#{glossId})"
				opacity={rowItem.selected ? "0.9" : "0.6"}
			/>
			
			<!-- Top rim highlight -->
			<path
				d="M 10,18 A 14,14 0 0,1 38,18"
				fill="none"
				stroke="white"
				stroke-width="1.5"
				opacity="0.5"
				stroke-linecap="round"
			/>
			
			<!-- Bottom subtle shadow line -->
			<path
				d="M 10,30 A 14,14 0 0,0 38,30"
				fill="none"
				stroke="black"
				stroke-width="0.8"
				opacity="0.15"
				stroke-linecap="round"
			/>
			
			<!-- Outer border for crispness -->
			<circle
				cx="24"
				cy="24"
				r="20"
				fill="none"
				stroke="rgba(0,0,0,0.1)"
				stroke-width="0.5"
			/>
			
			<!-- Inner highlight circle for glass effect -->
			<circle
				cx="24"
				cy="24"
				r="19"
				fill="none"
				stroke="rgba(255,255,255,0.3)"
				stroke-width="0.5"
			/>
		</svg>
	</button>
{/if}

<style>
	button {
		background: none;
		border: none;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
	}
	
	button:hover {
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
	}
	
	button:active {
		filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
	}
	
	button:focus-visible {
		outline: 2px solid #007AFF;
		outline-offset: 3px;
		border-radius: 9999px;
	}
</style>
