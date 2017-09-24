import * as fs from "fs";
import { resolve } from "path";

const nodeModules: any = {};
fs.readdirSync("./node_modules")
  .forEach((module) => {
    if (module !== ".bin") {
      nodeModules[module] = "commonjs " + module;
    }
  });

export const testWebpackCommonConfig = {
  entry: ["./tests/unittests.ts"],
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
    filename: "unittests.js",
    path: resolve(__dirname, "tests"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
