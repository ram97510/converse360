#!/usr/bin/env bash
# Screenshot every page from both the original .html sources and the ported app,
# at each of the source's real breakpoints, and report the pixel difference.
#
#   npx http-server -p 3399 ../..      # the .html sources
#   npm run build && npx next start -p 3311
#   bash tools/verify/compare-all.sh
#
# Override WIDTHS or PAGES to narrow a run:
#   WIDTHS=1440 PAGES="index:" bash tools/verify/compare-all.sh
set -uo pipefail
cd "$(dirname "$0")"
mkdir -p shots

WIDTHS="${WIDTHS:-1440 1024 900 760 640 375}"
PAGES="${PAGES:-index: Blog:blog Blog-first-reply:blog/first-reply Blog-one-inbox:blog/one-inbox Blog-ad-attribution:blog/ad-attribution FAQ:faq Terms:terms Privacy:privacy Contact:contact Pricing:pricing About:about}"

for pair in $PAGES; do
  src="${pair%%:*}"
  route="${pair##*:}"
  slug=$(echo "$route" | tr '/' '-')
  [ -z "$slug" ] && slug="home"
  echo "########## $src -> /$route"
  node shot.js "http://localhost:3399/${src}.html" "shots/${slug}-orig" $WIDTHS > /dev/null 2>&1
  node shot.js "http://localhost:3311/${route}"    "shots/${slug}-new"  $WIDTHS > /dev/null 2>&1
  for w in $WIDTHS; do
    printf '  %5spx  ' "$w"
    node cmp.js "shots/${slug}-orig-${w}.png" "shots/${slug}-new-${w}.png" "shots/${slug}-diff-${w}.png" 2>&1 | tr '\n' ' '
    echo
  done
done
