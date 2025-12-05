<script lang="ts">
	import type { AbakusValue } from "./abakus.ts";
    export let abakusValue: AbakusValue;
</script>

<div class="mb-4 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200">
    <!--<h2 class="text-2xl font-light text-gray-600 tracking-wide">Current Value</h2>-->
    <p class="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 via-blue-600 to-green-600">{abakusValue.value}</p>
</div>
