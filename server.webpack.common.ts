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

export let serverWebpackCommonConfig: Partial<webpack.Configuration> = {
  entry: ["./server/server.ts"],
  externals: nodeModules,
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: "awesome-typescript-loader", options: { configFileName: "server.tsconfig.json", useCache: true } },
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
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  resolve: {
    extensions: [".ts", ".tsx"],
  },
};
