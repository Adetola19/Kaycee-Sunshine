// Generates src/styles/tokens.css from design/tokens.json (the approved design system).
// Run with: node scripts/build-tokens.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const tokens = JSON.parse(readFileSync(new URL("design/tokens.json", root), "utf8"));

const light = [];
const dark = [];
for (const t of tokens.color.tokens) {
  const v = typeof t.value === "string" ? { light: t.value } : t.value;
  light.push(`  --${t.name}: ${v.light};`);
  if (v.dark && v.dark !== v.light) dark.push(`  --${t.name}: ${v.dark};`);
}
for (const t of tokens.shadow.tokens) {
  light.push(`  --${t.name}: ${t.value.light};`);
  if (t.value.dark) dark.push(`  --${t.name}: ${t.value.dark};`);
}

const flat = [];
for (const family of ["spacing", "radius", "layout", "duration", "easing"]) {
  for (const t of tokens[family].tokens) flat.push(`  --${t.name}: ${t.value};`);
}

const out = `/* ${tokens.name} — generated from design/tokens.json by scripts/build-tokens.mjs. Do not edit by hand. */
:root {
  color-scheme: light dark;
${light.join("\n")}
${flat.join("\n")}
}

@media (prefers-color-scheme: dark) {
  :root {
${dark.map((l) => "  " + l).join("\n")}
  }
}
`;

writeFileSync(fileURLToPath(new URL("src/styles/tokens.css", root)), out);
console.log("Wrote src/styles/tokens.css");
