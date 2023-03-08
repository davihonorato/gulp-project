const { parallel } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

// Função para compilar o Sass
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

// Função do browserSync - Server estático
function browser() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
}

gulp.task('browser-sync', browser);

// Função para ficar verificando alterações nos arquivos Sass
function watch() {
    gulp.watch('assets/stylesheets/sass/**.scss', compilaSass);
}

gulp.task('watch', watch);

// Função default
gulp.task('default', parallel('watch', 'browser-sync'))