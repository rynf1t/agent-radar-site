<script lang="ts">
	import { href, site } from '#lib/site.js';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import CopyLine from '#lib/components/CopyLine.svelte';
	import RadarDemo from '#lib/components/RadarDemo.svelte';

	const states = [
		{ s: 'blocked', name: 'blocked', text: 'Waiting on you: a permission, a question or a login' },
		{ s: 'error', name: 'error', text: 'Failed and stopped' },
		{ s: 'done', name: 'done', text: "Finished, and you haven't looked yet. Once you have, it drops to the bottom." },
		{ s: 'working', name: 'working', text: 'Busy. The ring fills if the agent reports progress.' },
		{ s: 'idle', name: 'idle', text: 'Waiting for its next instruction' }
	];

	const keys = [
		{ k: ['↑', '↓'], text: 'Move, or j and k' },
		{ k: ['enter'], text: "Jump to that agent's pane" },
		{ k: ['/'], text: 'Filter by session, title, message, state or folder' },
		{ k: ['⌘', '⇧', 'U'], text: 'Float the radar over any session, with the Rex plugin' },
		{ k: ['q'], text: 'Quit' }
	];

	const packages = [
		{ name: 'termcolor', text: 'Asks the terminal for its colours and mixes greys from them.', chips: ['Wait', 'Mix', 'Luminance'] },
		{ name: 'cliout', text: 'One exit code table, and JSON that suits whoever reads it.', chips: ['Fail', 'Errorf', 'JSON'] },
		{ name: 'skillkit', text: "Installs the embedded agent skill and never touches a file it didn't write.", chips: ['Install', 'Remove', 'Describe'] },
		{ name: 'status', text: 'Writes OSC 7501 reports so Rex knows what your tool is doing.', chips: ['Report', 'Write', 'Percent'] }
	];

	const exits = [
		['0', 'ok'],
		['1', 'failed'],
		['2', 'usage'],
		['3', 'not found'],
		['4', 'Rex unreachable']
	];
</script>

<svelte:head>
	<title>radar · every coding agent in one pane</title>
	<meta
		name="description"
		content="radar shows every coding agent across your Rex sessions in one pane, ordered by who needs you. Enter jumps there."
	/>
	<link rel="alternate" type="text/markdown" href={href('/index.md')} title="Markdown" />
</svelte:head>

<SiteHeader />

