import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const photos = JSON.parse(await readFile(new URL('src/photos.json', root), 'utf8'));
const folder = new URL('public/photos/', root);
await mkdir(folder, { recursive: true });

const checksum = bytes => createHash('sha256').update(bytes).digest('hex');

for (const photo of photos) {
  const temporary = new URL(`${photo.file}.download`, folder);
  const destination = new URL(photo.file, folder);
  try {
    const existing = await readFile(destination).catch(error => {
      if (error.code === 'ENOENT') return null;
      throw error;
    });
    if (existing) {
      if (checksum(existing) !== photo.sha256) throw new Error('Existing image differs from the archived original; refusing to overwrite it');
      console.log(`Verified ${photo.file}`);
      continue;
    }
    // curl preserves system/proxy TLS verification. Never use --insecure.
    execFileSync('curl', ['--fail', '--location', '--silent', '--show-error', '--max-time', '60', photo.url, '--output', fileURLToPath(temporary)], { stdio: 'inherit' });
    const bytes = await readFile(temporary);
    const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8;
    const png = bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    const webp = bytes.subarray(0, 4).toString() === 'RIFF' && bytes.subarray(8, 12).toString() === 'WEBP';
    if (!jpeg && !png && !webp) throw new Error('Response is not a supported image');
    if (checksum(bytes) !== photo.sha256) throw new Error('Downloaded image differs from the archived original');
    await rename(temporary, destination);
    console.log(`Saved ${photo.file}`);
  } catch (error) {
    await rm(temporary, { force: true });
    throw new Error(`Could not recover ${photo.file}. Check access to ${new URL(photo.url).hostname}.`, { cause: error });
  }
}

console.log('All photos are available locally. The site serves them directly from public/photos.');
