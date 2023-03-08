const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function compilaSass() {
    return gulp
    .src('assets/stylesheets/sass/**.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('assets/stylesheets/css/'))
}

gulp.task('sass', compilaSass);