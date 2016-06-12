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
var rimraf = require('rimraf');
var fileinclude = require('gulp-file-include');

// ---------------------------------------------------------

gulp.task('fileinclude', function() {
  // content
  gulp.src('app/index.html')
    .pipe(fileinclude())
    .pipe(gulp.dest('dist'));

});

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

gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', ['sass','useref'], browserSync.reload);
  gulp.watch('app/*.html', ['useref'], browserSync.reload);
  gulp.watch('app/js/**/*.js', ['useref'], browserSync.reload);
});

gulp.task('browserSync', function() {
  browserSync(['dist/*.html', 'dist/css/*.css', 'dist/js/*.js'], {
    server: {
      baseDir: "dist/"
    }
  });
});

gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(fileinclude())
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', minifyCSS()))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
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

gulp.task('clean', function(cb) {
  rimraf('dist/*', cb);
});

// ---------------------------------------------------------

// default workflow dev
gulp.task('default', function(callback) {
  runSequence(['sass', 'useref', 'images', 'fonts', 'browserSync', 'watch'],
    callback
  )
});

// default workflow build dist
gulp.task('build', function(callback) {
  runSequence('clean', ['sass', 'useref', 'images', 'fonts'],
    callback
  )
});
