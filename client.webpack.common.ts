import { join, resolve } from "path";
import * as webpack from "webpack";

export function getClientWebpackCommonConfig(pathToClientWebpackTS: string): webpack.Configuration {
  return {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            { loader: "react-hot-loader/webpack" },
            {
              loader: "awesome-typescript-loader",
              options: { configFileName: join(pathToClientWebpackTS, "client.tsconfig.json"), useCache: true },
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
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
  };
}
