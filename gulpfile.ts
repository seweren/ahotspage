import * as gulp from "gulp";
import * as path from "path";
import * as webpack from "webpack";
import { clientWebpackConfig } from "./client/client.webpack";
import { serverWebpackConfig } from "./server/server.webpack";
import webpack_stream = require("webpack-stream");
const SERVER_DIR = path.join(__dirname, "server");
const CLIENT_DIR = path.join(__dirname, "client");

gulp.task("server-compile", () => {
  process.chdir(SERVER_DIR);
  return gulp.src("server.ts").pipe(webpack_stream(serverWebpackConfig, webpack)).pipe(gulp.dest("."));
});

gulp.task("client-compile", () => {
  process.chdir(CLIENT_DIR);
  return gulp.src("./index.tsx").pipe(webpack_stream(clientWebpackConfig, webpack)).pipe(gulp.dest("."));
});

gulp.task("default", ["client-compile", "server-compile"]);
