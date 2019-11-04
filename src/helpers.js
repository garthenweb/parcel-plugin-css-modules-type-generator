module.exports.moduleExists = name => {
  try {
    return require.resolve(name);
  } catch (e) {
    return false;
  }
};
