/* eslint-env node */
const { EnvironmentPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const autoPrefixed = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

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
  const isAnalyseMode = argv.analyze === true;

  const hash = isProduction ? '-[contenthash]' : '';

  return {
    target: ['web'],
    entry: {
      app: path.join(__dirname, 'src', 'App', 'app.js'),
      home: path.join(__dirname, 'src', 'App', 'home.js'),
      blog: path.join(__dirname, 'src', 'App', 'blog.js'),
    },
    output: {
      publicPath: '/generated/',
      path: path.join(__dirname, 'source', 'generated'),
      filename: `[name]${hash}.js`,
      assetModuleFilename: `assets/[name]${hash}[ext][query]`,
      chunkFilename: `chunk-[name]${hash}[ext]`,
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    plugins: [
      new CleanWebpackPlugin(),
      new EnvironmentPlugin({
        APP_VERSION: version,
        BUILD_DATE: formatDate(),
      }),
      assetsPluginInstance,
      new MiniCssExtractPlugin({
        filename: `[name]${hash}.css`,
      }),
      isAnalyseMode
        && new BundleAnalyzerPlugin({
          analyzerPort: 9088,
        }),
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
          generator: {
            filename: `images/[name]${hash}[ext][query]`
          }
        },
        {
          // fonts
          test: /\.(eot|otf|ttf|woff2?)|font.*\.svg/i,
          type: 'asset/resource',
          generator: {
            filename: `fonts/[name]${hash}[ext][query]`
          }
        },
        {
          test: /\.(css)$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                postcssOptions: {
                  plugins: [autoPrefixed],
                },
              },
            },
          ],
        },
        {
          test: /\.(styl)$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                postcssOptions: {
                  plugins: [autoPrefixed],
                },
              },
            },
            {
              loader: 'stylus-loader',
              options: {
                sourceMap: true,
                stylusOptions: {
                  includeCSS: true,
                },
              },
            },
          ],
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
