var express = require('express');
var conf = require('../conf/conf');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next){

var selectSQL = 'select * from n_user limit 10';
//服务器未配置数据库
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
//        res.render('index', { title: "" ,"b":false,user:data});//企业网站搭建-云工作室
//    });
res.render('index', { title: "" ,"b":false,user:data});//企业网站搭建-云工作室
});
router.get('/banners', function(req, res, next) {
  res.render('index2', { title: '咕噜噜/banners' });
});

router.get('/a', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;
