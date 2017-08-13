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
        loader: "awesome-typescript-loader",
        options: { configFileName: "tsconfig.server.json", useCache: true },
        test: /\.ts$/,
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
