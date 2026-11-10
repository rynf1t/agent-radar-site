---
title: Installation
description: Install radar with Go and teach your coding agent to use it.
group: Get started
---

**radar is a single Go binary. Install it, then run it inside a Rex terminal.**

radar works with Rex Beta 0.1 on macOS. It reads the local Rex server through the `rex` CLI, so `rex` must be on your `PATH`, which it is in every Rex terminal.

## Install

```sh
go install github.com/rynf1t/agent-radar/cmd/radar@latest
```

## Teach your agent

radar ships its agent skill inside the binary, so the skill always matches the version you run.

```sh
radar skill install
```

This writes `~/.claude/skills/radar/SKILL.md` and prints `created`, `unchanged` or `outdated`. A skill file radar didn't write is reported as `foreign` and left alone unless you pass `--force`. Use `--dry-run` to see what would change.

## Build from a checkout

radar builds against [craftkit](/docs/craftkit/overview). While both repositories sit side by side in `~/Projects`, radar's `go.mod` points at the local copy with a `replace`, so build from the checkout:

```sh
go install ./cmd/radar
```

## Next

Open the radar with `radar show`. The [quick start](/docs/radar/quick-start) covers the keys.
