var express = require('express');
var conf = require('../conf/conf');
var url = require('url');
// const fs = require('fs');//文件
// const multer = require('multer')({ dest: 'www/upload' });
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
// server.use(multer.any());
// server.use(function (req, res, next) {
//   server.all(`${req.originalUrl}`, function (req, res,next) {
//      res.sendFile( __dirname + "/www/" + `${req.originalUrl}`);
//   });
//   next();
// });

//产品详情的图片上传
router.post('/upload', function(req, res, next) {
  //console.log(888);

});

router.get('/', function(req, res, next){
  var selectGoods = 'select * from t_goods limit 4';
  var selectClassify = 'select * from t_classify limit 4';
   var resGoods = conf.quertPromise(selectGoods);
   var resClassify = conf.quertPromise(selectClassify);

    var promise = Promise.all([resGoods,resClassify]);

    promise.then(function([resGood,resClass]) {
       res.render('index', { title: "冰旗库",res:resGood });
    }).catch(function(err) {
      // ...
      //定义错误页面
      console.log(err);
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
    // console.log(req.query.goods_id);
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

// router.get('/a', function(req, res, next) {
//   console.log("aaa");
//
//   res.send('respond with a resource');
//   res.jsonp({"bbb":123});
// });

//富文本编辑器
router.get('/test', function(req, res, next) {
  var arg = url.parse(req.url,true).query;
  var {id}=arg;
  var selectSQL = `SELECT details from t_goos_details where goods_id = ${id}`;
  conf.query(selectSQL,function(err,result){
          var result=JSON.stringify(result);
          var r=JSON.parse(result);
          console.log(r);
      res.render('document/GoodsDetailedit',{res:r});
    });
});

router.post('/saveText', function(req, res, next) {
  // var arg = url.parse(req.body,true).query;
  var {id,txt}=req.body;
  var selectSQL = `UPDATE  t_goos_details SET details = '${txt}'  WHERE goods_id = 1`;
  conf.query(selectSQL,function(err,result){
      res.json({result:200});
    });
});



router.get('/b', function(req, res, next) {
  console.log();
  res.sendFile(`${process.cwd()}/public/html/login.html`, {title:'index'});
  // res.jsonp({"bbb":123});
});
//router.use(staticPath('./public'));


module.exports = router;
