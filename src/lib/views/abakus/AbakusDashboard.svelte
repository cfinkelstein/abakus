<script lang="ts">
	import type { AbakusData } from "./abakus.ts";
	import AbakusRow from "./AbakusRow.svelte";

	let { data }: { data: AbakusData } = $props();
</script>


<!-- Abacus Section -->
		
	<div>
		{#each data.rows as row}
			<AbakusRow row={row} />
		{/each}
	</div>
