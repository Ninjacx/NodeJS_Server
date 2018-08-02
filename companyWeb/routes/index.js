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
  var selectSQL = 'select * from t_goods limit 4';
    var result = '';
  conf.query(selectSQL,function(err,result){
          var string=JSON.stringify(result);
          result=JSON.parse(string);
         // if(err){
         //    data= '';
         // }else {
         //     data= json;
         // }
        // ,"b":false,user:data
        console.log(result);
      res.render('index', { title: "冰旗库",res:result });
     });
  // var data='';//mysql未安装
});
//精品推荐换一批随机4条
router.get('/changeRecommend',(req, res, next)=>{
    var selectSQL = 'select * from t_goods order by rand() LIMIT 4';
    conf.query(selectSQL,function(err,result){
            var result=JSON.stringify(result);
            console.log(result);
        res.json({res:result});
      });
});

//首页下拉产品每次取5条
router.get('/getGoodsList',(req, res, next)=>{
    console.log(req.query.goods_id);
    var selectSQL = 'SELECT * from t_goods  LIMIT 5 OFFSET '+req.query.goods_id;
    conf.query(selectSQL,function(err,result){
            var result=JSON.stringify(result);
        res.json({res:result});
      });
});
//登录页面
router.get('/login', function(req, res, next){
var data='';
    res.render('logo/login', { title: "" ,"b":false,user:data});
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
//router.use(staticPath('./public'));


module.exports = router;
