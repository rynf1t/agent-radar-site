<script lang="ts">
	import '@fontsource-variable/instrument-sans';
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import Search from '#lib/components/Search.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
</svelte:head>

{@render children()}
<Search />
