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
        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" },
          ],
        },
        {
          test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 100000,
                name: "[name].[ext]",
              },
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
      extensions: [".ts", ".tsx", ".js", ".css"],
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin()
    ]
  };
}
