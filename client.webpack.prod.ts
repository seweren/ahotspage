import { join } from "path";
import * as webpack from "webpack";
import * as merge from "webpack-merge";

import { getClientWebpackCommonConfig } from "./client.webpack.common";

export function getClientWebpackProdConfig(pathToClientWebpackTS: string): webpack.Configuration {
  return merge(getClientWebpackCommonConfig(pathToClientWebpackTS), {
    devtool: false,
    entry: [
      `./${join(pathToClientWebpackTS, "client", "index.tsx")}`,
    ],
    mode: "production",
    optimization: {
      minimize: true,
    },
    plugins:
      [
        new webpack.LoaderOptionsPlugin({
          debug: false,
          minimize: true,
        }),
        new webpack.DefinePlugin({
          "process.env": { NODE_ENV: JSON.stringify("production") },
        }),
      ],
  });
}
