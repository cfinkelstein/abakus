<script lang="ts">
	import type { AbakusTask } from "./abakus.ts";
	import { playSuccessSound } from "$lib/audio";

	let { task }: { task: AbakusTask } = $props();

	let previousCorrect = $state(false);

	const isCorrect = $derived(task.expected === task.actual);

	$effect(() => {
		if (isCorrect && !previousCorrect) {
			playSuccessSound();
		}
		previousCorrect = isCorrect;
	});
</script>

<div class="p-3 md:p-6">
    <p class="md:text-6xl text-4xl font-bold bg-clip-text text-light">
        {task.terms.join(' + ')}
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
