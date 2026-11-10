---
title: Quick start
description: Open the radar beside your pane and jump to the agent that needs you.
group: Get started
---

**Run `radar show` in any Rex terminal. The radar opens in a pane beside you without taking focus.**

```sh
radar show
```

Run it again and it prints the same pane ID instead of opening another. Each agent pane gets its own radar, keyed on `REX_BLOCK`. To share one radar between several panes, set the same `RADAR_PANE` in each.

## Keys

| Key | Does |
|---|---|
| `↑` `↓` or `j` `k` | Move |
| `enter` | Jump to that agent's pane |
| `/` | Filter by session, title, message, state or folder. `esc` clears it. |
| `g` `G` | First, last |
| `q` | Quit |

Clicking a row jumps there too.

## Jumping

Enter focuses the agent's pane in its session, then asks the Rex app to show that session. The second step needs **Remote Control**, which you turn on in Rex Settings under Rex Server. Without it the pane tells you so instead of failing quietly.

## Close it

```sh
radar hide
```
