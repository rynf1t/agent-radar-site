import { indexMd } from '#lib/twins.js';

export function GET() {
	return new Response(indexMd, { headers: { 'content-type': 'text/markdown; charset=utf-8' } });
}

export const prerender = true;
