const path = require('path');

const moduleExists = name => {
  try {
    return require.resolve(name);
  } catch (e) {
    return false;
  }
};

module.exports.requireBundler = (file = '') => {
  if (moduleExists('parcel-bundler')) {
    return require(path.join('parcel-bundler', file));
  } else if (moduleExists('parcel')) {
    return require(path.join('parcel', file));
  }
  return false;
};

