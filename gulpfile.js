// Adiciona os módulos intalados
const { parallel } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

// Função e task para compilar o Sass já com os prefixos
function compilaSass() {
    return gulp
    .src('assets/stylesheets/sass/**.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        overrideBrowserslist: [
            'last 2 versions'
        ],
        cascade: false
    }))
    .pipe(gulp.dest('assets/stylesheets/css/'))
    .pipe(browserSync.stream())
}

gulp.task('sass', compilaSass);

// Função e task do browserSync - Server estático
function browser() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
}

gulp.task('browser-sync', browser);

// Função e task para verificar alterações nos arquivos .sass e .html
function watch() {
    gulp.watch('assets/stylesheets/sass/**.scss', compilaSass);
    gulp.watch('*.html').on('change', browserSync.reload);
}

gulp.task('watch', watch);

// Task padrão do gulp para executar, paralelamente, as tasks 'watch' e 'browser-sync'
gulp.task('default', parallel('watch', 'browser-sync'))