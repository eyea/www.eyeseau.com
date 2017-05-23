// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'eyeseau' });
// });

// module.exports = router;
module.exports = function(app){
  // 首页
  app.get('/', function(req, res, next){
    res.render('index', {title: 'eyeseau',head: '首页', message: '登录查看更多精彩内容！'});
  });
  // 登录页
  app.get('/login', function(req, res, next){
    res.render('login', {title: '登录', head: '登录', message: '请输入相关登录信息'})
  });
  // 注册页
  app.get('/reg', function(req, res, next){
    res.render('reg', {title: '注册', head: '注册', message: '请填写注册信息'})
  });
}