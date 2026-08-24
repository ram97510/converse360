#!/usr/bin/env bash
#
# Regenerate every ported file from the .html sources one directory up.
#
#   cd converse_next/tools && bash regenerate.sh
#
# Everything under app/ and components/ that mirrors source markup is GENERATED.
# Edit the sources (or the head/tail templates in tools/heads/), then re-run this
# — do not hand-edit the generated files, and never hand-edit app/globals.css.
#
# The line ranges below are the body of each source page: the markup between
# </header> and <footer>, with the announcement bar and footer pulled out of the
# landing page as shared components. Re-derive them with tools/ranges.js after
# any edit that moves lines in a source file.
set -euo pipefail
cd "$(dirname "$0")"

SRC="${DC_SRC:-../..}"
WEB=".."

echo "==> app/globals.css"
DC_SRC="$SRC" node build-css.js

# name | first body line | last body line | head template | tail template | output | indent
PAGES=(
  "index|4581|4705|head.foot.txt|tail.foot.txt|components/Footer.tsx|4"
  "index|2932|2976|head.ann.txt|tail.ann.txt|components/AnnouncementBar.tsx|4"
  "index|3016|4579|head.landing.txt|tail.landing.txt|components/landing/LandingBody.tsx|6"
  "FAQ|460|595|head.faq.txt|tail.faq.txt|app/faq/page.tsx|6"
  "Terms|509|818|head.terms.txt|tail.terms.txt|app/terms/page.tsx|6"
  "Privacy|510|1084|head.privacy.txt|tail.terms.txt|app/privacy/page.tsx|6"
  "Contact|462|647|head.contactbody.txt|tail.contactbody.txt|components/contact/ContactBody.tsx|6"
  "Pricing|462|1352|head.pricingbody.txt|tail.pricingbody.txt|components/pricing/PricingBody.tsx|6"
  "About|878|1231|head.about.txt|tail.about.txt|app/about/page.tsx|6"
  "Blog|1008|1165|head.blogbody.txt|tail.blogbody.txt|components/blog/BlogBody.tsx|6"
  "Blog-first-reply|1038|1211|head.post-first-reply.txt|tail.post.txt|app/blog/first-reply/page.tsx|6"
  "Blog-one-inbox|1038|1210|head.post-one-inbox.txt|tail.post.txt|app/blog/one-inbox/page.tsx|6"
  "Blog-ad-attribution|1038|1200|head.post-ad-attribution.txt|tail.post.txt|app/blog/ad-attribution/page.tsx|6"
)

for spec in "${PAGES[@]}"; do
  IFS='|' read -r name from to head tail out indent <<< "$spec"
  echo "==> $out"
  mkdir -p "$WEB/$(dirname "$out")"
  tmp=$(mktemp)
  node h2jsx.js "$SRC/$name.html" "$from" "$to" > "$tmp"
  node wrap.js "heads/$head" "$tmp" "heads/$tail" "$WEB/$out" "$indent" > /dev/null
  rm -f "$tmp"
done

echo "==> post-fixes"
node postfix.js

echo
echo "Done. Now run:  npx tsc --noEmit  &&  npx next build"
