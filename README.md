# Parcel Plugin CSS Modules Type Generator

Generates .d.ts files for your CSS modules with [Parcel](https://parceljs.org).

![](https://img.shields.io/npm/l/parcel-plugin-css-modules-type-generator.svg)
[![](https://img.shields.io/npm/v/parcel-plugin-css-modules-type-generator.svg)](https://www.npmjs.com/package/parcel-plugin-css-modules-type-generator)
![](https://img.shields.io/david/garthenweb/parcel-plugin-css-modules-type-generator.svg)
[![Build Status](https://travis-ci.org/garthenweb/parcel-plugin-css-modules-type-generator.svg?branch=master)](https://travis-ci.org/garthenweb/parcel-plugin-css-modules-type-generator)

This plugin is inspired by [typed-css-modules](https://www.npmjs.com/package/typed-css-modules), it will generate `.d.ts` files for your CSS modules so you have proper typing for your styles.

As Parcel already handles watching of files and generates CSS modules this plugin is super easy to use and works out of the box, you don't need to run tasks in parallel while working on your code to get proper types.

Further is supports all kind of extensions that compile to CSS (only those that are supported by Parcel) out of the 📦, e.g. scss, less and stylus.

## Installation

Just add the plugin to your `package.json`:

```
npm install --save-dev parcel-plugin-css-modules-type-generator
```

Parcel will handle the rest for you! 🚀

Please note that you need to activate CSS modules for Parcel by adding a `.postcssrc` file to the main directory with the following content:

```json
{
  "modules": true
}
```

## License

Licensed under the [MIT License](https://opensource.org/licenses/mit-license.php).
