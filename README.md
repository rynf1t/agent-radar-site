# radar site

The landing page and docs for [radar](../agent-radar) and [craftkit](../craftkit).
SvelteKit 3, prerendered to static files with `adapter-static`.

**Project Status:** headed for https://radar.itsryan.me on Netlify, deployed
from the `build` folder with the Netlify CLI. `site.origin` in
`src/lib/site.ts` is that address, and every Markdown link is built from it.

## Deploy

```sh
npm run build
npx netlify-cli deploy --dir build --prod
```

For GitHub Pages, run `scripts/deploy-pages.sh`. Pages serves the site under
`/agent-radar-site`, so the script builds with `VITE_BASE` and `VITE_ORIGIN`
(see `src/lib/site.ts`) and adds `.nojekyll` so `_app` and the `.md` files are
served as they are. Every link goes through `href()` so it picks up the base.

## Run it

```sh
npm install
npm run dev -- --port 5180     # http://localhost:5180
npm run build && npm run preview   # the static build, as it would ship
npm run check                  # types and Svelte diagnostics
```

## Where things live

| Path | What |
|---|---|
| `src/content/radar/*.md`, `src/content/craftkit/*.md` | The docs. The number prefix sets the order, front matter sets title, description and sidebar group. A bold first paragraph becomes the lead. |
| `src/lib/docs.server.ts` | Turns the content into HTML (Shiki at build time), the sidebar, the Markdown twins, `llms.txt` and the search index. |
| `src/lib/site.ts` | Facts used on several pages: install commands, requirements, repo links. |
| `src/lib/twins.ts` | Markdown versions of the landing and craftkit pages. Keep them in step with those pages. |
| `src/lib/demo.ts` | The fictional agents and timeline in the landing page demo. Ordering and labels follow radar's `internal/radar`. |
| `src/app.css` | Tokens (colour roles, shadows, radii, motion) and prose styles. |

## For agents

- Every docs page is also served as Markdown: `/docs/radar/states.md`. Also
  `/index.md`, `/craftkit.md`, `/llms.txt`, `/llms-full.txt`, `/search.json`.
- `+server.ts` endpoints need their own `export const prerender = true`. The
  layout option does not reach them.
- Docs facts come from the radar and craftkit READMEs and code. When those
  change, update `src/content` and check `src/lib/demo.ts` labels against
  `agent-radar/internal/radar/format.go`.
- Style rules come from the build-craft `web-and-visual.md` reference.
