import * as fs from "fs";
import { resolve } from "path";
import * as webpack from "webpack";

const nodeModules: any = {};
fs.readdirSync("./node_modules")
  .forEach((module) => {
    if (module !== ".bin") {
      nodeModules[module] = "commonjs " + module;
    }
  });

export const testsWebpackUnitConfig: Partial<webpack.Configuration> = {
  entry: ["./tests/unittests.ts"],
  externals: nodeModules,
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts/,
        use: [
          { loader: "awesome-typescript-loader", options: { configFileName: "tests.tsconfig.json", useCache: true } },
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
