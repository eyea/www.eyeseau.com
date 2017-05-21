var gulp    = require('gulp'),
    // js压缩
    uglify  = require('gulp-uglify'),
    // image压缩
    imagemin= require('gulp-imagemin'),
    // png图片压缩插件
    pngquant= require('imagemin-pngquant'),
    cache   = require('gulp-cache'),
    cleanCss= require('gulp-clean-css'),
    // 多任务顺序执行
    gulpSequence=require('gulp-sequence');

// Gulp工具
var GulpTool = function(){
  var that    = this,
      options = {},
      url     = {};

  // 打包目录
  that.destPath = 'dist/'
 
  // 属性
  this.options = {
    // 当前时间戳
    // ts: Date.now(),
    url : {
      js: 'public/js/',
      jsMatch: '**/*.js',
      css: 'public/css/',
      cssMatch: '**/*.css',
      img: 'public/images/',
      imgMatch: '**/*.{jpg,png,ico,gif}'
    }

  };
  options = that.options;
};
// Gulp原型扩展方法
GulpTool.prototype = {
  // 构建js
  buildJs: function(){
    var that = this,
        // 构造属性
        options = that.options,
        url = options.url;  
    return gulp.src(url.js + url.jsMatch)
               .pipe(uglify())
               .pipe(gulp.dest(that.destPath+'js'))
  },
  // 构建css
  buildCss: function(){
    var that = this,
        // 构造属性
        options = that.options,
        url = options.url;  
    return gulp.src(url.css + url.cssMatch)
              .pipe(cleanCss({
                 advanced: false,
                 compatibility: '*'
              }))
              .pipe(gulp.dest(that.destPath+'css'))    
  },
  // 构建images
  buildImg: function(){
    var that = this,
        // 构造属性
        options = that.options,
        url = options.url;  
    return gulp.src(url.img + url.imgMatch)
               .pipe(cache(imagemin({
                 progressive: true,
                 use: [pngquant()]  // //使用pngquant深度压缩png图片的imagemin插件
               })))
              .pipe(gulp.dest(that.destPath+'images'))     
  }
}


// 实例化 GulpTool
var gulpTool = new GulpTool();

// 单个任务执行
// 压缩js
gulp.task('buildJs', function(){
  return gulpTool.buildJs();
});
// 压缩image
gulp.task('buildImg', function(){
  return gulpTool.buildImg();
});
// 压缩css 
gulp.task('buildCss', function(){
  return gulpTool.buildCss();
});

// 并行多个任务顺序执行
gulp.task('buildStatic', gulpSequence('buildJs', 'buildCss', 'buildImg'));

// 默认任务
gulp.task('default', ['buildStatic']);
