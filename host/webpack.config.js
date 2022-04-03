// Основное
const path = require('path');
const dotenv = require('dotenv');
const { dependencies } = require('./package.json');
// Плагины
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// Среда
dotenv.config();

const INDEX_FILE = 'public/index.html';

const defaultPort = 3000;

module.exports = async (env, argv) => {
  return {
    context: __dirname,
    target: 'web',
    mode: 'none',
    entry: {
      main: path.join(__dirname, '/src/index.ts'),
    },
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].js',
      publicPath: '/',
    },
    devtool: 'cheap-module-source-map',

    devServer: {
      publicPath: '/',
      port: defaultPort,
      host: '0.0.0.0',
      disableHostCheck: true,

      // Разрешить динамические пути в URL
      historyApiFallback: true,
      // Создавать сборочную директорию
      writeToDisk: true,
      // Отслеживание изменений дочерних приложений
      contentBase: [
        path.join(__dirname, '../remote/dist'),
      ],
      watchContentBase: true,
      // Горячая перезагрузка
      hot: true,
      // Отключение оверлэя с ошибками
      overlay: false,
      // Автоматически открывать браузера после сборки
      open: true,
      //HTTPS протокол
      https: true,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      plugins: [new TsconfigPathsPlugin()]
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                configFile: path.join(__dirname, '/.babelrc.js'),
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(ts|tsx)?$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                esModule: false,
              },
            },
            {
              loader: 'css-loader',
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
          },
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
          use: 'file-loader',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|)$/,
          type: 'asset/inline',
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'host',
        shared: {
          'react': {
            eager: true,
            requiredVersion: dependencies['react']
          },
          'react-dom': {
            eager: true,
            requiredVersion: dependencies['react-dom']
          },
          'react-router-dom': {
            eager: true,
            requiredVersion: dependencies['react-router-dom']
          },
        },
        remotes: {
          remote: 'remote@https://0.0.0.0:3001/remoteEntry.js'
        }
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, INDEX_FILE),
      }),

      new ReactRefreshWebpackPlugin(),

      new CleanWebpackPlugin({
        verbose: true
      })
    ],
  }
}
