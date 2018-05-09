import ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
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

export const testsWebpackSeleniumConfig: Partial<webpack.Configuration> = {
  entry: ["./tests/selenium.ts"],
  externals: nodeModules,
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts/,
        use: [
          {
            loader: "ts-loader",
            options: { configFile: "selenium.tsconfig.json", transpileOnly: true },
          },
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
  plugins: [
    new ForkTsCheckerWebpackPlugin({ tsconfig: "selenium.tsconfig.json" }),
  ],
  resolve: {
    extensions: [".ts"],
  },
};
