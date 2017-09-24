import { join } from "path";
import * as webpack from "webpack";
import * as merge from "webpack-merge";

import { getClientWebpackCommonConfig } from "./client.webpack.common";

export function getClientWebpackDevConfig(pathToClientWebpackTS: string): webpack.Configuration {
  return merge(getClientWebpackCommonConfig(pathToClientWebpackTS), {
    devtool: "eval" as "eval",
    entry: [
      "react-hot-loader/patch",
      "webpack/hot/dev-server",
      "webpack-hot-middleware/client",
      `./${join(pathToClientWebpackTS, "client", "index.tsx")}`,
    ],
    plugins:
    [
      new webpack.HotModuleReplacementPlugin(),
    ],
  });
}
