import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// Every page, Markdown twin and index is prerendered to static files.
			adapter: adapter({ fallback: '404.html' }),
			prerender: { handleMissingId: 'warn' }
		})
	]
});
