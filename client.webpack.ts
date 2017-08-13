import { join, resolve } from "path";
import * as webpack from "webpack";

export function getClientWebpackConfig(pathToClientWebpackTS: string): webpack.Configuration {
  return {
    devtool: "source-map" as "source-map",
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
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
  };

}
