import { resolve } from "path";
import * as webpack from "webpack";
import * as merge from "webpack-merge";

import { getClientWebpackCommonConfig } from "./client.webpack.common";

export function getClientWebpackProdConfig(pathToClientWebpackTS: string): webpack.Configuration {
  return merge(getClientWebpackCommonConfig(pathToClientWebpackTS), {
    devtool: false,
    entry: [
      `${resolve(pathToClientWebpackTS, "client", "index.tsx")}`,
    ],
    plugins:
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
    ],
  });
}
