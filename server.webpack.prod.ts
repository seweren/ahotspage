import * as webpack from "webpack";
import * as merge from "webpack-merge";

import { serverWebpackCommonConfig } from "./server.webpack.common";

const serverWebpackProdOptions: Partial<webpack.Configuration> = {
  devtool: false,
  plugins:
    [
      new webpack.DefinePlugin({
        "process.env": { NODE_ENV: JSON.stringify("production") },
      }),
    ],
};

export let serverWebpackProdConfig = merge(
  serverWebpackCommonConfig,
  serverWebpackProdOptions,
);
