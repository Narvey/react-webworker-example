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

var opts = {
  verbose: true, //Echo command
  env: { FORCE_COLOR: "true"} //Allow for colored output
}

gulp.task('build', ['clean'], shell.task(['npm run-script build'], opts));
gulp.task('server', ['build'], shell.task(['npm run-script serve'], opts));
