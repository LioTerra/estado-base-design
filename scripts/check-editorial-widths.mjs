#!/usr/bin/env node
/**
 * Editorial width audit.
 *
 * Flags raw `max-w-{xl|2xl|4xl|5xl}` usages in route/component code that
 * should instead use the editorial scale:
 *   - body copy / paragraphs  -> max-w-[60ch]
 *   - titles / heros / CTAs   -> max-w-3xl
 *   - via primitives          -> <Hero>, <Title>, <Lede>, <Prose>
 *
 * Allowed exceptions:
 *   - src/components/ui/**        (shadcn primitives)
 *   - src/components/container.tsx (defines the scale)
 *   - src/components/editorial.tsx (defines the scale)
 *   - src/components/site-footer.tsx (compact footer tagline)
 *   - src/router.tsx, src/routes/__root.tsx (error/loading shells)
 *   - any line containing the marker comment `// editorial-width-ok`
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "src");

const ALLOW_FILES = new Set([
  "src/components/container.tsx",
  "src/components/editorial.tsx",
  "src/components/site-footer.tsx",
  "src/router.tsx",
  "src/routes/__root.tsx",
]);
const ALLOW_DIR_PREFIX = "src/components/ui/";

const PATTERN = /\bmax-w-(xl|2xl|4xl|5xl)\b/;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (/\.(t|j)sx?$/.test(entry)) out.push(p);
  }
  return out;
}

const offenders = [];
for (const file of walk(SRC)) {
  const rel = relative(ROOT, file);
  if (ALLOW_FILES.has(rel)) continue;
  if (rel.startsWith(ALLOW_DIR_PREFIX)) continue;

  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (!PATTERN.test(line)) return;
    if (line.includes("editorial-width-ok")) return;
    offenders.push(`${rel}:${i + 1}  ${line.trim()}`);
  });
}

if (offenders.length) {
  console.error("Editorial width audit — replace with max-w-[60ch] / max-w-3xl");
  console.error("or use <Hero>/<Title>/<Lede>/<Prose>. Add `// editorial-width-ok`");
  console.error("on the same line to whitelist intentional layout widths.\n");
  for (const o of offenders) console.error("  " + o);
  process.exit(1);
}
console.log("Editorial widths OK.");