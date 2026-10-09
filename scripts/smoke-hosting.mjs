import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const base = 'http://127.0.0.1:5000';
const response = await fetch(base);
assert.equal(response.status, 200, 'Hosting must serve the built index');
assert.match(response.headers.get('content-type'), /text\/html/);
const html = await response.text();
assert.match(html, /Rincon Car Wash/);
const asset = html.match(/src="(\/assets\/[^"]+\.js)"/);
assert.ok(asset, 'The production entry script must be present');
const script = await fetch(`${base}${asset[1]}`);
assert.equal(script.status, 200);
assert.match(await script.text(), /Wash tokens, quarters, and credit cards accepted/);
assert.match(script.headers.get('cache-control'), /immutable/);
const icon = await fetch(`${base}/favicon.svg`);
assert.equal(icon.status, 200);
assert.match(icon.headers.get('content-type'), /image\/svg\+xml/);
const photos = JSON.parse(await readFile(new URL('../src/photos.json', import.meta.url), 'utf8'));
for (const photo of photos) {
  const image = await fetch(`${base}/photos/${photo.file}`);
  assert.equal(image.status, 200, `${photo.file} must be served`);
  assert.match(image.headers.get('content-type'), photo.file.endsWith('.png') ? /image\/png/ : /image\/jpeg/);
  const bytes = Buffer.from(await image.arrayBuffer());
  assert.equal(createHash('sha256').update(bytes).digest('hex'), photo.sha256, `${photo.file} must match the archived original`);
}
console.log(`Firebase Hosting serves the app, JavaScript, cache headers, favicon, and all ${photos.length} original images correctly.`);
