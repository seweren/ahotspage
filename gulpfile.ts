import * as gulp from "gulp";
import * as mocha from "gulp-mocha";
import { join } from "path";
import * as webpack from "webpack";
import * as webpackStream from "webpack-stream";

import { getClientWebpackDevConfig } from "./client.webpack.dev";
import { getClientWebpackProdConfig } from "./client.webpack.prod";
import { serverWebpackDevConfig } from "./server.webpack.dev";
import { serverWebpackProdConfig } from "./server.webpack.prod";
import { testWebpackCommonConfig } from "./tests.webpack.dev";

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

gulp.task("tests-compile", () =>
  webpackStream(testWebpackCommonConfig, webpack)
    .pipe(gulp.dest(testWebpackCommonConfig.output.path)),
);

gulp.task("tests-run", ["tests-compile"], () =>
  gulp.src(join(testWebpackCommonConfig.output.path, testWebpackCommonConfig.output.filename), { read: false })
    .pipe(mocha({ reporter: "dot" })),
);

gulp.task("default", ["client-compile", "server-compile"]);
