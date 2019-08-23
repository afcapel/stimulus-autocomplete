const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./app.js"
  },

  devServer: {
    port: 8080
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: true,
      chunks: ["index"],
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      template: "./results.html",
      inject: true,
      chunks: ["results"],
      filename: "results.html"
    })
  ],

  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.m?js$/,
        type: "javascript/auto",
        options: {
          presets: [
            '@babel/preset-env',{
            'plugins': ['@babel/plugin-proposal-class-properties']
          }]
        }
      }
    ]
  }
};
