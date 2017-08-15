import { join, resolve } from "path";
import * as webpack from "webpack";

export function getClientWebpackConfig(pathToClientWebpackTS: string): webpack.Configuration {
  return {
    devtool: "eval" as "eval",
    entry: [
      "react-hot-loader/patch",
      "webpack/hot/dev-server",
      "webpack-hot-middleware/client",
      `./${join(pathToClientWebpackTS, "client", "index.tsx")}`,
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            { loader: "react-hot-loader/webpack" },
            {
              loader: "awesome-typescript-loader",
              options: { configFileName: join(pathToClientWebpackTS, "tsconfig.json"), useCache: true },
            },
          ],
        },
      ],
    },
    output: {
      filename: "index.js",
      path: resolve(pathToClientWebpackTS, "client"),
      publicPath: "/",
    },
    plugins: process.env.NODE_ENV === "production" ?
      [
        new webpack.LoaderOptionsPlugin({
          debug: false,
          minimize: true,
        }),
        new webpack.DefinePlugin({
          "process.env": { NODE_ENV: JSON.stringify("production") },
        }),
        new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          comments: false,
          compress: {
            screw_ie8: true,
          },
          mangle: {
            keep_fnames: true,
            screw_ie8: true,
          },
        }),
      ] :
      [
        new webpack.HotModuleReplacementPlugin(),
      ],
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
  };

}
