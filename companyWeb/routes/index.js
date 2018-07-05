var express = require('express');
var conf = require('../conf/conf');
var bodyParser = require('body-parser');//post请求用
var staticPath = require('express-static');//post请求用
var router = express.Router();
var app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
//
// app.post("/",function(req,res){
//     console.log(req.body);
// });
/* GET home page. */
router.get('/', function(req, res, next){

var selectSQL = 'select * from n_user limit 10';
// conf.query(selectSQL,function(err,result){
//     var string=JSON.stringify(result);
//           //将json字符串转化成json数组
//           var json=JSON.parse(string);
//           // console.log(json);
//        if(err){
//           data= '';
//        }else {
//            data= json;
//        }
//
//    });
var data='';//mysql未安装
    res.render('index', { title: "" ,"b":false,user:data});//企业网站搭建-云工作室
});

//登录页面
router.get('/login', function(req, res, next){
var data='';
    res.render('logo/login', { title: "" ,"b":false,user:data});//企业网站搭建-云工作室
});
router.get('/doc', function(req, res, next) {
  res.render('document/doc');
});
router.get('/banners', function(req, res, next) {
  res.render('index2', { title: '咕噜噜/banners' });
});

router.get('/a', function(req, res, next) {
  res.send('respond with a resource');
  res.jsonp({"bbb":123});
});
router.get('/b', function(req, res, next) {
  console.log();
  res.sendFile(`${process.cwd()}/public/html/login.html`, {title:'index'});
  // res.jsonp({"bbb":123});
});
router.use(staticPath('./public'));


module.exports = router;
