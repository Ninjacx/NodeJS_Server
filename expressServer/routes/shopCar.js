var express = require('express');
var conf = require('../conf/conf');
var url = require('url');
// const fs = require('fs');//文件
// const multer = require('multer')({ dest: 'www/upload' });
var bodyParser = require('body-parser');//post请求用
var staticPath = require('express-static');//post请求用
var router = express.Router();
var app = express();


 
//购物车
router.get('/List',(req, res, next)=>{
    var selectSQL = `select t_shop_car.id as car_id,t_size_accessories.size_name,t_goodssize_price.id,t_goods.title,t_goods.description,t_goodssize_price.price,t_shop_car.count 
						from t_shop_car 
					left join t_goodssize_price on t_goodssize_price.id = t_shop_car.SizePrice_id
					left join t_size_accessories on t_size_accessories.id = t_goodssize_price.size_id
					left join t_goods on t_goodssize_price.goods_id = t_goods.id where t_shop_car.uid = ${req.query.uid} and t_size_accessories.is_del = 0 and t_shop_car.status = 0`;
		conf.query(selectSQL,function(err,result){
            var result=JSON.stringify(result);
        res.json({res:result});
      });
});



//加入购物车
router.get('/SetCar',(req, res, next)=>{
	var {uid,count,id} = req.query;
	
	// 是否添加过此商品到购物车
	var isHave_Size=`select *from t_shop_car where uid = ${uid} and SizePrice_id = ${id} and status = 0 limit 1`;
	// 添加至购物车
	var selectSQL = `INSERT INTO t_shop_car(uid,SizePrice_id,count)VALUES(${uid},${id},${count})`;
	
		conf.query(isHave_Size,function(err,result){
			if(result!=''&&result){
				var NewCount = parseInt(count)+result[0].count;
				// 有此id商品则更新数量
				var updateSQL = `UPDATE t_shop_car SET count = ${NewCount} WHERE uid = ${uid} and SizePrice_id = ${id} and status = 0`;
				  conf.query(updateSQL,function(err,resup){
					res.json(resup);
				  });
				console.log(updateSQL);
			}else{
				// 添加至购物车
				 conf.query(selectSQL,function(err,result){
					res.json(result);
				  });
			}
      });
});



module.exports = router;
