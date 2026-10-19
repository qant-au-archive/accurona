// Accurona no longer serves the network-diagram editor that forked away from
// it on 2026-10-19, and names it nowhere. The name is assembled here so this
// file does not trip its own check. CHANGELOG.md may keep it as history.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const name = ['retic', 'ulyne'].join('');

test(`no tracked file names ${name[0].toUpperCase()}${name.slice(1)}`, (t) => {
  let files;
  try {
    files = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' })
      .split('\0')
      .filter(Boolean);
  } catch {
    t.skip('not a git checkout');
    return;
  }
  const hits = files.filter((f) => {
    if (f === 'CHANGELOG.md') return false;
    let text;
    try {
      text = readFileSync(new URL(f, root), 'latin1');
    } catch {
      return false; // deleted in the working tree
    }
    return text.toLowerCase().includes(name);
  });
  assert.deepEqual(hits, []);
});
