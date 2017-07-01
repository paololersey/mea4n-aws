var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')
var sourcemaps = require('gulp-sourcemaps')

gulp.task('js', function () {
  gulp.src(['ng/module.js', 'ng/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('static'))
})

gulp.task('watch:js', ['js'], function () {
  gulp.watch('ng/*.js', ['js'])
})

gulp.task('watch:css', function () {
  gulp.watch('css/**/*.styl', ['css'])
})