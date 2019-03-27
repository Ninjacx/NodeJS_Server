var express = require('express');
var router = express.Router();
var conf = require('../conf/conf');

/* 获取用户收货地址 */
router.get('/GetConsignee', function(req, res, next) {
  var uid = req.query.uid;
  
  var Addr = `select  t_shipping_addr.* from t_user left join t_shipping_addr on t_user.addr_id = t_shipping_addr.id where t_user.id = ${uid} and t_shipping_addr.is_del = 0 limit 1`;
	
  conf.query(Addr,function(err,result){
	  console.log(result);
		if(result!=''&&result){
			res.json(result);
		}
	
    });
});

/* 获取用户地址列表 */
router.get('/GetAddressList', function(req, res, next) {
  var uid = req.query.uid;
  var selectSQL = `SELECT * from t_shipping_addr where uid = ${uid} and is_del = 0`;
  conf.query(selectSQL,function(err,result){
	  console.log(result);
		if(result!=''&&result){
			res.json({result:result});
		}
	
    });
});

/* GET users listing. */
router.get('/a', function(req, res, next) {
  res.send('respond with a resourceaa');
});

/* GET users listing. */
router.get('/b', function(req, res, next) {
  res.send('respond with a resourceaa');
});

module.exports = router;
