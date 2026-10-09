import { execFileSync } from 'node:child_process';
import { mkdir, readFile, rename, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const photos = JSON.parse(await readFile(new URL('src/photos.json', root), 'utf8'));
const folder = new URL('public/photos/', root);
await mkdir(folder, { recursive: true });

for (const photo of photos) {
  const temporary = new URL(`${photo.file}.download`, folder);
  const destination = new URL(photo.file, folder);
  try {
    // curl preserves system/proxy TLS verification. Never use --insecure.
    execFileSync('curl', ['--fail', '--location', '--silent', '--show-error', '--max-time', '60', photo.url, '--output', fileURLToPath(temporary)], { stdio: 'inherit' });
    const bytes = await readFile(temporary);
    const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8;
    const png = bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    const webp = bytes.subarray(0, 4).toString() === 'RIFF' && bytes.subarray(8, 12).toString() === 'WEBP';
    if (!jpeg && !png && !webp) throw new Error('Response is not a supported image');
    await rename(temporary, destination);
    console.log(`Saved ${photo.file}`);
  } catch (error) {
    await rm(temporary, { force: true });
    throw new Error(`Could not recover ${photo.file}. Check access to ${new URL(photo.url).hostname}.`, { cause: error });
  }
}

console.log('Photos recovered. Set VITE_LOCAL_PHOTOS=true in .env before building to serve your local copies.');
