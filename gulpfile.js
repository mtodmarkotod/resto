const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

    

// COPY HTML 
gulp.task('copyhtml', async function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('./'));
});

// MINIFY AND MERGE CSS
gulp.task('buildcss', async function(){
    gulp.src(['src/*.css', 'src/lightbox/*.css', 'src/slick/*.css'])
        .pipe(autoprefixer())
            .pipe(concat('style.min.css'))
                .pipe(minifycss())
                    .pipe(gulp.dest('public/'));
});

// MINIFY AND MERGE JS
gulp.task('buildjs', async function(){
    gulp.src(['src/*.js', 'src/lightbox/*.js', 'src/slick/*.js'])
            .pipe(concat('script.min.js'))
                .pipe(uglify())
                    .pipe(gulp.dest('public/'));
});

// MINIFY IMAGES
gulp.task('imagemin', async function(){
    gulp.src('src/images/*')
        .pipe(imagemin())
            .pipe(gulp.dest('public/images/'));
});

// BUILD FOR PRODUCTION
gulp.task('build', gulp.parallel('copyhtml', 'imagemin', 'buildcss', 'buildjs'));


// WATCH 
gulp.task('watch', async function(){
    gulp.watch(['src/*.html', 'src/*.css', 'src/*js'], gulp.parallel(['copyhtml', 'buildcss', 'buildjs']));
        
});