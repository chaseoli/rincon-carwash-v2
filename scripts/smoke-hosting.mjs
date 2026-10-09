import assert from 'node:assert/strict';

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
console.log('Firebase Hosting serves the app, JavaScript, cache headers, and favicon correctly.');
