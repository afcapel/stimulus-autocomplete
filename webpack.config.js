const webpack = require('webpack')
const path = require("path")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const env = process.env.WEBPACK_ENV;
const pkg = require('./package.json')

let plugins = [], outputFile;

module.exports = {
  mode: 'development',
  entry: {
    app: "./examples/app.js"
  },

  output: {
    publicPath: "/assets/",
  },

  devServer: {
    inline: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: [
          /node_modules/
        ],
        use: [
          { loader: "babel-loader" }
        ]
      }
    ]
  },

   plugins: plugins
}
