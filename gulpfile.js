let gulp = require('gulp');
let sass = require('gulp-sass');
let babel = require('gulp-babel');
let sourcemaps = require('gulp-sourcemaps');

//捕获错误信息
function swallowError(error) {
     // If you want details of the error in the console
   console.error(error.toString())

   this.emit('end')
}

gulp.task('sass', function () {
  return gulp.src('./public/src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/dist/css/'));
});
// gulp.task('es6', function () {
//   return gulp.src(['./js/es6/*.js']) // ES6 源码存放的路径
//     .pipe(babel({
//       presets: ['es2015',"stage-0"],
//       plugins: ["transform-es2015-modules-systemjs"]
//     }))
//     .pipe(sourcemaps.init())
//     //报错不退出
//     .on('error', swallowError)
//     //重命名
//     // .pipe(rename({suffix: '.dist'}))
//     .pipe(gulp.dest('./js/'));
// });

gulp.task('watch', function () {
  gulp.watch('./public/src/scss/*.scss', ['sass']);
  // gulp.watch('./js/es6/*.js', ['es6']);
});

gulp.task('default', function(){
  gulp.start('sass', 'watch');
})
