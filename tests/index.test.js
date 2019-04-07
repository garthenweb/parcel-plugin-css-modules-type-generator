const Bundler = require('parcel-bundler');
const path = require('path');
const fs = require('fs');
const assert = require('assert');

const plugin = require('../src/index');

const bundle = async entry => {
  const bundler = new Bundler(path.join(__dirname, entry), {
    watch: false,
    cache: false,
  });
  plugin(bundler);

  await bundler.bundle();
};

(async () => {
  // should create d.ts file
  await bundle('./css-modules.fixtures/index.js');

  const file = fs.readFileSync(
    path.join(__dirname, './css-modules.fixtures/test.css.d.ts'),
    'utf8',
  );

  assert(file.includes('export const test1: string;'));
  assert(file.includes('export const test2: string;'));
  assert(file.includes('export const test3: string;'));

  // should ignore
  await bundle('./without-css-modules.fixtures/index.js');

  const exists = fs.existsSync(
    path.join(__dirname, './without-css-modules.fixtures/test.css.d.ts'),
  );

  assert(!exists);

  console.log('2/2 test passed');
})();
