<script lang="ts">
	import type { AbakusRow } from "./abakus.ts";
    import AbakusItem from "./AbakusItem.svelte";
    import { flip } from 'svelte/animate';

    import { quintOut } from 'svelte/easing';
	export let row: AbakusRow;
</script>

<div>
    <div class="relative md:h-20 h-10 rounded-2xl overflow-hidden">
        <div class="absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center gap-1"> 
            {#each row.items as item (item.id)}                
                <div class="min-h-1 min-w-1" animate:flip={{ duration: 400, easing: quintOut }}>
                    <AbakusItem enabled={item.selected} rowItem={item} />
                </div>
            {/each}
        </div>
        <div class="absolute left-4 top-1/2 -translate-y-1/2 inline-flex items-center gap-1">
             {#each row.items as item (item.id)}                
                <div class="min-h-1  min-w-1" animate:flip={{ duration: 400, easing: quintOut }}>
                    <AbakusItem enabled={!item.selected} rowItem={item} />
                </div>
            {/each}
        </div>
    </div>
</div>