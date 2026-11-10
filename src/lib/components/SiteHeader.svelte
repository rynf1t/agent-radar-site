<script lang="ts">
	import { page } from '$app/state';
	import { site } from '#lib/site.js';
	import Wordmark from './Wordmark.svelte';
	import SearchTrigger from './SearchTrigger.svelte';

	const links = [
		{ href: '/docs/radar/installation', label: 'Docs', match: '/docs' },
		{ href: '/craftkit', label: 'craftkit', match: '/craftkit' }
	];
</script>

<header class="header">
	<Wordmark />
	<nav aria-label="Site">
		{#each links as l (l.href)}
			<a href={l.href} aria-current={page.url.pathname.startsWith(l.match) ? 'page' : undefined}>{l.label}</a>
		{/each}
		<a href={site.radarRepo} class="gh">GitHub</a>
		<SearchTrigger />
	</nav>
</header>

<style>
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		max-width: 72rem;
		margin: 0 auto;
		padding: 1.75rem var(--gutter) 0;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 1.4rem;
		font-size: var(--text-nav);
	}

	a {
		color: var(--soft);
		text-decoration: none;
		transition: color var(--dur-hover);
	}

	a:hover,
	a[aria-current='page'] {
		color: var(--ink);
	}

	@media (max-width: 40rem) {
		nav {
			gap: 1rem;
		}
		.gh {
			display: none;
		}
	}
</style>
