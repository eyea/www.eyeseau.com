// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'eyeseau' });
// });



var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user').user;
mongoose.connect('mongodb://localhost/hello-world');


// module.exports = function(app){
  // 首页
  router.get('/', function(req, res, next){
    res.render('index', {title: 'eyeseau',head: '首页', message: '登录查看更多精彩内容！'});
  });
  // 登录页
  router.get('/login', function(req, res, next){
    res.render('login', {title: '登录', head: '登录', message: '请输入相关登录信息'})
  });
  // 注册页
  router.get('/reg', function(req, res, next){
    res.render('reg', {title: '注册', head: '注册', message: '请填写注册信息'})
  });
  // 注销页
  router.get('/logout', function(req, res, next){
    res.render('logout', {title: '注销',head: '注销',  message: '请填写注册信息'})
  });
  // homepage
  router.post('/homepage', function(req, res){
    var query_doc = {userid: req.body.userid, password: req.body.password};
    console.log(res.body);
    (function(){
      user.count(query_doc, function(err, doc){
        if(doc == 1){
          console.log(query_doc.userid + ": login success in " + new Date());
          res.render('homepage', { title: 'homepage' });
        }else{
          console.log(query_doc.userid + ": login failed in " + new Date());
          res.redirect('/');
        }
      });
    })(query_doc);
  })
// }



module.exports = router;