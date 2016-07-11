var gulp = require('gulp');
var rename = require("gulp-rename");
var crisper = require("gulp-crisper");
var gulpIf = require('gulp-if');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var inlineSource = require('gulp-inline-source');
var vulcanize = require('gulp-vulcanize');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');



// Transpile all JS to ES5.
gulp.task('crisp', function() {
  return gulp.src(['*.es6.{js,html}'])
  .pipe(gulpIf('*.html', rename(function(opt) {
     opt.basename = opt.basename.replace(/(.es6)/ig, '');
     return opt;
   })))
   .pipe(sourcemaps.init())
   .pipe(gulpIf('*.html', crisper({scriptInHead: false}))) // Extract JS from .html files
   .pipe(sourcemaps.write('.'))
   .pipe(gulpIf('*.js', rename(function(opt) {
      opt.basename = opt.basename.replace(/(.es6)/ig, '');
      opt.basename += '.es6'
      return opt;
    })))
   .pipe(gulp.dest('./'));
});

// Transpile all JS to ES5.
gulp.task('transpile', ['crisp'],function() {
  return gulp.src(['*.es6.js'])
   .pipe(babel({
     presets: ['es2015']
   }))
   .pipe(rename(function(opt) {
      opt.basename = opt.basename.replace(/(.es6)/ig, '');
      return opt;
    }))
   .pipe(gulp.dest('./'));
});

gulp.task('clean', ['transpile'], function () {
	return gulp.src(['*.es6.js','*.es6.js.map'], {read: false})
		.pipe(clean({force: true}))
		.pipe(gulp.dest('./'));
});
gulp.task('serve', ['clean'], function() {
    browserSync.init({
        proxy: "localhost:8080",
        startPath: "/components/epic-video/demo/"
    });

    gulp.watch('*.es6.html', ['clean']);
    gulp.watch(['*.js', '!*.es6.js']).on('change', browserSync.reload);
});
