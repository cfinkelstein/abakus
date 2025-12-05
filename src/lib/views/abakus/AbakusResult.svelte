<script lang="ts">
	import type { AbakusResult } from "./abakus.ts";
    export let abakusResult: AbakusResult;
    
    let previousCorrect = false;
    
    function playSuccessSound() {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Play a cheerful ascending chord
        const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
        
        frequencies.forEach((freq, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = freq;
            oscillator.type = 'sine';
            
            const startTime = audioContext.currentTime + (index * 0.1);
            gainNode.gain.setValueAtTime(0.2, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + 0.3);
        });
    }
    
    $: isCorrect = abakusResult.expected === abakusResult.actual;
    
    $: {
        if (isCorrect && !previousCorrect) {
            playSuccessSound();
        }
        previousCorrect = isCorrect;
    }
</script>

{#if isCorrect} 
    <div class="animate-pulse mb-6 p-6 {isCorrect ? 'bg-green-100 border-green-300' : 'bg-yellow-100 border-yellow-300'} rounded-2xl border-2">
    <p class="text-2xl font-bold {isCorrect ? 'text-green-700' : 'text-yellow-700'}">{isCorrect ? `🎉` : 'Calculate!'}</p>
</div>
{/if}



