#!/usr/bin/env bash
# Publish the site to GitHub Pages at https://rynf1t.github.io/agent-radar-site
#
# The first run creates the public repo rynf1t/agent-radar-site and turns on
# Pages. Every run pushes main, builds with the Pages base path and replaces
# the gh-pages branch with the build.
set -euo pipefail

repo=rynf1t/agent-radar-site
name=agent-radar-site
cd "$(dirname "$0")/.."

if ! gh repo view "$repo" >/dev/null 2>&1; then
	gh repo create "$repo" --public --description "Landing page and docs for agent radar and craftkit"
fi
git remote get-url origin >/dev/null 2>&1 || git remote add origin "https://github.com/$repo.git"
git push -u origin main

VITE_BASE="/$name" VITE_ORIGIN="https://rynf1t.github.io/$name" npm run build
touch build/.nojekyll

# Push the build as a fresh gh-pages branch, separate from main's history.
out=$(mktemp -d)
cp -R build/. "$out"
git -C "$out" init -q -b gh-pages
git -C "$out" add -A
git -C "$out" commit -q -m "Build of $(git rev-parse --short HEAD)"
git -C "$out" push -q -f "https://github.com/$repo.git" gh-pages
rm -rf "$out"

if ! gh api "repos/$repo/pages" >/dev/null 2>&1; then
	gh api -X POST "repos/$repo/pages" -f "source[branch]=gh-pages" -f "source[path]=/" >/dev/null
fi

echo "Published. GitHub takes a minute or two, then it's at https://rynf1t.github.io/$name"
