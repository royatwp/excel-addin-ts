/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const devCerts = require('office-addin-dev-certs')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CustomFunctionsMetadataPlugin = require('custom-functions-metadata-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { VuetifyLoaderPlugin } = require('vuetify-loader')
const path = require('path')

const urlDev = 'https://localhost:3000/'
const urlProd = 'https://localhost:3000/' // CHANGE THIS TO YOUR PRODUCTION DEPLOYMENT LOCATION

/* global require, module, process, __dirname */

async function getHttpsOptions () {
  const httpsOptions = await devCerts.getHttpsServerOptions()
  return { cacert: httpsOptions.ca, key: httpsOptions.key, cert: httpsOptions.cert }
}

module.exports = async (env, options) => {
  const dev = options.mode === 'development'
  const buildType = dev ? 'dev' : 'prod'
  const config = {
    devtool: 'source-map',
    entry: {
      app: './src/app.ts',
      functions: './src/functions/functions.ts',
      polyfill: ['core-js/stable', 'regenerator-runtime/runtime']
    },
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[resource-path]?[loaders]',
      clean: true,
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true
          }
        },
        {
          test: /\.css$/,
          loader: 'css-loader'
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: 'html-loader'
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[name][ext][query]'
          }
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.html', '.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
        '~': path.resolve(__dirname, './src')
      }
    },
    plugins: [
      new VueLoaderPlugin(),
      new CustomFunctionsMetadataPlugin({
        output: 'functions.json',
        input: './src/functions/functions.ts'
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './public/index.html',
        inject: true,
        chunks: ['polyfill', 'functions', 'app']
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'assets/*',
            to: 'assets/[name][ext][query]'
          },
          {
            from: 'manifest*.xml',
            to: '[name].' + buildType + '[ext]',
            transform (content) {
              if (dev) {
                return content
              } else {
                return content.toString().replace(new RegExp(urlDev, 'g'), urlProd)
              }
            }
          }
        ]
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          extensions: {
            vue: true
          }
        }
      }),
      new VuetifyLoaderPlugin()
    ],
    devServer: {
      static: [__dirname],
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      https: env.WEBPACK_BUILD || options.https !== undefined ? options.https : await getHttpsOptions(),
      port: process.env.npm_package_config_dev_server_port || 3000
    }
  }

  return config
}
