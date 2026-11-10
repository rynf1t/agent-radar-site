// Markdown twins of the two designed pages. Keep them in step with
// src/routes/+page.svelte and src/routes/craftkit/+page.svelte.
import { site } from './site.js';

export const indexMd = `---
title: "radar"
description: "Every coding agent across your Rex sessions in one pane, ordered by who needs you."
canonical_url: ${site.origin}/
---

# radar

**Every coding agent in one pane, ordered by who needs you.**

radar watches your Rex sessions and lists every agent by urgency. The one waiting on a permission sits at the top, finished work stays marked until you look, and Enter takes you there.

\`\`\`sh
${site.install}
\`\`\`

${site.requirement} Status: early, in daily use by one person.

## What it shows

Agents report their own state through Rex's program status protocol, so radar never has to guess. It sorts by urgency, then by how long each agent has waited.

| State | Meaning |
|---|---|
| blocked | Waiting on you: a permission, a question or a login |
| error | Failed and stopped |
| done | Finished, and you haven't looked yet |
| working | Busy. The ring fills if the agent reports progress. |
| idle | Waiting for its next instruction |

## Jump

radar focuses the agent's pane, then asks Rex to show its session. It opens beside you without taking focus, and running \`radar show\` again reuses the same pane. Jumping needs Remote Control, which you turn on in Rex Settings under Rex Server.

## Scripts and agents

Every command exits with a code a script can branch on: 0 ok, 1 failed, 2 usage, 3 not found or ambiguous, 4 Rex unreachable, 130 interrupted. The agent skill ships inside the binary.

\`\`\`sh
radar ls --state blocked --json | jq -r '.agents[] | "\\(.session): \\(.msg)"'
radar focus
radar skill install
\`\`\`

## Built on craftkit

radar's colours, exit codes, skill installer and status reports live in [craftkit](${site.origin}/craftkit.md).

## Docs

Start at [Installation](${site.origin}/docs/radar/installation.md). The full index is at [llms.txt](${site.origin}/llms.txt).
`;

export const craftkitMd = `---
title: "craftkit"
description: "Small Go packages for the things every terminal tool needs."
canonical_url: ${site.origin}/craftkit
---

# craftkit

**The small parts every terminal tool needs, written once.**

Follow the terminal's colours, share one exit code table, ship the agent skill inside the binary, and report status to the terminal. Each package was pulled out of radar when it needed one, and the API will change while there's only one user.

\`\`\`sh
${site.craftkitInstall}
\`\`\`

| Package | Does | Docs |
|---|---|---|
| termcolor | Asks the terminal for its colours and mixes greys from them | ${site.origin}/docs/craftkit/termcolor.md |
| cliout | One exit code table, errors that carry a code, JSON that suits its reader | ${site.origin}/docs/craftkit/cliout.md |
| skillkit | Installs an embedded SKILL.md and never touches a file it didn't write | ${site.origin}/docs/craftkit/skillkit.md |
| status | Writes OSC 7501 program status reports | ${site.origin}/docs/craftkit/status.md |
`;
