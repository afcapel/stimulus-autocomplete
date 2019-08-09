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
  ]
};
