<script lang="ts">
    import { text } from "@sveltejs/kit";
	import type { AbakusTask } from "./abakus.ts";
    export let task: AbakusTask;

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
    
    $: isCorrect = task.expected === task.actual;
    
    $: {
        if (isCorrect && !previousCorrect) {
            playSuccessSound();
        }
        previousCorrect = isCorrect;
    }

</script>

<div class="p-3 md:p-6">
    <!--<p class="text-sm font-medium text-indigo-600 mb-2">Solve this:</p>-->
    <p class="md:text-6xl text-4xl font-bold bg-clip-text text-light">
        {task.terms.join(' + ')} 
        <!--<span class="text-dark">{@html  task.actual === task.expected || task.actual === 0 ? ' = ' : ' &ne; '}</span> -->
       &nbsp;<span class="text-black">=</span>&nbsp;
        <span class="{task.actual === task.expected ? 'text-green-600' : 'text-light'}">
            {#if task.actual > task.expected}
                <span class="text-navy underline">{task.actual}</span> - {(task.expected - task.actual) * -1}
            {:else if task.actual < task.expected && task.actual !== 0}
                <span class="text-navy underline">{task.actual}</span> + {task.expected - task.actual}
            {:else}
                {task.actual > 0 ? task.actual : '?'}
            {/if}        
        </span>
    </p>
</div> 

