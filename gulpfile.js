let path = require("path");
let gulp = require("gulp");
let webpack = require("webpack");
let webpack_stream = require("webpack-stream");
let SERVER_DIR = path.join(__dirname, "server");
let CLIENT_DIR = path.join(__dirname, "client");

gulp.task("server-compile", () => {
  process.chdir(SERVER_DIR);
  return gulp.src("server.ts").pipe(webpack_stream(path.join(SERVER_DIR, "server.webpack.js"), webpack)).pipe(gulp.dest("."));
});

gulp.task("client-compile", () => {
  process.chdir(CLIENT_DIR);
  return gulp.src("index.tsx").pipe(webpack_stream("./client.webpack.js", webpack)).pipe(gulp.dest("."));
});

gulp.task("all-compile", ["client-compile", "server-compile"]);
