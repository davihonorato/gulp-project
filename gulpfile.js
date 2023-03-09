// Adiciona os módulos intalados
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// Função e task para compilar o Sass já com os prefixos
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

gulp.task('sass', compilaSass);

// Função e task para verificar alterações nos aquivos .js
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

gulp.task('mainJs', gulpJs);

function pluginsJs() {
    return gulp
    .src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/moment/min/moment.min.js'
    ])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('assets/js/'))
    .pipe(browserSync.stream())
}

gulp.task('pluginsJs', pluginsJs)

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
    gulp.watch('assets/js/scripts/*.js', gulpJs);
    gulp.watch('*.html').on('change', browserSync.reload);
}

gulp.task('watch', watch);

// Task padrão do gulp para executar, paralelamente, as tasks 'watch' e 'browser-sync'
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainJs', 'pluginsJs'))