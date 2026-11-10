<script lang="ts">
	import { href, site } from '#lib/site.js';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import CopyLine from '#lib/components/CopyLine.svelte';
	import { copyButtons } from '#lib/copy.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const chips: Record<string, string[]> = {
		termcolor: ['Wait', 'Theme', 'Mix', 'Luminance', 'Contrast'],
		cliout: ['OK', 'NotFound', 'Unreachable', 'Fail', 'Errorf', 'JSON'],
		skillkit: ['Skill', 'Install', 'Remove', 'Describe', 'DefaultDir'],
		status: ['Report', 'Write', 'Blocked', 'Working', 'Percent']
	};
</script>

<svelte:head>
	<title>craftkit · small Go packages for terminal tools</title>
	<meta
		name="description"
		content="craftkit is four small Go packages: terminal colours, exit codes, an embedded agent skill installer, and program status reports."
	/>
	<link rel="alternate" type="text/markdown" href={href('/craftkit.md')} title="Markdown" />
</svelte:head>

<SiteHeader />

<main>
	<section class="intro">
		<p class="chip"><span class="dot" aria-hidden="true"></span>{site.status} · 4 packages · Go</p>
		<h1>craftkit</h1>
		<p class="promise">The small parts every terminal tool needs, written once.</p>
		<p class="explain">
			Follow the terminal's colours, share one exit code table, ship the agent skill inside the binary,
			and report status to the terminal. Each package was pulled out of
			<a href={href('/')}>radar</a> when it needed one, and the API will change while there's only one user.
		</p>
		<div class="cta">
			<CopyLine command={site.craftkitInstall} />
			<p class="req">Go 1.26 or later. <a href={href('/docs/craftkit/overview')}>Read the docs</a></p>
		</div>
	</section>

	<div class="packages prose" {@attach copyButtons}>
		{#each data.packages as p (p.name)}
			<section class="pkg" id={p.name}>
				<div class="info">
					<h2><code>{p.name}</code></h2>
					<p>{p.description}</p>
					<p class="chips">{#each chips[p.name] ?? [] as c (c)}<span>{c}</span>{/each}</p>
					<a class="more" href={href(p.path)}>{p.name} docs</a>
				</div>
				<div class="sample">
					<!-- Highlighted at build time from our own docs Markdown. -->
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html p.sample}
				</div>
			</section>
		{/each}
	</div>

	<section class="rules">
		<p class="eyebrow">Read this, agents</p>
		<ul>
			<li>No package reads the terminal itself. Callers own stdin and pass replies in.</li>
			<li>A package is added only when a tool needs it, and moves here from that tool.</li>
			<li>One folder per package, each with a test file. Run <code>go test ./...</code>.</li>
		</ul>
	</section>
</main>

<SiteFooter />

<style>
	main {
		max-width: 72rem;
		margin: 0 auto;
		padding: 0 var(--gutter);
	}

	.intro {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		justify-items: start;
		gap: 1.1rem;
		max-width: 40rem;
		padding: 5rem 0 4rem;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0.7rem 0.25rem 0.6rem;
		border-radius: 999px;
		background: var(--wash);
		color: var(--soft);
		font-size: var(--text-small);
	}

	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--accent);
	}

	h1 {
		font-size: var(--text-display);
		line-height: 1;
		letter-spacing: -0.035em;
	}

	.promise {
		font-size: var(--text-lead);
		color: var(--ink);
	}

	.explain {
		color: var(--soft);
		line-height: 1.6;
	}

	.explain a,
	.req a {
		color: var(--ink);
		text-decoration: underline;
		text-decoration-color: var(--faint);
		text-underline-offset: 3px;
	}

	.cta {
		display: grid;
		gap: 0.6rem;
		width: 100%;
		max-width: 30rem;
		margin-top: 0.5rem;
	}

	.req {
		color: var(--muted);
		font-size: var(--text-small);
		padding-left: 1rem;
	}

	.packages {
		display: grid;
	}

	.packages > * + * {
		margin-top: 0;
	}

	.pkg {
		display: grid;
		gap: 1.5rem;
		padding: 3rem 0;
		scroll-margin-top: 2rem;
	}

	@media (min-width: 60rem) {
		.pkg {
			grid-template-columns: 22rem minmax(0, 1fr);
			gap: 4rem;
		}
	}

	.info {
		display: grid;
		gap: 0.6rem;
		align-content: start;
		justify-items: start;
	}

	.prose h2 {
		padding-top: 0;
		font-size: 1.25rem;
	}

	.prose h2 code {
		background: none;
		padding: 0;
		font-size: 1em;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
	}

	.chips span {
		padding: 0.05rem 0.45rem;
		border-radius: var(--radius-sm);
		background: var(--wash);
		color: var(--soft);
		font-family: var(--font-mono);
		font-size: 0.6875rem;
	}

	.more {
		font-size: var(--text-nav);
	}

	.more::after {
		content: ' →';
		color: var(--muted);
	}

	.sample {
		min-width: 0;
	}

	.rules {
		max-width: 40rem;
		padding: 3rem 0 6rem;
		color: var(--soft);
	}

	.rules ul {
		margin-top: 0.75rem;
		padding-left: 1.1rem;
		display: grid;
		gap: 0.4rem;
	}

	.rules code {
		background: var(--wash);
		padding: 0.1em 0.35em;
		border-radius: var(--radius-sm);
		color: var(--ink);
	}
</style>
