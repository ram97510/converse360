/* bands.js <diff.png> [minRows] — report the y-ranges where a pixelmatch diff
   image is non-empty, so a percentage can be traced to a place on the page. */
const fs = require('fs');
const { PNG } = require('pngjs');
const img = PNG.sync.read(fs.readFileSync(process.argv[2]));
const min = Number(process.argv[3] || 4);

const rows = [];
for (let y = 0; y < img.height; y++) {
  let n = 0;
  for (let x = 0; x < img.width; x++) {
    const i = (img.width * y + x) << 2;
    // pixelmatch paints differences red/yellow on a faded grey ground
    if (img.data[i] > 200 && img.data[i + 2] < 100) n++;
  }
  rows.push(n);
}
let start = -1;
for (let y = 0; y <= img.height; y++) {
  const hot = y < img.height && rows[y] > 0;
  if (hot && start < 0) start = y;
  if (!hot && start >= 0) {
    const h = y - start;
    if (h >= min) {
      const peak = Math.max(...rows.slice(start, y));
      const total = rows.slice(start, y).reduce((a, b) => a + b, 0);
      console.log(`y ${String(start).padStart(6)} – ${String(y).padStart(6)}  (${String(h).padStart(5)} rows)  peak ${String(peak).padStart(5)}px wide  total ${total}`);
    }
    start = -1;
  }
}
