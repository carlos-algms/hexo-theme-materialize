/* eslint-env node */
const path = require('path');
const fs = require('fs');

/**
 * @type {import('../source/dist/webpack-assets.json')}
 */
const assets = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'source', 'dist', 'webpack-assets.json'), { encoding: 'utf-8' }),
);

hexo.extend.helper.register(
  'webpackAssets',
  /**
   * Renders script and link tags for Webpack entry points
   * @param {keyof typeof assets} entryPointName
   */
  function webpackAssets(entryPointName) {
    const entryPoint = assets[entryPointName];

    if (!entryPoint) {
      return;
    }

    const { js } = entryPoint;
    const jsList = Array.isArray(js) ? js : [js];

    jsList.filter(Boolean).forEach((src) => this.site.webpackAssetsJS.add(src));
  },
);

hexo.extend.filter.register('template_locals', (locals) => {
  const webpackAssetsJS = new Set(assets.app.js);
  const webpackAssetsCss = new Set();

  return {
    ...locals,
    site: {
      ...locals.site,
      webpackAssetsJS,
      webpackAssetsCss,
    },
  };
});

// const css = hexo.extend.helper.get('css').bind(hexo);
const js = hexo.extend.helper.get('js').bind(hexo);

hexo.extend.filter.register(
  'after_render:html',
  /**
   * @param {string} generatedSource
   */
  (generatedSource, { site }) => {
    const enrichedSource = generatedSource;
    /**
     * @type {Record<string, Set<string>>}
     */
    const { webpackAssetsJS } = site;

    const scripts = Array.from(webpackAssetsJS).map((src) => js(`dist/${src}`)).join('');
    return enrichedSource.replace('<!-- webpackAssetsInsert:js -->', scripts);
  },
);
