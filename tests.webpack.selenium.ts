import * as fs from "fs";
import { resolve } from "path";

const nodeModules: any = {};
fs.readdirSync("./node_modules")
  .forEach((module) => {
    if (module !== ".bin") {
      nodeModules[module] = "commonjs " + module;
    }
  });

export const testsWebpackSeleniumConfig = {
  entry: ["./tests/selenium.ts"],
  externals: nodeModules,
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
    filename: "selenium.js",
    path: resolve(__dirname, "tests"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
