import * as merge from "webpack-merge";

import { serverWebpackCommonConfig } from "./server.webpack.common";

export let serverWebpackDevConfig = merge(
  serverWebpackCommonConfig,
  {});
