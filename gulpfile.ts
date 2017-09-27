import { ChildProcess, spawn } from "child_process";
import * as gulp from "gulp";
import * as mocha from "gulp-mocha";
import { join } from "path";
import * as webpack from "webpack";
import * as webpackStream from "webpack-stream";

import { getClientWebpackDevConfig } from "./client.webpack.dev";
import { getClientWebpackProdConfig } from "./client.webpack.prod";
import { serverWebpackDevConfig } from "./server.webpack.dev";
import { serverWebpackProdConfig } from "./server.webpack.prod";
import { testsWebpackSeleniumConfig } from "./tests.webpack.selenium";
import { testsWebpackUnitConfig } from "./tests.webpack.unit";

function getSelenium() {
  return require("selenium-standalone");
}
function getWebdriver() {
  return require("gulp-webdriver");
}
const selenium = getSelenium();
const webdriver = getWebdriver();
const production: boolean = process.env.NODE_ENV === "production";
let serverPid: ChildProcess = null;

gulp.task("compile-server", () => {
  const serverWebpackConfig = production ? serverWebpackProdConfig : serverWebpackDevConfig;
  return webpackStream(serverWebpackConfig, webpack)
    .pipe(gulp.dest(serverWebpackConfig.output.path));
});

gulp.task("compile-client", () => {
  const clientWebpackConfig = production ? getClientWebpackProdConfig(".") : getClientWebpackDevConfig(".");
  return webpackStream(clientWebpackConfig, webpack)
    .pipe(gulp.dest(clientWebpackConfig.output.path));
});

gulp.task("compile-unit-tests", () =>
  webpackStream(testsWebpackUnitConfig, webpack)
    .pipe(gulp.dest(testsWebpackUnitConfig.output.path)),
);

gulp.task("run-unit-tests", ["compile-unit-tests"], () =>
  gulp.src(join(testsWebpackUnitConfig.output.path, testsWebpackUnitConfig.output.filename), { read: false })
    .pipe(mocha({ reporter: "dot" })),
);

gulp.task("compile-selenium-tests", () =>
  webpackStream(testsWebpackSeleniumConfig, webpack)
    .pipe(gulp.dest(testsWebpackSeleniumConfig.output.path)),
);

gulp.task("start-server", ["stop-servers"], () => {
  serverPid = spawn("node", ["server/server.js"]);
});

gulp.task("stop-servers", () => {
  if (serverPid) {
    serverPid.kill();
    serverPid = null;
  }
  if (selenium.child) {
    selenium.child.kill();
    selenium.child = null;
  }
});

gulp.task("start-selenium", (done) => {
  selenium.install({}, (installError: any) => {
    if (installError) {
      return done(installError);
    }
    selenium.start((startError: any, child: any) => {
      if (startError) {
        return done(startError);
      }
      selenium.child = child;
      done();
    });
  });
});

gulp.task("stop-selenium", () => selenium.child.kill());

gulp.task("run-selenium-tests-webdriver", ["compile-selenium-tests", "start-server", "start-selenium"], (done) =>
  gulp.src(join("tests", "wdio.conf.js")).pipe(webdriver())
    .once("error", () => { selenium.child.kill(); done(); }),
);

gulp.task("run-selenium-tests", ["run-selenium-tests-webdriver"], () =>
  gulp.start("stop-servers"),
);

gulp.task("run-tests", ["run-unit-tests", "run-selenium-tests"]);

gulp.task("default", ["compile-client", "compile-server"]);
