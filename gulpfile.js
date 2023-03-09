// Adiciona os módulos intalados
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');

// Função e task para compilar o Sass já com os prefixos
function compilaSass() {
    return gulp
    .src('assets/stylesheets/sass/*.scss')
    .pipe(sass())
    .pipe(
        autoprefixer({
            cascade: false
        })
    )
    .pipe(gulp.dest('assets/stylesheets/css/'))
    .pipe(browserSync.stream())
}

gulp.task('sass', compilaSass);

// Função e task para verificar alterações nos aquivos .js
function gulpJs() {
    return gulp
    .src('assets/js/scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('assets/js/'))
}

gulp.task('mainJs', gulpJs);

// Função e task do browserSync - Server estático
function browser() {
    browserSync.init({
        server: {
            baseDir: './',
        }
    })
}

gulp.task('browser-sync', browser);

// Função e task para verificar alterações nos arquivos .sass e .html
function watch() {
    gulp.watch('assets/stylesheets/sass/*.scss', compilaSass);
    gulp.watch('assets/js/scripts/*.js', gulpJs).on('change', browserSync.reload);
    gulp.watch('*.html').on('change', browserSync.reload);
}

gulp.task('watch', watch);

// Task padrão do gulp para executar, paralelamente, as tasks 'watch' e 'browser-sync'
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainJs'))