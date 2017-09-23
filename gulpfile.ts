import * as gulp from "gulp";
import * as webpack from "webpack";
import * as webpackStream from "webpack-stream";

import { getClientWebpackDevConfig } from "./client.webpack.dev";
import { getClientWebpackProdConfig } from "./client.webpack.prod";
import { serverWebpackDevConfig } from "./server.webpack.dev";
import { serverWebpackProdConfig } from "./server.webpack.prod";

const production: boolean = process.env.NODE_ENV === "production";

gulp.task("server-compile", () => {
  const serverWebpackConfig = production ? serverWebpackProdConfig : serverWebpackDevConfig;
  return webpackStream(serverWebpackConfig, webpack)
    .pipe(gulp.dest(serverWebpackConfig.output.path));
});

gulp.task("client-compile", () => {
  const clientWebpackConfig = production ? getClientWebpackProdConfig(".") : getClientWebpackDevConfig(".");
  return webpackStream(clientWebpackConfig, webpack)
    .pipe(gulp.dest(clientWebpackConfig.output.path));
});

gulp.task("default", ["client-compile", "server-compile"]);
