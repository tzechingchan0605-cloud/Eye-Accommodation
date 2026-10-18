import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname } from 'node:path';

const root = fileURLToPath(new URL('.', import.meta.url));
const publicFiles = new Set(['index.html', 'styles.css', 'app.js', 'optics.js']);
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' };
const port = Number(process.env.PORT || 3000);

createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const filename = pathname === '/' ? 'index.html' : pathname.slice(1);
  if (pathname === '/favicon.ico') {
    response.writeHead(204).end();
    return;
  }
  if (!publicFiles.has(filename) || !['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
    return;
  }
  try {
    const body = await readFile(resolve(root, filename));
    response.writeHead(200, {
      'Content-Type': `${mime[extname(filename)]}; charset=utf-8`,
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Unable to read application file');
  }
}).listen(port, '0.0.0.0', () => console.log(`Eye optics simulation listening on port ${port}`));
