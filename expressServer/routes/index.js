var express = require('express');
var conf = require('../conf/conf');
var url = require('url');
// const fs = require('fs');//文件
// const multer = require('multer')({ dest: 'www/upload' });
var bodyParser = require('body-parser');//post请求用
var staticPath = require('express-static');//post请求用
var router = express.Router();
var app = express();
const uuidv5 = require('uuid/v5');
const uuidv1 = require('uuid/v1');
//const NOWDate = new Date();
// app.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
// server.use(multer.any());
// server.use(function (req, res, next) {
//   server.all(`${req.originalUrl}`, function (req, res,next) {
//      res.sendFile( __dirname + "/www/" + `${req.originalUrl}`);
//   });
//   next();
// });



//PC
/*router.get('/', function(req, res, next){
    var selectGoods = 'select * from t_goods limit 4';
    var selectClassify = 'select * from t_classify limit 4';
    var resGoods = conf.quertPromise(selectGoods);
    var resClassify = conf.quertPromise(selectClassify);

    var promise = Promise.all([resGoods,resClassify]);

    promise.then(function([resGood,resClass]) {
       res.render('index', { title: "冰旗库",res:resGood,classify:resClass});
    }).catch(function(err) {
      // ...
      //定义错误页面
      console.log(err);
    });
  // var data='';//mysql未安装
});
*/



/**  **/

//获取用户列表
router.get('/getMember',(req, res, next)=>{
	var{limit,offset,searchType,searchVal} = req.query;
	var search = 'where ';
	console.log(searchType);
	console.log(searchVal);
	if(searchType==1&&searchVal){
		search+='mobile like "%'+searchVal+'%"';
	}else if(searchType==2&&searchVal){
		search+='member_name like "%'+searchVal+'%"';
	}else if(searchType==3&&searchVal){
		search+='id_number like "%'+searchVal+'%"';
	}else{
		search = '';
	}
	console.log(search);
	var PageNum = limit*offset;
    var selectSQL = `select * from t_member ${search} limit ${limit} offset ${PageNum}`;
	var count = `select count(id) as total from t_member ${search}` ;
	  conf.query(count,function(err,resCount){
		 conf.query(selectSQL,function(err,result){
			res.json({count:resCount,list:result});
		  });
      });

});


