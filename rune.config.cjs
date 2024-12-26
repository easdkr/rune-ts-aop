const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
/**
 * @type {import('@rune-ts/server').RuneConfigType}
 */
module.exports = {
  name: 'rune-aop',
  port: 3001,
  mode: 'render',
  sourcePaths: ['.'],
  clientEntry: './src/client/bootstrap.ts',
  serverEntry: './src/server/bootstrap.ts',
  dynamicChunk: true,
  serverDynamicChunk: true,
  processReload: true,
  showBundleAnalyzer: false,
  clientWebpackFinal: (config) => {
    config.resolve = {
      ...config.resolve,
      extensions: ['.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@lib': path.resolve(__dirname, 'lib'),
      },
    };

    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ];

    config.optimization.minimizer = [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          mangle: {
            keep_classnames: true,
            keep_fnames: true,
          },
        },
      }),
    ];

    return config;
  },
  serverWebpackFinal: (config) => {
    config.resolve = {
      ...config.resolve,
      extensions: ['.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@lib': path.resolve(__dirname, 'lib'),
      },
    };

    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ];

    config.plugins = [...config.plugins];

    config.optimization.minimizer = [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          mangle: {
            keep_classnames: true,
            keep_fnames: true,
          },
        },
      }),
    ];
    return config;
  },
};
