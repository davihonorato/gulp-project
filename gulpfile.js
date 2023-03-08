const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

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
}

gulp.task('sass', compilaSass);