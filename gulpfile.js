const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require("autoprefixer");
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const del = require('del');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

function clean() {
    return del('./dir/css');
}

function style() {
    return gulp.src('./src/scss/**/*.scss', { sourcemaps: true })
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(rename({ basename: 'styles', suffix: '.min' }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest('./dist/css', { sourcemaps: '.' }))
        .pipe(browserSync.stream());
}

function image() {
    return gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    gulp.watch('./src/scss/**/*.scss', style);
    gulp.watch('./dist/*.html').on('change', browserSync.reload);
}

exports.default = gulp.parallel(clean, style);
exports.style = style;
exports.image = image;
exports.watch = watch;