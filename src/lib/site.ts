// One place for facts that appear on several pages. Change them here.

// VITE_BASE serves the site under a subfolder, as GitHub Pages does
// (VITE_BASE=/agent-radar-site). VITE_ORIGIN is the full public address,
// base included. vite.config.ts reads VITE_BASE too.
const base = import.meta.env.VITE_BASE ?? '';

/** A site path such as "/docs/radar/states", with the base path in front. */
export function href(path: string): string {
	return base + path;
}

export const site = {
	name: 'radar',
	origin: import.meta.env.VITE_ORIGIN ?? 'https://radar.itsryan.me',
	radarRepo: 'https://github.com/rynf1t/agent-radar',
	craftkitRepo: 'https://github.com/rynf1t/craftkit',
	install: 'go install github.com/rynf1t/agent-radar/cmd/radar@latest',
	craftkitInstall: 'go get github.com/rynf1t/craftkit',
	requirement: 'Needs Rex Beta 0.1 on macOS and Go 1.26 or later.',
	status: 'Early'
} as const;
