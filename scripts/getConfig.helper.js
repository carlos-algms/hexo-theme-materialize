hexo.extend.helper.register('getConfig',
/**
 * Returns a config value from site config if available,
 * otherwise fallback to theme config
 * @param {string} key
 */
  function getConfig(key) {
    const value = this.config[key];

    if (value !== undefined) {
      return value;
    }

    return this.theme[key];
  });
