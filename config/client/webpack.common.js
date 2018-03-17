const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const src = { client: path.join(process.cwd(),  'src', 'client') };

module.exports = {
  entry: {
    polyfills: path.join(src.client, 'polyfills.ts'),
    vendor: path.join(src.client, 'vendor.ts'),
    main: path.join(src.client, 'main.ts')
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },

  resolve: {
    extensions: ['.ts', '.js'],
    // plugins: [new TsconfigPathsPlugin({ configFile: path.join(src.client, 'tsconfig.json') })]
  },

  module: {
    rules: [
      // angular typescript loader
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.join(src.client, 'tsconfig.json')
            }
          }, 'angular2-template-loader', 'angular-router-loader']
      },
      // html loader
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      // static assets
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      // css global which not include in components
      {
        test: /\.css$/,
        exclude: path.join(src.client, 'app'),
        use: ExtractTextPlugin.extract({
          use: 'raw-loader'
        })
      },
      // css loader and inject into components
      {
        test: /\.css$/,
        include: path.join(src.client, 'app'),
        loader: 'raw-loader'
      },
      // sass loader and inject into components     
      {
        test: /\.scss$/,
        include: path.join(src.client, 'app'),
        use: ['raw-loader', 'sass-loader']
      },
      // sass global which not include in components
      {
        test: /\.scss$/,
        exclude: path.join(src.client, 'app'),
        use: ExtractTextPlugin.extract({
          use: ['raw-loader', 'sass-loader']
        })
      }
    ]
  },

  plugins: [

    new HtmlWebpackPlugin({
      template: path.join(src.client, 'index.html')
    }),

    new webpack.ContextReplacementPlugin(
      /\@angular(\\|\/)core(\\|\/)esm5/,
      src.client
    )
  ]
}