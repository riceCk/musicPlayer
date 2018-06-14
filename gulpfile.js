var gulp = require("gulp");
var imagemin = require("gulp-imagemin");        //压缩图片插件
var newer = require("gulp-newer");              //检测图片是否压缩过插件
var htmlClean = require("gulp-htmlclean");      //html压缩代码插件
var uglifyJs = require("gulp-uglify");          //js代码压缩插件
var strip = require("gulp-strip-debug");        //去掉js调试语句插件
var concat = require("gulp-concat");            //将多个js文件拼接一个文件中插件
var less = require("gulp-less");                //less转换css的插件
var connect = require("gulp-connect");          //上传服务器插件

var postcss = require("gulp-postcss")           //合并多个插件管理css插件
var autoprefixer = require("autoprefixer")       //css添加前缀代码插件
var cssnano = require("cssnano");               //压缩css代码

var devMode = process.env.NODE_ENV =="development";  //判断当前环境，生产环境就是true
console.log(devMode)

var folder = {          //目录文件夹
    src : "./src/",     //开发目录文件夹
    build : "./dist/"  //压缩打包处理后文件夹
}

//流读取文件  task running grunt
//执行指令  gulp images
gulp.task("images", function(){    //创建任务
    gulp.src(folder.src + "images/*")  //读取images下面的所有图片
        .pipe(newer(folder.build + "images"))  //如果图片已经压缩过就不会重复安装
        .pipe(imagemin())
        .pipe(gulp.dest(folder.build + "images"))   //管道传输图片写入bulid
        .pipe(connect.reload())                   //connect下的改变页面自动刷新方法
}) 

//执行指令  gulp html
gulp.task("html", function(){  //执行gulp html指令连带性images指令依赖
    var page = gulp.src(folder.src + "html/*")     //读取html下面的所有html文件
        .pipe(connect.reload())                   //connect下的改变页面自动刷新方法
    if(!devMode){
        page.pipe(htmlClean())                  //压缩html代码执行
    }
    page.pipe(gulp.dest(folder.build + "html"))  //管道传入html写入文件
})

gulp.task("js", function(){   //添加js任务
    var page = gulp.src(folder.src + "js/*")   //读取原js路劲
        .pipe(connect.reload())                   //connect下的改变页面自动刷新方法
    if(!devMode){
        page.pipe(strip())              //去掉js中调试语句
            .pipe(concat("main.js"))    //添加一个文件名main.js，js文件合并次文件中     
            .pipe(uglifyJs())           //js压缩代码执行
    }        
    page.pipe(gulp.dest(folder.build + "js"));  //写入路经
})

gulp.task("css", function(){
    var options = [autoprefixer(), cssnano()];    //数组合并两个插件
    var page = gulp.src(folder.src + "css/*")                //读取css文件
        .pipe(less())                             //执行less转换css插件
        .pipe(connect.reload())                   //connect下的改变页面自动刷新方法
    if(!devMode){
        page.pipe(postcss(options))                   //执行合并的插件完成即压缩css代码有添加css兼容前缀
    }        
    page.pipe(gulp.dest(folder.build + "css"));   //写入css文件
})

gulp.task("watch", function(){                    //创建监听文件
    gulp.watch(folder.src + "html/*", ["html"]);
    gulp.watch(folder.src + "css/*", ["css"]);
    gulp.watch(folder.src + "js/*", ["js"]);
    gulp.watch(folder.src + "images/*", ["images"]);
})

gulp.task("server", function(){              //创建上传服务器文件
    connect.server({               //执行默认的服务器指令
        port: "8080",              //配置端口号
        livereload: true
    });                        
})
gulp.task("default", ["html", "images", "js", "css", "watch", "server"])  //执行指令 gulp、 默认执行内部环境