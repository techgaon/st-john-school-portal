import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';

const downloadDir = 'C:\\Users\\pande\\git-portable';
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

const targetZip = path.join(downloadDir, 'mingit.zip');

console.log('Downloading MinGit from GitHub...');
const res = await fetch('https://github.com/git-for-windows/git/releases/latest/download/MinGit-64-bit.zip', {
  headers: { 'User-Agent': 'Mozilla/5.0' }
});

if (!res.ok) {
  throw new Error(`Failed to download: ${res.status} ${res.statusText}`);
}

const fileStream = fs.createWriteStream(targetZip);
await pipeline(Readable.fromWeb(res.body), fileStream);
console.log('Download complete. Size:', fs.statSync(targetZip).size);
