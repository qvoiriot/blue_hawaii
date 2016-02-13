var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var uncss = require('gulp-uncss');
var rimraf = require('rimraf');

// ---------------------------------------------------------

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app',
      reloadDelay: 200
    },
  })
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', minifyCSS()))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean', function (cb) {
    rimraf('dist/*', cb);
});

gulp.task('unusecss', function () {
    return gulp.src('dist/css/style.min.css')
        .pipe(uncss({
            html: ['*.html']
        }))
        .pipe(gulp.dest('./outcss'));
});

// ---------------------------------------------------------

// default workflow dev
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
  callback
  )
});

// default workflow build dist
gulp.task('build', function (callback) {
  runSequence('clean',
  ['sass', 'useref', 'images', 'fonts', 'unusecss'],
  callback
  )
});
