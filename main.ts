import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Worst Fix Ever: the commit message for the fix that made everything worse.
// One concrete disaster: a typo in the cleanup script. The fix is real — the
// script finally cleans up correctly — and the punchline is what it cleans up
// first: production. Deadpan, commit-voice, no reverting, no "tested in
// prod", just a tired engineer reporting that the repair worked too well.
const ENTRY =
  "fix: typo in the cleanup script — it now cleans up correctly, starting with production";

const MAX_CHARS = 100;
const EXPECTED_CHARS = 86;
const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

const chars = [...ENTRY].length;
if (chars !== EXPECTED_CHARS) {
  throw new Error(`entry is ${chars} characters, expected ${EXPECTED_CHARS}`);
}
if (chars < 1 || chars > MAX_CHARS) {
  throw new Error(`entry is ${chars} characters, must be 1 to ${MAX_CHARS}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}
if (!ENTRY.startsWith("fix:")) {
  throw new Error("entry must read as a commit message about a fix");
}
// The joke lands on the last word: the cleanup starts with production.
if (!ENTRY.endsWith("production")) {
  throw new Error("entry must end on the punchline word");
}

// Create the output directory if missing. Never delete it or anything in
// it besides the known output file: only entry.txt is written.
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, ENTRY, "utf-8");
console.log(`wrote ${OUT_FILE} (${chars} chars)`);
