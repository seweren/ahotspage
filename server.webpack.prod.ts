import * as webpack from "webpack";
import * as merge from "webpack-merge";

import { serverWebpackCommonConfig } from "./server.webpack.common";

export let serverWebpackProdConfig = merge(
  serverWebpackCommonConfig,
  {
    devtool: false,
    plugins:
    [
      new webpack.DefinePlugin({
        "process.env": { NODE_ENV: JSON.stringify("production") },
      }),
    ],
  },
);