<main>
	<section class="hero">
		<div class="pitch">
			<p class="chip reveal" style:--i="0"><span class="pulse" aria-hidden="true"></span>{site.status}, for Rex on macOS</p>
			<h1 class="reveal" style:--i="1">Every coding agent in one pane, ordered by who needs you.</h1>
			<p class="lead reveal" style:--i="2">
				radar watches your Rex sessions and lists every agent by urgency. The one waiting on a
				permission sits at the top, finished work stays marked until you look, and Enter takes you
				there.
			</p>
			<div class="cta reveal" style:--i="3">
				<CopyLine command={site.install} />
				<p class="req">{site.requirement}</p>
			</div>
			<p class="reveal" style:--i="4"><a class="more" href={href('/docs/radar/quick-start')}>Read the quick start</a></p>
		</div>
		<div class="demo reveal" style:--i="2">
			<RadarDemo />
		</div>
	</section>

	<section class="band">
		<div class="copy">
			<p class="eyebrow">What it shows</p>
			<h2>Blocked first, then everything else.</h2>
			<p>
				Agents report their own state through Rex's
				<a href="https://www.superlogical.com/rex/docs/build/program-status">program status protocol</a>,
				so radar never has to guess. It sorts by urgency, then by how long each agent has waited.
			</p>
			<a class="more" href={href('/docs/radar/states')}>States in detail</a>
		</div>
		<ul class="states edge">
			{#each states as st (st.s)}
				<li>
					<span class="mark {st.s}" aria-hidden="true"></span>
					<span class="name">{st.name}</span>
					<span class="text">{st.text}</span>
				</li>
			{/each}
		</ul>
	</section>

	<section class="band">
		<div class="copy">
			<p class="eyebrow">Jump</p>
			<h2>Enter takes you there.</h2>
			<p>
				radar focuses the agent's pane, then asks Rex to show its session. Keep it open beside you
				with <code>radar show</code>, or add the Rex plugin and float it over any session with
				Cmd+Shift+U. Enter jumps and closes the float.
			</p>
			<p class="note">Jumping needs Remote Control, which you turn on in Rex Settings under Rex Server.</p>
		</div>
		<dl class="keys">
			{#each keys as row (row.text)}
				<div>
					<dt>{#each row.k as k (k)}<kbd>{k}</kbd>{/each}</dt>
					<dd>{row.text}</dd>
				</div>
			{/each}
		</dl>
	</section>

	<section class="band">
		<div class="copy">
			<p class="eyebrow">Scripts and agents</p>
			<h2>The same list, as JSON.</h2>
			<p>
				Every command exits with a code a script can branch on. The agent skill ships inside the
				binary, so it always matches the version you run.
			</p>
			<a class="more" href={href('/docs/radar/agents')}>Read this, agents</a>
		</div>
		<div class="code-stack">
			<pre class="edge"><code><span class="c"># anything waiting on me?</span>
<span class="f">radar</span> ls --state blocked --json | <span class="f">jq</span> -r <span class="s">'.agents[] | "\(.session): \(.msg)"'</span>

<span class="c"># jump to whatever needs me</span>
<span class="f">radar</span> focus

<span class="c"># teach Claude Code to use it</span>
<span class="f">radar</span> skill install</code></pre>
			<ul class="exits" aria-label="Exit codes">
				{#each exits as [code, text] (code)}
					<li><code>{code}</code>{text}</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="band kit">
		<div class="copy">
			<p class="eyebrow">Built on craftkit</p>
			<h2>Four small packages every tool needs.</h2>
			<p>
				radar's colours, exit codes, skill installer and status reports live in craftkit, so the next
				tool starts from the same place.
			</p>
			<a class="more" href={href('/craftkit')}>About craftkit</a>
		</div>
		<ul class="cards">
			{#each packages as p (p.name)}
				<li class="card edge">
					<a href={href(`/docs/craftkit/${p.name}`)}>
						<code class="pkg">{p.name}</code>
						<span class="ptext">{p.text}</span>
						<span class="chips">{#each p.chips as c (c)}<span>{c}</span>{/each}</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>

	<section class="faq">
		<p class="eyebrow">Questions</p>
		<dl>
			<div>
				<dt>What does it need?</dt>
				<dd>Rex Beta 0.1 on macOS, Go 1.26 to install it, and Remote Control turned on if you want Enter to jump.</dd>
			</div>
			<div>
				<dt>How early is it?</dt>
				<dd>In daily use by one person. The CLI and the JSON shape may still change.</dd>
			</div>
			<div>
				<dt>Does it see agents on other machines?</dt>
				<dd>Not yet. radar reads the local Rex server, so it shows agents on this Mac.</dd>
			</div>
			<div>
				<dt>Can my agent read these docs?</dt>
				<dd>Yes. Add <code>.md</code> to any docs URL, or start at <a href={href('/llms.txt')} data-sveltekit-reload>llms.txt</a>.</dd>
			</div>
		</dl>
	</section>
</main>

<SiteFooter />

<style>
	main {
		max-width: 72rem;
		margin: 0 auto;
		padding: 0 var(--gutter);
	}

	/* ---------- hero ---------- */

	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 3rem;
		align-items: center;
		min-height: min(46rem, calc(100dvh - 5rem));
		padding: 3.5rem 0 4rem;
	}

	@media (min-width: 64rem) {
		.hero {
			grid-template-columns: minmax(0, 1fr) 26rem;
			gap: 4rem;
		}
	}

	.pitch {
		min-width: 0;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 1.5rem;
		justify-items: start;
		max-width: 36rem;
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

	.pulse {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--accent);
	}

	h1 {
		font-size: var(--text-display);
		line-height: 1.06;
		letter-spacing: -0.03em;
	}

	.lead {
		color: var(--soft);
		font-size: var(--text-lead);
		line-height: 1.5;
		max-width: 33rem;
	}

	.cta {
		display: grid;
		gap: 0.6rem;
		width: 100%;
		max-width: 34rem;
		margin-top: 0.5rem;
	}

	.req {
		color: var(--muted);
		font-size: var(--text-small);
		padding-left: 1rem;
	}

	.more {
		color: var(--ink);
		font-size: var(--text-nav);
		text-decoration: underline;
		text-decoration-color: var(--faint);
		text-underline-offset: 3px;
		transition: text-decoration-color var(--dur-hover);
	}

	.more::after {
		content: ' →';
		color: var(--muted);
	}

	.more:hover {
		text-decoration-color: currentColor;
	}

	.demo {
		display: grid;
		justify-items: center;
	}

	/* a once-only stagger for the hero, nothing elsewhere moves on load */
	@media (prefers-reduced-motion: no-preference) {
		.reveal {
			animation: reveal 600ms cubic-bezier(0.22, 1, 0.36, 1) both;
			animation-delay: calc(var(--i) * 60ms);
		}
	}

	@keyframes reveal {
		from {
			opacity: 0;
			translate: 0 10px;
			filter: blur(3px);
		}
	}

	/* ---------- bands ---------- */

	.band {
		display: grid;
		gap: 2rem;
		padding: 4.5rem 0;
	}

	@media (min-width: 60rem) {
		.band {
			grid-template-columns: 22rem minmax(0, 1fr);
			gap: 4rem;
			align-items: start;
		}
	}

	.copy {
		display: grid;
		gap: 0.75rem;
		justify-items: start;
	}

	h2 {
		font-size: clamp(1.375rem, 1.1rem + 0.8vw, 1.75rem);
		line-height: 1.15;
		letter-spacing: -0.02em;
	}

	.copy p:not(.eyebrow) {
		color: var(--soft);
		line-height: 1.55;
	}

	.copy a:not(.more) {
		color: var(--ink);
		text-decoration: underline;
		text-decoration-color: var(--faint);
		text-underline-offset: 3px;
	}

	.copy code,
	.faq code {
		background: var(--wash);
		padding: 0.1em 0.35em;
		border-radius: var(--radius-sm);
		color: var(--ink);
	}

	.copy .note {
		color: var(--muted);
		font-size: var(--text-small);
	}

	/* native-feeling list: no lines, a wash on hover */
	.states {
		list-style: none;
		padding: 0.4rem;
		border-radius: var(--radius-panel);
		box-shadow: var(--shadow-surface);
	}

	.states li {
		display: grid;
		grid-template-columns: 1rem 5.5rem 1fr;
		align-items: baseline;
		padding: 0.7rem 0.75rem;
		border-radius: var(--radius-item);
		transition: background-color var(--dur-hover);
	}

	.states li:hover {
		background: var(--wash);
	}

	.states .name {
		color: var(--ink);
	}

	.states .text {
		color: var(--soft);
	}

	@media (max-width: 30rem) {
		.states li {
			grid-template-columns: 1rem 1fr;
		}
		.states .text {
			grid-column: 2;
		}
	}

	.keys {
		display: grid;
		gap: 0.25rem;
	}

	.keys div {
		display: grid;
		grid-template-columns: 6rem 1fr;
		align-items: baseline;
		padding: 0.55rem 0;
	}

	.keys dt {
		display: flex;
		gap: 0.25rem;
	}

	.keys kbd {
		font-size: 0.8125rem;
		background: var(--surface);
		color: var(--ink);
		box-shadow: var(--shadow-surface);
		padding: 0.05rem 0.45rem;
	}

	.keys dd {
		color: var(--soft);
	}

	.code-stack {
		display: grid;
		gap: 1rem;
		min-width: 0;
	}

	pre {
		overflow-x: auto;
		padding: 1rem 1.1rem;
		border-radius: var(--radius-panel);
		box-shadow: var(--shadow-surface);
		font-size: 0.8125rem;
		line-height: 1.65;
		color: var(--ink);
		scrollbar-width: thin;
	}

	pre .c {
		color: var(--sh-com);
	}
	pre .f {
		color: var(--sh-fn);
	}
	pre .s {
		color: var(--sh-str);
	}

	.exits {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		list-style: none;
		font-size: var(--text-small);
		color: var(--soft);
	}

	.exits li {
		display: inline-flex;
		gap: 0.4rem;
		align-items: baseline;
		padding: 0.2rem 0.6rem 0.2rem 0.3rem;
		border-radius: 999px;
		background: var(--wash);
	}

	.exits code {
		min-width: 1.4rem;
		text-align: center;
		border-radius: 999px;
		background: var(--surface);
		color: var(--ink);
		font-size: 0.75rem;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
		gap: 0.75rem;
		list-style: none;
	}

	.card {
		border-radius: var(--radius-panel);
		box-shadow: var(--shadow-surface);
		transition: box-shadow var(--dur);
	}

	.card:hover {
		box-shadow: var(--shadow-raised);
	}

	.card a {
		display: grid;
		gap: 0.5rem;
		height: 100%;
		padding: 1.1rem 1.1rem 1rem;
		text-decoration: none;
		border-radius: inherit;
	}

	.pkg {
		color: var(--ink);
		font-size: 0.875rem;
	}

	.ptext {
		color: var(--soft);
		line-height: 1.5;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		margin-top: 0.25rem;
	}

	.chips span {
		padding: 0.05rem 0.45rem;
		border-radius: var(--radius-sm);
		background: var(--wash);
		color: var(--soft);
		font-family: var(--font-mono);
		font-size: 0.6875rem;
	}

	/* ---------- questions ---------- */

	.faq {
		padding: 4.5rem 0 5rem;
	}

	.faq dl {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
		gap: 2rem 4rem;
		max-width: 52rem;
		margin-top: 1.25rem;
	}

	.faq dt {
		color: var(--ink);
		padding-bottom: 0.35rem;
	}

	.faq dd {
		color: var(--soft);
		line-height: 1.55;
	}

	.faq a {
		color: var(--ink);
		text-decoration: underline;
		text-decoration-color: var(--faint);
		text-underline-offset: 3px;
	}
</style>
