import * as fs from "fs";
import { resolve } from "path";

const nodeModules: any = {};
fs.readdirSync("./node_modules")
  .forEach((module) => {
    if (module !== ".bin") {
      nodeModules[module] = "commonjs " + module;
    }
  });

export let serverWebpackConfig = {
  devtool: "source-map" as "source-map",
  entry: ["./server/server.ts"],
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /\.ts/,
        use: [
          { loader: "awesome-typescript-loader", options: { useCache: true } },
        ],
      },
    ],
  },
  node: {
    __dirname: true,
  },
  output: {
    filename: "server.js",
    path: resolve(__dirname, "server"),
  },
  resolve: {
    extensions: [".ts"],
  },
};
