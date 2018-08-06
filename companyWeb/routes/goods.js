/**
  产品路由
**/
var express = require('express');
var router = express.Router();
var conf = require('../conf/conf');

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
      res.render('goods/details',{banner:bannerArr,res:result});



     });
});

module.exports = router;
