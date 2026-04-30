import { existsSync, readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";

const root = process.cwd();
const htmlFiles = readdirSync(root).filter((file) => extname(file) === ".html").sort();
const requiredHead = [
  /<title>.+<\/title>/,
  /<meta name="description" content="[^"]+"/,
  /<link rel="canonical" href="https:\/\/cadencehealthmedia\.com[^"]*"/,
  /<meta property="og:title" content="[^"]+"/,
  /<meta property="og:description" content="[^"]+"/,
  /<meta property="og:image" content="[^"]+"/,
  /<link rel="icon" href="assets\/favicon\.svg"/
];
const bannedClaims = /\$[0-9]|\b[0-9]+ ?(million|billion)\b|\b(Pfizer|Merck|Novartis|Johnson & Johnson|Roche|AstraZeneca|BMS|Eli Lilly|Sanofi|GSK|AbbVie|Amgen|Google|Meta Platforms|Publicis|Omnicom|WPP|IPG|Dentsu)\b/i;
const errors = [];

for (const file of htmlFiles) {
  const html = readFileSync(join(root, file), "utf8");

  for (const pattern of requiredHead) {
    if (!pattern.test(html)) errors.push(`${file}: missing ${pattern}`);
  }

  if (bannedClaims.test(html)) {
    errors.push(`${file}: contains a banned employer, pharma name, or dollar claim pattern`);
  }

  if (/action="mailto:/i.test(html)) {
    errors.push(`${file}: form action still uses mailto`);
  }

  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (/^(https?:|mailto:|#)/.test(href)) continue;
    if (!existsSync(join(root, href))) errors.push(`${file}: missing href target ${href}`);
  }

  for (const [, src] of html.matchAll(/src="([^"]+)"/g)) {
    if (/^https?:/.test(src)) continue;
    if (!existsSync(join(root, src))) errors.push(`${file}: missing src target ${src}`);
  }
}

for (const asset of ["assets/favicon.svg", "assets/og-image.svg", "_redirects", "robots.txt", "sitemap.xml"]) {
  if (!existsSync(join(root, asset))) errors.push(`missing required asset ${asset}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`QA passed for ${htmlFiles.length} HTML pages.`);
