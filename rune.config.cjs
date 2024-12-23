// require('reflect-metadata');
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
  serverWebpackFinal: (config) => {
    config.resolve = {
      extensions: ['.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@lib': path.resolve(__dirname, 'lib'),
      },
    };
    config.module.rules = [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ];
    return config;
  },
};
