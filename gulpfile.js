var gulp = require('gulp');
var shell = require('gulp-shell')
var del = require('del');


    // "clean": "rimraf build",
    // "prebuild": "npm run clean",
    // "build": "webpack --config config/webpack/index.js",
    // "build:prod": "cross-env NODE_ENV=production npm run build",
    // "postbuild": "webpack --config config/webpack/server.js",
    // "prestart": "npm run build",
    // "start": "node build/server.js",
    // "start:prod": "cross-env NODE_ENV=production npm start",
    // "test": "karma start config/test/karma.conf.js",
    // "lint": "tslint \"src/**/**.ts*\""


gulp.task('default',['server'], function(done)
{
  done();
});

gulp.task('clean', function (cb) {
  return del([
    'dist/**/*'
  ]);
})

gulp.task('build', ['clean'], shell.task(['webpack --color']));
gulp.task('server', ['build'], shell.task(['webpack-dev-server --color']));
