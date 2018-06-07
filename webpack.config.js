var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var postcssAssets = require('postcss-assets');
var postcssNext = require('postcss-cssnext');
var stylelint = require('stylelint');
var ManifestPlugin = require('webpack-manifest-plugin');
var CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var less = require('less-loader');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('styles/[name].css');
const extractLESS = new ExtractTextPlugin('styles/[name].css');

var config = {
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',
  target: 'web',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname), 'node_modules', 'app', 'app/redux'],
  },

  entry: {
    app: [
       // activate HMR for React
      'react-hot-loader/patch',

      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      'webpack-dev-server/client?http://localhost:8080',

      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
      'webpack/hot/only-dev-server',

      './src/scripts/index.tsx',
      './src/styles/site.less'
    ],
    worker: "./src/scripts/me.worker.js"
  },

  output: {
    path: path.resolve('./build/'),
    publicPath: '/',
    filename: 'js/[name].js',
    pathinfo: true
  },

  module: {
    rules: [{
        enforce: 'pre',
        test: /\.tsx?$/,
        loader: 'tslint-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        //include: path.resolve('./src/app'),
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      },
      // {
      //   test: /\.css$/,
      //   exclude: path.resolve('./src/app'),
      //   loaders: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
      {
        test: /\.less$/,
        loader: extractLESS.extract([ 'css-loader', 'less-loader' ])
      },
      {
        test: /\.eot(\?.*)?$/,
        loader: 'file-loader?name=fonts/[hash].[ext]'
      },
      {
        test: /\.(woff|woff2)(\?.*)?$/,
        loader: 'file-loader?name=fonts/[hash].[ext]'
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[hash].[ext]'
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[hash].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'url-loader?limit=1000&name=images/[hash].[ext]'
      }
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        tslint: {
          failOnHint: true,
          emitErrors: true
        },
        postcss: function () {
          return [
            stylelint({
              files: '../../src/app/*.css'
            }),
            postcssNext(),
            postcssAssets({
              relative: true
            }),
          ];
        },
      }
    }),
    new ManifestPlugin({
      fileName: '../manifest.json'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new HtmlWebpackPlugin({
        template: './src/index.ejs',
        inject: 'body'
    }),
    extractCSS,
    extractLESS,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  devServer: {
    contentBase: path.resolve(__dirname, './build'),  // New
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
    hot: true
  },

};

const createIfDoesntExist = dest => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }
}

createIfDoesntExist('./build');
createIfDoesntExist('./build/public');

module.exports = config;
