/* eslint-env node */
const { EnvironmentPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');

/**
 * @type {any}
 */
const assetsPluginInstance = new AssetsPlugin({
  removeFullPathAutoPrefix: true,
  fullPath: true,
  useCompilerPath: true,
  prettyPrint: true,
  entrypoints: true,
  includeFilesWithoutChunk: true,
});

/**
 * @type {import('./package.json')}
 */
const { version } = require('./package.json');

/**
 * @param {WebpackEnvFlags} envFlags
 * @param {Argv} argv
 * @returns {import('webpack').Configuration}
 */
const webpackFactory = (envFlags, argv) => {
  const isProduction = argv.mode === 'production';
  const hash = isProduction ? '-[contenthash]' : '';

  return {
    target: ['web'],
    // stats: 'minimal',
    entry: {
      app: path.join(__dirname, 'src', 'App', 'app.js'),
      home: path.join(__dirname, 'src', 'App', 'home.js'),
      blog: path.join(__dirname, 'src', 'App', 'blog.js'),
    },
    output: {
      path: path.join(__dirname, 'source', 'dist'),
      filename: `[name]${hash}.js`,
      assetModuleFilename: `images/[name]${hash}[ext][query]`,
      chunkFilename: `chunk-[name]${hash}.js`,
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    plugins: [
      new CleanWebpackPlugin(),
      new EnvironmentPlugin({
        APP_VERSION: version,
        BUILD_DATE: formatDate(),
      }),
      assetsPluginInstance,
    ].filter(Boolean),
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: require.resolve('jquery'),
          loader: 'expose-loader',
          options: {
            exposes: ['$', 'jQuery'],
          },
        },
        {
          // images
          test: /\.(png|jpe?g|gif|svg)/i,
          type: 'asset/resource',
        },
        {
          // fonts
          test: /\.(eot|ttf|woff2?)/i,
          type: 'asset/resource',
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    watchOptions: {
      ignored: ['node_modules/**', 'source/**'],
    },
  };
};

module.exports = webpackFactory;

/**
 * @typedef {{
 * production?: boolean;
 * development?: boolean;
 * local?: boolean;
 * }} WebpackEnvFlags
 */

/**
 * @typedef {{
 * color: boolean,
 * mode: 'production' | 'development',
 * analyze: boolean,
 * }} Argv
 */

/**
 * @param {Date} date
 * @returns {string} Format: YYYY.mm.dd
 */
function formatDate(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const month2Digits = `0${month}`.slice(-2);
  const day2Digits = `0${day}`.slice(-2);

  return `${year}.${month2Digits}.${day2Digits}`;
}
