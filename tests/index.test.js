const helpers = require('../src/helpers');
const path = require('path');
const fs = require('fs');
const assert = require('assert');

const plugin = require('../src/index');

const Bundler = helpers.requireBundler();

const bundle = async entry => {
  const bundler = new Bundler(path.join(__dirname, entry), {
    watch: false,
    cache: false,
  });
  plugin(bundler);

  await bundler.bundle();
};

(async () => {
  // make sure one of the required packages was loaded
  assert(Bundler);

  // should create d.ts file
  await bundle('./css-modules.fixtures/index.js');

  const file = fs.readFileSync(
    path.join(__dirname, './css-modules.fixtures/test.css.d.ts'),
    'utf8',
  );

  assert(
    file.includes(`declare const styles: {
  readonly "test1": string;
  readonly "test2": string;
  readonly "test3": string;
  readonly "test-test": string;
  readonly "test-4": string;
};
export = styles;`),
  );

  // should not create d.ts file
  await bundle('./without-css-modules.fixtures/index.js');

  const exists = fs.existsSync(
    path.join(__dirname, './without-css-modules.fixtures/test.css.d.ts'),
  );

  assert(!exists);

  // should create d.ts file with camel cased class names
  await bundle('./css-modules-camel-case.fixtures/index.js');

  const fileCamelCase = fs.readFileSync(
    path.join(__dirname, './css-modules-camel-case.fixtures/test.css.d.ts'),
    'utf8',
  );
  assert(
    fileCamelCase.includes(`declare const styles: {
  readonly "test1": string;
  readonly "test2": string;
  readonly "test3": string;
  readonly "test-test": string;
  readonly "test-4": string;
  readonly "testTest": string;
  readonly "test4": string;
};
export = styles;`),
  );

  console.log('4/4 tests passed');
})();
