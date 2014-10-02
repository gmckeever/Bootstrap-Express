var gulp = require('gulp'),
        sass = require('gulp-ruby-sass'),
        autoprefixer = require('gulp-autoprefixer'),
        minifycss = require('gulp-minify-css'),
        rename = require('gulp-rename'),
        path = require("path"),
        fileinclude = require('gulp-file-include');

var paths = {
  templates: 'templates/',
  sass: 'content/assets/sass/',
  css: 'content/assets/css/'
};

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 35729}));
  app.use(express.static(__dirname + "/content"));
  app.listen(3000);
});

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(35729);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('templates', function() {
  return  gulp.src(path.join(paths.templates, '*.tpl.html'))
    .pipe(fileinclude())
    .pipe(rename({
      extname: ""
     }))
    .pipe(rename({
      extname: ".html"
     }))
    .pipe(gulp.dest('./content/'))
});

gulp.task('styles', function() {
      return gulp.src('content/assets/sass/*.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(gulp.dest('content/assets/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('content/assets/css'));
});

gulp.task('watch', function() {
  gulp.watch('content/*.html', notifyLiveReload);
  gulp.watch('content/assets/css/*.css', notifyLiveReload);
  gulp.watch('content/assets/sass/**/*.scss', ['styles']);
  gulp.watch('templates/*.html', ['templates']);
});

gulp.task('default', ['styles', 'express', 'livereload', 'watch'], function() {

});
