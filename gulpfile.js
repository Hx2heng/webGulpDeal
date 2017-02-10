import gulp from 'gulp';
import connect from 'gulp-connect';
import uglify from 'gulp-uglify';
import autoprefixer from 'gulp-autoprefixer';
import minify from 'gulp-minify-css';
import cssver from 'gulp-make-css-url-version';
import imageisux from 'gulp-imageisux';
import htmlmin from 'gulp-htmlmin';
import open from 'open';
import watch from 'gulp-watch';
import changed from 'gulp-changed';

//发布
const myGulp = gulp;
let first = false;
myGulp.task('js', () => {
    return myGulp.src(['js/**/*.js', 'js/*.js'])
        .pipe(changed('build/js'))
        .pipe(uglify())
        .pipe(myGulp.dest('build/js'))
        .pipe(connect.reload());
});
myGulp.task('image', () => {
    return myGulp.src(['images/*'])
        .pipe(changed('build/images'))
        .pipe(imageisux('', true))
        .pipe(myGulp.dest('build/images'))
        .pipe(connect.reload());
});
myGulp.task('css', () => {
    return myGulp.src(['css/*'])
        .pipe(changed('build/css'))
        .pipe(autoprefixer({
            browsers: ['> 5%'], //全球统计有超过5%的使用率的浏览器
            cascade: false, //是否美化属性值
            remove: true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(minify({
            compatibility: 'ie8'
        }))
        .pipe(myGulp.dest('build/css'))
        .pipe(connect.reload());
});
myGulp.task('html', () => {
    return myGulp.src(['*.html'])
        .pipe(changed('build'))
        //.pipe(htmlmin({collapseWhitespace: true}))
        .pipe(myGulp.dest('build'))
        .pipe(connect.reload());
});
myGulp.task('build', ['js','css','html','image','connect','watch'], () => {
    if(!first){
		open("http://localhost:8080/");
		first = true;
    }
    console.log('构建完成');
});

myGulp.task('watch', () => {
    myGulp.watch([ 'js/*','css/*', '*.html'], (event) => {
        console.log('文件 ' + event.path + ' 被 ' + event.type);
    })
    myGulp.watch(['js/*.js'], ['js']);
    myGulp.watch(['css/*.css'], ['css']);
    myGulp.watch(['images/*'], ['image']);
    myGulp.watch(['*.html'], ['html']);
  	
})
myGulp.task('connect', function() {
    connect.server({
        root: 'build',
        livereload: true
    });
});
export default myGulp
