/**
  产品路由
**/
var express = require('express');
var router = express.Router();
var conf = require('../conf/conf');
var url = require('url');
var common = require('../common/comm');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // var arg = url.parse(req.url,true).query;
  // var {id}=arg;
  var id = 1;
  var selectSQL = `SELECT * from t_goos_details where goods_id = ${id}`;;
    var result = '';
    var bannerArr = [];
  conf.query(selectSQL,function(err,result){
        var banner1 = result[0].banner1||'';
        var banner2 = result[0].banner2||'';
        var banner3 = result[0].banner3||'';
        if(banner1){
            bannerArr.push(banner1);
        }if(banner2){
            bannerArr.push(banner2);
        }if(banner3){
            bannerArr.push(banner3);
        }
          var string=JSON.stringify(result);
          result=JSON.parse(string);
          console.log(bannerArr);
      res.render('goods/details',{banner:bannerArr,res:result});
     });
});


router.get('/classify', function(req, res, next){
  var arg = url.parse(req.url,true).query;
  var selectSQL = `select * from t_goods leftJoin  where classify_id=${arg.id} limit 6`;
  var selectTitle = `select classify_name,classify_img from t_classify   where id=${arg.id}`;
 
  var result = conf.quertPromise(selectSQL);
  var resTitle = conf.quertPromise(selectTitle);

  var promise = Promise.all([resTitle,result]);

  promise.then(function([resTitle,result]) {
    console.log(resTitle);
     res.render('goods/classify',{reslist:result,resTitle:resTitle});
  }).catch(function(err) {
    // ...
    //定义错误页面
    console.log(err);
  });
});

router.get('/getClassifyList',(req, res, next)=>{
    // console.log(req.query.goods_id);
    var selectSQL = 'SELECT * from t_goods  LIMIT 5 OFFSET '+req.query.goods_id;
    conf.query(selectSQL,function(err,result){
            var result=JSON.stringify(result);
        res.json({res:result});
      });
});


module.exports = router;
