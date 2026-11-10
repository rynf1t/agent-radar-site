import { docs } from '#lib/docs.server.js';
import { site } from '#lib/site.js';

export function GET() {
	const lines = [
		'# radar',
		'',
		'> Every coding agent across your Rex sessions in one pane, ordered by who needs you. Plus craftkit, the Go packages it is built on.',
		'',
		'Every page is Markdown at the same URL with `.md` added. The full set is in /llms-full.txt and a JSON index is at /search.json.',
		'',
		'## Pages',
		'',
		`- [radar](${site.origin}/index.md): what radar is and how to install it`,
		`- [craftkit](${site.origin}/craftkit.md): the Go packages radar is built on`,
		''
	];
	for (const product of ['radar', 'craftkit'] as const) {
		lines.push(`## ${product} docs`, '');
		for (const d of docs.filter((x) => x.product === product)) {
			lines.push(`- [${d.title}](${site.origin}${d.path}.md): ${d.description}`);
		}
		lines.push('');
	}
	return new Response(lines.join('\n'), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}

export const prerender = true;
