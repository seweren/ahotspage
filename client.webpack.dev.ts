import * as webpack from "webpack";
import * as merge from "webpack-merge";

import { getClientWebpackCommonConfig } from "./client.webpack.common";

export function getClientWebpackDevConfig(pathToClientWebpackTS: string): webpack.Configuration {
  return merge(getClientWebpackCommonConfig(pathToClientWebpackTS), {
    plugins:
    [
      new webpack.HotModuleReplacementPlugin(),
    ],
  });
}
