var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
// var babel = require('gulp-babel');
var browserSync = require('browser-sync');
// gulp.task("uglify",function(){
//     gulp.src("src/jss/*.js")
//         .pipe(babel({
//             presets:['env']
//         }))
//         .pipe(uglify())
//         .pipe(gulp.dest('src/js'))
// });
gulp.task("sass", function() {
    //导入文件
    gulp.src("src/sass/*.scss")
        //转代码
        .pipe(sass().on('error', sass.logError))
        //导出文件
        .pipe(gulp.dest("src/css"))
})
gulp.task("server",function(){
    browserSync({
        server: './src/html/',
        // 代理服务器
        // proxy:'http://localhost:170',
        // 端口
        port: 170,
        files: ['src/sass/*.scss']
    });
    // 监听sass文件修改
    gulp.watch('src/sass/*.scss', ['sass']);
    // gulp.watch('src/jss/*.js', ['uglify']);
});
//gulp命令时候 敲命令时候触发任务
gulp.task("default", [ 'sass', 'server']);