import { createReadStream, existsSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8"
};

function fileFor(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]);
  const routed = cleanPath === "/" ? "/index.html" : cleanPath;
  const withHtml = extname(routed) ? routed : `${routed}.html`;
  const fullPath = normalize(join(root, withHtml));
  return fullPath.startsWith(root) ? fullPath : "";
}

createServer((req, res) => {
  if (req.method === "POST") {
    res.writeHead(303, { Location: "/thank-you.html" });
    res.end();
    return;
  }

  const filePath = fileFor(req.url || "/");
  if (!filePath || !existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  res.writeHead(200, { "Content-Type": types[extname(filePath)] || "application/octet-stream" });
  createReadStream(filePath).pipe(res);
}).listen(port, () => {
  console.log(`Cadence Health Media site running at http://127.0.0.1:${port}`);
});
