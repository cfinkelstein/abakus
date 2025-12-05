<script lang="ts">
	import favicon from '$lib/assets/icon.svg';
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>Abakus - MyOwnLab</title>
	<link rel="icon" type="image/svg+xml" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-bluegray flex justify-center">
	{@render children()}
</div>

