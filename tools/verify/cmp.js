/* cmp.js <a.png> <b.png> [diff.png] — pixel comparison */
const fs = require('fs');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch').default || require('pixelmatch');

const [aPath, bPath, diffPath] = process.argv.slice(2);
const a = PNG.sync.read(fs.readFileSync(aPath));
const b = PNG.sync.read(fs.readFileSync(bPath));

if (a.width !== b.width || a.height !== b.height) {
  console.log(`SIZE DIFFERS: ${aPath} ${a.width}x${a.height}  vs  ${bPath} ${b.width}x${b.height}`);
}

const width = Math.min(a.width, b.width);
const height = Math.min(a.height, b.height);
const crop = (img) => {
  const out = new PNG({ width, height });
  PNG.bitblt(img, out, 0, 0, width, height, 0, 0);
  return out;
};
const ca = crop(a), cb = crop(b);
const diff = new PNG({ width, height });
const n = pixelmatch(ca.data, cb.data, diff.data, width, height, { threshold: 0.1 });
const pct = ((n / (width * height)) * 100).toFixed(3);
console.log(`differing pixels: ${n} / ${width * height} (${pct}%)`);
if (diffPath) fs.writeFileSync(diffPath, PNG.sync.write(diff));
