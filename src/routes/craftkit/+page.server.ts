import { docs } from '#lib/docs.server.js';

// The package samples come from the docs pages, so they are written once.
export function load() {
	const packages = docs
		.filter((d) => d.product === 'craftkit' && d.slug !== 'overview')
		.map((d) => ({
			name: d.title,
			path: d.path,
			description: d.description,
			sample: d.html.match(/<div class="code edge">[\s\S]*?<\/button><\/div>/)?.[0] ?? ''
		}));
	return { packages };
}
