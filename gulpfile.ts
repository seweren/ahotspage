import * as gulp from "gulp";
import * as path from "path";
import * as webpack from "webpack";
import * as webpackStream from "webpack-stream";
import { clientWebpackConfig } from "./client/client.webpack";
import { serverWebpackConfig } from "./server/server.webpack";
const SERVER_DIR = path.join(__dirname, "server");
const CLIENT_DIR = path.join(__dirname, "client");

gulp.task("server-compile", () => {
  process.chdir(SERVER_DIR);
  return gulp.src("server.ts").pipe(webpackStream(serverWebpackConfig, webpack)).pipe(gulp.dest("."));
});

gulp.task("client-compile", () => {
  process.chdir(CLIENT_DIR);
  return gulp.src("./index.tsx").pipe(webpackStream(clientWebpackConfig, webpack)).pipe(gulp.dest("."));
});

gulp.task("default", ["client-compile", "server-compile"]);
