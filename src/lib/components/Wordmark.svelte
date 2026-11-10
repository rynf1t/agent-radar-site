<script lang="ts">
	import { href } from '#lib/site.js';
</script>

<a href={href('/')} class="wordmark" aria-label="radar home">
	<svg viewBox="0 0 20 20" aria-hidden="true">
		<circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".28" />
		<circle cx="10" cy="10" r="4.4" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55" />
		<circle cx="10" cy="10" r="2.2" fill="var(--accent)" />
	</svg>
	<span>radar</span>
</a>

<style>
	.wordmark {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		text-decoration: none;
		font-size: 1.0625rem;
		font-weight: 500;
		letter-spacing: -0.02em;
		color: var(--ink);
	}

	svg {
		width: 20px;
		height: 20px;
	}
</style>
