import * as webpack from "webpack";

export let clientWebpackConfig = {
  devtool: "source-map" as "source-map",
  entry: [
    "webpack-dev-server/client?http://localhost:3000", // WebpackDevServer host and port
    "webpack/hot/only-dev-server", // "only" prevents reload on syntax errors
    "../client/index.tsx", // Your appʼs entry point
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader", options: { useCache: true } },
    ],
  },
  output: {
    filename: "index.js",
    publicPath: "../client/",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};
