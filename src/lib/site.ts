// One place for facts that appear on several pages. Change them here.
// The repositories are not public yet, so these links are placeholders
// taken from the radar and craftkit READMEs.
export const site = {
	name: 'radar',
	origin: 'https://radar.example.com', // placeholder until a domain is chosen
	radarRepo: 'https://github.com/rynf1t/agent-radar',
	craftkitRepo: 'https://github.com/rynf1t/craftkit',
	install: 'go install github.com/rynf1t/agent-radar/cmd/radar@latest',
	craftkitInstall: 'go get github.com/rynf1t/craftkit',
	requirement: 'Needs Rex Beta 0.1 on macOS and Go 1.26 or later.',
	status: 'Early'
} as const;
