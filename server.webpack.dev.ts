import * as webpack from "webpack";
import * as merge from "webpack-merge";

import { serverWebpackCommonConfig } from "./server.webpack.common";

const devWebpackConfig: Partial<webpack.Configuration> = {
  devtool: "source-map",
};

export let serverWebpackDevConfig = merge(
  serverWebpackCommonConfig,
  devWebpackConfig,
);
