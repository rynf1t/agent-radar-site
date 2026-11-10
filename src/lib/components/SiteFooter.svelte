<script lang="ts">
	import { site } from '#lib/site.js';
</script>

<footer class="footer">
	<a href="/docs/radar/installation">Docs</a>
	<a href="/craftkit">craftkit</a>
	<span class="rule" aria-hidden="true"></span>
	<a href="/llms.txt">llms.txt</a>
	<a href={site.radarRepo}>GitHub</a>
</footer>

<style>
	.footer {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		max-width: 72rem;
		margin: 0 auto;
		padding: 2rem var(--gutter) 2.5rem;
		font-family: var(--font-mono);
		font-size: 0.75rem;
	}

	.rule {
		flex: 1;
		height: 1px;
		background: var(--rule);
	}

	a {
		color: var(--muted);
		text-decoration: none;
		transition: color var(--dur-hover);
	}

	a:hover {
		color: var(--ink);
	}
</style>
