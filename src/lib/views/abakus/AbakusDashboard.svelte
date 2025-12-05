<script lang="ts">
	import type { AbakusData } from "./abakus.ts";
    import AbakusRow from "./AbakusRow.svelte";
	export let data: AbakusData;
</script>


<!-- Abacus Section -->
		
	<div>
		{#each data.rows as row}
			<AbakusRow row={row} />
		{/each}
	</div>
