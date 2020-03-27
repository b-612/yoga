'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemap = require('gulp-sourcemaps');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var csso = require('gulp-csso');
var jsminify = require('gulp-minify');
var babel = require('gulp-babel');
var flatten = require('gulp-flatten');
var server = require('browser-sync').create();

gulp.task('clean', function () {
    return del('build');
});

gulp.task('copyfonts', function () {
    return gulp.src('source/fonts/**/*.{woff,woff2}')
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('copyhtml', function () {
    return gulp.src('source/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('build'));
});

gulp.task('cssclean', function () {
    return del('build/css');
});

gulp.task('css', function () {
    return gulp.src([
        'source/sass/style.scss',
        'source/sass/normalize.scss'
    ])
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest('build/css/'))
        .pipe(sourcemap.init())
        .pipe(csso())
        .pipe(rename({
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('build/css/'))
        .pipe(server.stream());
});

gulp.task('images', function () {
    return gulp.src([
      'source/img/*.{png,jpg,svg}',
      'source/img/towebp/*'
    ])
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true}),
            imagemin.svgo()
        ]))
        .pipe(flatten({
            includeParents: 0
        }))
        .pipe(gulp.dest('build/img'));
});

gulp.task('webp', function () {
    return gulp.src('source/img/towebp/*')
        .pipe(webp({quality: 99.9}))
        .pipe(gulp.dest('build/img'));
});

gulp.task ('svgsprite', function () {
    return gulp.src('source/img/svgsprite/*')
        .pipe(imagemin([
        imagemin.svgo()
      ]))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('sprite.svg'))
        .pipe(gulp.dest('build/img'));
});

gulp.task('jscopy', function () {
  return gulp.src('source/js/*.min.js')
    .pipe(gulp.dest('build/js'));
});

gulp.task('jsmin', function () {
  return gulp.src(['source/js/minify/*.js'])
    .pipe(sourcemap.init())
    .pipe(babel())
    .pipe(jsminify({
          ext:{
              src:'.js',
              min:'.min.js'
          },
          noSource:'*.js'
      }))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/js'))
});

gulp.task('refresh', function (done) {
    server.reload();
    done();
});

gulp.task('server', function () {
    server.init({
        server: 'build/',
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('cssclean', 'css'));
    gulp.watch('source/*.html', gulp.series('copyhtml')).on('change', server.reload);
    gulp.watch('source/img/svgsprite', gulp.series('svgsprite', 'refresh'));
    gulp.watch('source/js/minify/*.js', gulp.series('jsmin', 'refresh'));
});

gulp.task('build', gulp.series(
    'clean',
    'copyfonts',
    'copyhtml',
    'images',
    'svgsprite',
    'css',
    'webp',
    'jscopy',
    'jsmin'
));

gulp.task('start', gulp.series('build', 'server'));
