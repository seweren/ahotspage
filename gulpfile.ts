import * as gulp from "gulp";
import * as webpack from "webpack";
import * as webpackStream from "webpack-stream";

import { getClientWebpackConfig } from "./client.webpack";
import { serverWebpackConfig } from "./server.webpack";

gulp.task("server-compile", () => {
  return webpackStream(serverWebpackConfig, webpack)
    .pipe(gulp.dest(serverWebpackConfig.output.path));
});

gulp.task("client-compile", () => {
  return webpackStream(getClientWebpackConfig("."), webpack)
    .pipe(gulp.dest(getClientWebpackConfig(".").output.path));
});

gulp.task("default", ["client-compile", "server-compile"]);
