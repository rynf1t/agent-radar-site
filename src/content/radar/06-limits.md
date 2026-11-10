---
title: Limits
description: What radar doesn't do yet, and why.
group: Reference
---

**radar is early and in daily use by one person. These are the edges you'll meet.**

- **Jumping needs Remote Control.** radar focuses the pane in its session, then asks the Rex app to show that session. The second step needs Remote Control on in Rex Settings, under Rex Server. Without it the pane says so.
- **done means unseen until the agent says otherwise.** Rex keeps a done record until the program replaces it, so an agent you've already read stays done until you give it new work.
- **One machine.** radar reads the local Rex server. Agents on other hosts don't appear yet.
- **Titles and folders refresh every 20 seconds.** Status changes arrive straight away from the event stream.
- **The CLI and JSON shape may still change** while the project is early.
