#!/usr/bin/env node
/**
 * Border token guard.
 *
 * Fails (exit 1) when any source file under src/ uses:
 *   - `border-input`            → must be `border-border`
 *   - `border-<color>/<n>`      → fractional opacity on borders is forbidden
 *   - `divide-<color>/<n>`      → fractional opacity on dividers is forbidden
 *
 * Allowed exceptions:
 *   - hover/focus/active/group state utilities that change border COLOR
 *     (e.g. `hover:border-primary`) — these are interaction states, not base.
 *   - The CSS token definitions in src/styles.css.
 *
 * Run: `node scripts/check-borders.mjs` or `bun run lint:borders`.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("../", import.meta.url).pathname;
const SRC = join(ROOT, "src");
const IGNORE_FILES = new Set([
  join(SRC, "styles.css"),
  join(SRC, "routeTree.gen.ts"),
]);
const EXTS = [".ts", ".tsx", ".js", ".jsx", ".css", ".html"];

/** @type {{ name: string, regex: RegExp, hint: string }[]} */
const RULES = [
  {
    name: "border-input",
    // Match the bare utility, not e.g. `border-input-foo`.
    regex: /\bborder-input\b/g,
    hint: "Use `border-border` instead of `border-input`.",
  },
  {
    name: "border-color-with-opacity",
    // border-<token>/<digits>  — but NOT border-l/4 spacing-like utilities.
    // Token must contain a letter so we don't catch border-2/etc.
    regex: /\bborder-[a-z][a-z-]*\/\d+\b/g,
    hint: "Drop the /opacity — borders must use `border-border` (or a state color without opacity).",
  },
  {
    name: "divide-color-with-opacity",
    regex: /\bdivide-[a-z][a-z-]*\/\d+\b/g,
    hint: "Drop the /opacity — dividers must use `divide-border`.",
  },
];

/** Allow `hover:border-primary/50` etc.? No — opacity is forbidden everywhere. */
function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (EXTS.some((e) => p.endsWith(e)) && !IGNORE_FILES.has(p)) out.push(p);
  }
  return out;
}

const violations = [];
for (const file of walk(SRC)) {
  const content = readFileSync(file, "utf8");
  const lines = content.split("\n");
  for (const rule of RULES) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      rule.regex.lastIndex = 0;
      let m;
      while ((m = rule.regex.exec(line)) !== null) {
        violations.push({
          file: relative(ROOT, file),
          line: i + 1,
          rule: rule.name,
          match: m[0],
          hint: rule.hint,
          snippet: line.trim(),
        });
      }
    }
  }
}

if (violations.length === 0) {
  console.log("✓ Border token check passed — no forbidden patterns found.");
  process.exit(0);
}

console.error(`✗ Border token check failed — ${violations.length} violation(s):\n`);
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}  [${v.rule}]  "${v.match}"`);
  console.error(`    → ${v.hint}`);
  console.error(`    ${v.snippet}\n`);
}
process.exit(1);