/**    **/
//首页类别4条
router.get('/GetClassify',(req, res, next)=>{
    var selectSQL = 'select * from t_classify limit 4';
    conf.query(selectSQL,function(err,result){
            var result=JSON.stringify(result);
            console.log(result);
        res.json({res:result});
      });
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

//获取产品规格
router.get('/getSize',(req, res, next)=>{

    var selectSQL = `select t_size_accessories.size_name,t_goodssize_price.* from t_goods
	left join t_goodsSize_price on t_goodsSize_price.goods_id = t_goods.id
	left join t_size_accessories on t_goodsSize_price.size_id = t_size_accessories.id where t_goods.id = ${req.query.id}`;//${req.query.id}
    conf.query(selectSQL,function(err,result){
            var result=JSON.stringify(result);
        res.json({res:result});
      });
});

//产品详情
router.get('/GoodsDetails',(req, res, next)=>{
    var selectSQL = `select t_goods.title,t_goods.price,t_goods_details.* from
t_goods_details left join t_goods on t_goods.id = t_goods_details.goods_id where goods_id = ${req.query.id} limit 1`;//${req.query.id}
    conf.query(selectSQL,function(err,result){
		if(result!=""){
			var result=JSON.stringify(result[0]);
			res.json({res:result});
		}else{
			res.json({res:-1});
		}

      });
});


//每周特价产品3个
router.get('/weekSpecial',(req, res, next)=>{
    var selectSQL = 'SELECT t_goods.id,t_goods.url,t_sale_goods.sale_price,t_goods.title from t_sale_goods  LEFT JOIN t_goods on t_sale_goods.goods_id = t_goods.id';
    conf.query(selectSQL,function(err,result){
            var result=JSON.stringify(result);
        res.json(result);
      });
});

//首页产品分页通用
router.get('/getGoodsList',(req, res, next)=>{
    // console.log(req.query.goods_id);
	// count 为分页数大于整数则多1
    var selectSQL = `SELECT *,ceil((select COUNT(id) from t_goods)/20)as count from t_goods WHERE is_del = 0 LIMIT ${req.query.limit} OFFSET ${req.query.goods_id}`;
      conf.query(selectSQL,function(err,result){
            var result=JSON.stringify(result);
        res.json({res:result});
      });
});

//首页产品展示
router.get('/issue',(req, res, next)=>{
    // console.log(req.query.goods_id);
	// count 为分页数大于整数则多1
    /*var selectSQL = `SELECT *,ceil((select COUNT(id) from t_goods)/20)as count from t_goods WHERE is_del = 0 LIMIT ${req.query.limit} OFFSET ${req.query.goods_id}`;
      conf.query(selectSQL,function(err,result){
            var result=JSON.stringify(result);
        res.json({res:result});
      });*/
	  res.render('pc/issue', { hidden: ""});
});


router.post('/regist', function(req, res, next) {


  var {email,phone,password}=req.body;
  var psw = uuidv5(password, uuidv5.DNS);
  var isHave_user  = `select id from t_user where account = ${phone} and is_del = 0 limit 1`;
  var selectSQL = `INSERT INTO t_user(account,pwd,phone,token,createtime)VALUES(${phone},'${psw}',${phone},'${uuidv1()}',now())`
  // 1.查询是否注册过
  conf.query(isHave_user,function(err,result){
	  if(result!=''){
		  res.json('-1');
	  }else{
		  // 2. 用户注册添加
		  conf.query(selectSQL,function(err,resID){
			  if(resID.insertId){
				  // 2. 返回用户注册信息
				  conf.query(`select * from t_user where id = ${resID.insertId} and is_del = 0 limit 1`,function(err,resUser){
					res.json(resUser);
				})

			  }
		  });
	  }
  });
});

router.get('/login', function(req, res, next) {
	// res.locals.token=1003 ;//req.session.user;
	console.log(req.session.token);
	// 防止重复登陆
	if(req.session.token){
		res.render('pc/index', { hidden: 1});
	}else{
		res.render('pc/login',{hidden:2});
	}
});
//
router.get('/register', function(req, res, next) {

	res.render('pc/register');
});
// 用户登录接口 保存进session 前台获取保存 对比
router.post('/login', function(req, res, next) {
  var {account,password}=req.body;
  var psw = uuidv5(password, uuidv5.DNS);
  var selectSQL = `select * from t_user where account = '${account}' and pwd = '${psw}' limit 1`;


  // var answer = -1;
  conf.query(selectSQL,function(err,result){
			if(result!=''&&result){
				var token = uuidv1(); // 登录成功token
				req.session.token = token;
				// 将token 保存到表中，以便之后验证
				var InsertToken = `INSERT INTO t_token_log(uid,token,createtime)VALUES(${result[0].id},"${token}",now())`;
				conf.query(InsertToken,function(){});
				res.json({code: 200,msg: "登录成功"});
			}else{
				res.json({code:-1,msg: "账号或密码错误"});
			}
    });
});

// 退出
router.post('/logout', function(req, res, next) {
	req.session.token = null;
	res.redirect('/');
})
//获取订单信息
router.get('/GetOrder',(req, res, next)=>{

	var {id} = req.query;
	// 提交订单
	var Order = `select t_goods.title,t_size_accessories.size_name,t_goodssize_price.url,t_order.amount,t_order.createtime,t_goodssize_price.price,t_order_details.count from t_order
						left join t_order_details on t_order.id = t_order_details.order_id
						left join t_goodssize_price on t_goodssize_price.id = t_order_details.SizePrice_id
						left join t_goods on t_goods.id = t_goodssize_price.goods_id
						left join t_size_accessories on t_size_accessories.id = t_goodssize_price.size_id
						where t_order.id in(${id})`;
		 conf.query(Order,function(err,result){
			if(result!=''&&result){
				 res.json(result);
			}
		});

});
//获取订单列表
router.get('/GetOrderList',(req, res, next)=>{
	var  {uid,status} = req.query;
	if(uid!=undefined&&status!=undefined){
		var orderList = `SELECT * from t_order WHERE uid = ${uid}  and status = ${status}`;

	// 提交订单
	var orderDetailList = `select t_goods.title,t_size_accessories.size_name,t_goodssize_price.url,t_order.amount,t_order.createtime,t_goodssize_price.price,t_order_details.count,t_order_details.order_id from t_order
						left join t_order_details on t_order.id = t_order_details.order_id
						left join t_goodssize_price on t_goodssize_price.id = t_order_details.SizePrice_id
						left join t_goods on t_goods.id = t_goodssize_price.goods_id
						left join t_size_accessories on t_size_accessories.id = t_goodssize_price.size_id
						where t_order.uid = ${uid} and status = ${status} order by t_order.createtime desc`;

			   let oList = conf.quertPromise(orderList);
			   let oDetailList = conf.quertPromise(orderDetailList);

				var promise = Promise.all([oList,oDetailList]);//oList:res1,oDetailList:res2
					promise.then(function([resOrder,resDetailOrder]) {
						res.json({oList:resOrder,oDetailList:resDetailOrder});
				}).catch(function(err) {
					res.json(err);
				  // ...
				  //定义错误页面
				});
	}else{
		res.json(-1);
	}


		/*conf.query(InsertOrder,function(err,result){
			if(result!=''&&result){
					res.json(result)
			}
      });*/
});

//提交订单
router.get('/SetOrder',(req, res, next)=>{
	var orderList = '';
	if(req.query.orderList!=undefined&&req.query.orderList!=''){
		 orderList = JSON.parse(req.query.orderList);
	}
	var {uid,count,id,amount} = req.query; //count,id,
	// 是否添加过此商品到购物车 if(result!=''&&result){
	//var isHave_Size=`select *from t_shop_car where uid = ${uid} and SizePrice_id = ${id} limit 1`;
	// 提交订单
	var InsertOrder = `INSERT INTO t_order(uid,amount,createtime)VALUES(${uid},${amount},now())`;
		conf.query(InsertOrder,function(err,result){
		 if(result!=''&&result){
		   // 提交为购物车
		   if(orderList.length){
			orderList.forEach(function(item){
			 let removeCarList = `UPDATE t_shop_car SET status = 1 WHERE id = ${item.car_id}`;	//清除购物车
			 let InsertOrderList = `INSERT INTO t_order_details(SizePrice_id,order_id,count)VALUES(${item.id},${result.insertId},${item.count})`;
			 let remove_CarList = conf.quertPromise(removeCarList);
			 let Insert_OrderList = conf.quertPromise(InsertOrderList);

				//var promise =
				Promise.all([remove_CarList,Insert_OrderList]);
				/*conf.query(InsertOrderList,function(err,resDs){
					if(err){
						res.json(err)
					}
				})*/
			})
				res.json(result);
			}else{
				// 单个产品
				var InsertOrderDs = `INSERT INTO t_order_details(SizePrice_id,order_id,count)VALUES(${id},${result.insertId},${count})`;
				conf.query(InsertOrderDs,function(err,resDs){
					res.json(result);
				})
			}

		 }
      });
});

router.get('/pay', function(req, res, next) {
    var url=  ali.webPay({
        body: "ttt",
        subject: "ttt1",
        outTradeId: "201503200101010222",
        timeout: '90m',
        amount: "0.1",
        sellerId: '',
        product_code: 'FAST_INSTANT_TRADE_PAY',
        goods_type: "1",
        return_url:"127.0.0.1:300",
    })

    var url_API = 'https://openapi.alipay.com/gateway.do?'+url;
    res.json({url:url_API})
});

router.post('/payResult', function(req, res, next) {
  //var {account,password}=req.body;
   console.log(req.body);
});

router.post('/AuthResult', function(req, res, next) {
  //var {account,password}=req.body;
   console.log(req.body);
});
//登录页面
// router.get('/login', function(req, res, next){
// var data='';
//     res.render('logo/login', { title: "" ,"b":false,user:data});
// });
// router.get('/doc', function(req, res, next) {
//   res.render('document/doc');
// });
// router.get('/banners', function(req, res, next) {
//   res.render('index2', { title: '咕噜噜/banners' });
// });




router.get('/', function(req, res, next) {
	var deviceAgent = req.headers["user-agent"].toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    if(agentID){
        res.sendFile(`${process.cwd()}/public/index.html`, {title:''});
    }else{


				if(req.session.token){
					// 根据token查询用户表sql t_user
				}
        res.render('pc/index', { hidden: 1});
    }
});


router.get('/b', function(req, res, next) {
  console.log();
  res.sendFile(`${process.cwd()}/public/html/login.html`, {title:'index'});
  // res.jsonp({"bbb":123});
});
//router.use(staticPath('./public'));


module.exports = router;
