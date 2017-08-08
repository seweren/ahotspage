import * as webpack from "webpack";

export let clientWebpackConfig = {
  devtool: "source-map" as "source-map",
  entry: [
    "react-hot-loader/patch",
    "webpack/hot/dev-server",
    "webpack-hot-middleware/client",
    "../client/index.tsx",
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: "react-hot-loader/webpack" },
          { loader: "awesome-typescript-loader", options: { useCache: true } },
        ],
      },
    ],
  },
  output: {
    filename: "index.js",
    publicPath: "/",
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};
