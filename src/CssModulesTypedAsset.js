const fs = require('fs');
const os = require('os');
const util = require('util');

const CSSAsset = require('parcel-bundler/src/assets/CSSAsset');
const writeFile = util.promisify(fs.writeFile);

const writeDTSFile = (filename, keys, { camelCase } = {}) => {
  if (keys.length === 0) {
    return;
  }
  const declares = keys.reduce(
    (file, key) => `${file}  readonly "${key}": string;${os.EOL}`,
    '',
  );
  const dtsFile = `declare const styles: {${os.EOL}${declares}};${
    os.EOL
  }export = styles;`;
  return writeFile(filename, dtsFile, { encoding: 'utf8', flag: 'w' });
};

module.exports = class CssModulesTypedAsset extends CSSAsset {
  async generate() {
    const result = await super.generate();
    if (this.cssModules) {
      try {
        await writeDTSFile(`${this.name}.d.ts`, Object.keys(this.cssModules));
      } catch (e) {
        console.error(`Could not create .d.ts file for ${this.name}`, e);
      }
    }
    return result;
  }
};
