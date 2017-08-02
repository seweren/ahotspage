import * as fs from "fs";

const nodeModules: any = {};
fs.readdirSync("./node_modules")
  .forEach((module) => {
    if (module !== ".bin") {
      nodeModules[module] = "commonjs " + module;
    }
  });

export let serverWebpackConfig = {
  devtool: "source-map" as "source-map",
  externals: nodeModules,
  module: {
    rules: [
      { test: /\.ts$/, loader: "awesome-typescript-loader", options: { useCache: true } },
    ],
  },
  node: {
    __dirname: true,
  },
  output: {
    filename: "server.js",
  },
  resolve: {
    extensions: [".ts"],
  },
};
