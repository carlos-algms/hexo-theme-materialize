/* eslint-env node */
const path = require('path');
const fs = require('fs');

function readAssetsFile() {
  /**
   * @type {Record<string, Record<'js' | 'css', string | string[]>>}
   */
  const assets = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'source', 'generated', 'webpack-assets.json'), {
      encoding: 'utf-8',
    }),
  );

  return assets;
}

hexo.extend.helper.register(
  'webpackAssets',
  /**
   * Renders script and link tags for Webpack entry points
   * @param {string} entryPointName
   */
  function webpackAssets(entryPointName) {
    const entryPoint = readAssetsFile()[entryPointName];

    if (!entryPoint) {
      return;
    }

    const { js, css } = entryPoint;
    const jsList = toArray(js);
    const cssList = toArray(css);

    jsList.filter(Boolean).forEach((src) => this.site.webpackAssetsJS.add(src));
    cssList.filter(Boolean).forEach((src) => this.site.webpackAssetsCss.add(src));
  },
);

hexo.extend.filter.register('template_locals', (locals) => {
  const assets = readAssetsFile();
  const webpackAssetsJS = new Set(toArray(assets.app.js));
  const webpackAssetsCss = new Set(toArray(assets.app.css));

  return {
    ...locals,
    site: {
      ...locals.site,
      webpackAssetsJS,
      webpackAssetsCss,
    },
  };
});

const css = hexo.extend.helper.get('css').bind(hexo);
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
    const { webpackAssetsJS, webpackAssetsCss } = site;

    const scripts = Array.from(webpackAssetsJS)
      .map((src) => js(src))
      .join('');
    const styles = Array.from(webpackAssetsCss)
      .map((src) => css(src))
      .join('');

    return enrichedSource
      .replace('<!-- webpackAssetsInsert:js -->', scripts)
      .replace('<!-- webpackAssetsInsert:css -->', styles);
  },
);

function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
