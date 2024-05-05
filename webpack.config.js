/* eslint-disable */
const { getConfig, dev } = require('./webpack.config.base');
const { spawn, execSync } = require('child_process');
const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');

let terser = require('terser');
/* eslint-enable */

let electronProcess;

const mainConfig = getConfig({
  target: 'electron-main',

  devtool: dev ? 'inline-source-map' : false,

  watch: dev,

  entry: {
    main: './src/main',
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from:
            'node_modules/@cliqz/adblocker-electron-preload/dist/preload.cjs.js',
          to: 'preload.js',
          transform: async (fileContent, path) => {
            return (
              await terser.minify(fileContent.toString())
            ).code.toString();
          },
        },
      ],
    }),
  ],
  

  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      maxSize: 244000,
    },
  },

  resolve: {
    fallback: {
      "url": require.resolve("url/")
    },
    alias: {
      '@services': path.resolve(__dirname, 'src/services'),
    },
  },
});

const preloadConfig = getConfig({
  target: 'web',

  devtool: false,

  watch: dev,

  entry: {
    'view-preload': './src/preloads/view-preload',
  },

  plugins: [],

  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      maxSize: 244000,
    },
  },

  resolve: {
    fallback: {
      "url": require.resolve("url/")
    },
    alias: {
      '@services': path.resolve(__dirname, 'src/services'),
    },
  },
});

if (process.env.ENABLE_EXTENSIONS) {
  preloadConfig.entry['popup-preload'] = './src/preloads/popup-preload';
  preloadConfig.entry['extensions-preload'] =
    './src/preloads/extensions-preload';
}

if (process.env.START === '1') {
  mainConfig.plugins.push({
    apply: (compiler) => {
      compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
        if (electronProcess) {
          try {
            if (process.platform === 'win32') {
              execSync(`taskkill /pid ${electronProcess.pid} /f /t`);
            } else {
              electronProcess.kill();
            }

            electronProcess = null;
          } catch (e) {}
        }

        electronProcess = spawn('npm', ['start'], {
          shell: true,
          env: process.env,
          stdio: 'inherit',
        });
      });
    },
  });
}

module.exports = [mainConfig, preloadConfig];