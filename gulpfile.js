// Adiciona os módulos intalados
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// Função e task (atualizada) para compilar o Sass já com os prefixos
function compilaSass() {
    return gulp
    .src('assets/stylesheets/sass/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(
        autoprefixer({
            cascade: false
        })
    )
    .pipe(gulp.dest('assets/stylesheets/css/'))
    .pipe(browserSync.stream())
}
exports.compilaSass = compilaSass;

// Função e task (atualizada) para verificar alterações nos aquivos .js
function gulpJs() {
    return gulp
    .src('assets/js/scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/'))
    .pipe(browserSync.stream())
}
exports.gulpJs = gulpJs;

function pluginsJs() {
    return gulp
    .src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/moment/min/moment.min.js',
        'node_modules/moment/locale/pt-br.js'
    ])
    .pipe(concat('plugins.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/'))
    .pipe(browserSync.stream())
}
exports.pluginsJs = pluginsJs;

// Função e task (atualizada) do browserSync - Server estático
function browser() {
    browserSync.init({
        server: {
            baseDir: './',
        }
    })
}
exports.browser = browser;

// Função e task para verificar alterações nos arquivos .sass e .html
function watch() {
    gulp.watch('assets/stylesheets/sass/*.scss', compilaSass);
    gulp.watch('assets/js/scripts/*.js', gulpJs);
    gulp.watch('*.html').on('change', browserSync.reload);
}
exports.watch = watch;

// Task padrão do gulp (atualizada) para executar, paralelamente, as tasks
exports.default = gulp.parallel(watch, browser, compilaSass, gulpJs, pluginsJs);