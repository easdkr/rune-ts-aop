const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

/**
 * @type {import('@rune-ts/server').RuneConfigType}
 */
module.exports = {
  name: 'rune-aop',
  port: 3000,
  mode: 'render',
  sourcePaths: ['.'],
  clientEntry: './src/app/client.ts',
  serverEntry: './bootstrap.ts',
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

    return config;
  },
};
