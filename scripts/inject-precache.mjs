// Add exact built Vite assets to the service worker precache list.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
const dist = path.resolve('dist');
const assetNames = await readdir(path.join(dist, 'assets'));
const assets = assetNames.filter(name => /\.(js|css)$/.test(name)).map(name => `/assets/${name}`);
const list = ['/', '/index.html', '/manifest.webmanifest', '/icons/streamlist-192.png', '/icons/streamlist-512.png', '/icons/streamlist-maskable-512.png', ...assets];
const swPath = path.join(dist, 'sw.js');
const source = await readFile(swPath, 'utf8');
if (!source.includes('__PRECACHE_ASSETS__')) throw new Error('Missing precache placeholder in service worker');
await writeFile(swPath, source.replace('__PRECACHE_ASSETS__', JSON.stringify(list, null, 2)));
console.log(`PWA: precaching ${list.length} app URLs`);
