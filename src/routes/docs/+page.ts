import { redirect } from '@sveltejs/kit';
import { href } from '#lib/site.js';

export function load() {
	redirect(308, href('/docs/radar/installation'));
}
