var express = require('express');
var conf = require('../conf/conf');
var url = require('url');
const uuidv3 = require('uuid/v3');
// const multer = require('multer')({ dest: 'www/upload' });
var bodyParser = require('body-parser');//post请求用
var staticPath = require('express-static');//post请求用
var fs = require('fs');//文件
var formidable = require("formidable");
var router = express.Router();
var app = express();

//1./ 2.user 3.test 5.vue 6.css 7 else


//后台登陆页
router.get('/', function(req, res, next) {
  res.render('system/vue',{left:5});
});

//富文本编辑器
router.get('/test', function(req, res, next) {
  var arg = url.parse(req.url,true).query;

  var {id}=arg;
  var selectSQL = `select details from t_goods_details where goods_id = ${id?id:0}`;
  conf.query(selectSQL,function(err,result){
          var result=JSON.stringify(result);
          var txt=JSON.parse(result);
      res.render('system/GoodsDetailedit',{res:txt,left:3});
    });
});

//用户列表
router.get('/user', function(req, res, next) {
  var getUser = `select * from t_user where is_del = 0`;
  conf.query(getUser,function(err,result){
          var result=JSON.stringify(result);

          var user=JSON.parse(result);
		   console.log(user);
      res.render('system/userList',{res:user,left:2});
    });
});

//富文本 图片上传
router.post('/upload', function(req, res, next) {
	var form = new formidable.IncomingForm();
    //设置文件上传存放地址（需要先把这个文件夹，在项目中建好）
    form.uploadDir = "./public/upload/temp";

   form.maxFieldsSize = 20 * 1024 * 1024;//上传文件的最大大小
   // 执行里面的回调函数的时候，表单已经全部接收完毕了。
    form.parse(req, function(err, fields, files) {
            var oldpath = files.fileNames.path; //myFileName就是我们刚在前台模板里面配置的后台接受的名称；
            var extname = uuidv3(files.fileNames.name, uuidv3.DNS); //因为formidable这个时候存在我们刚路径上的，只是一个path，还没有具体的扩展名，如：2.png这样的
            //新的路径由组成：原父路径 + 拓展名
            var newpath = "./public/upload/temp/" + extname;
            //改名
            fs.rename(oldpath, newpath, function(err) { //把之前存的图片换成真的图片的完整路径
                if(err) {
                    res.send({errno:0,data: []}) //错误返回
                }else{
                    res.send({errno:0,data: ['/upload/temp/'+extname]}) //返回图片路径，让前端展示
				        }
            });
    });
});

router.post('/saveText', function(req, res, next) {
  // var arg = url.parse(req.body,true).query;
  var {id,txt}=req.body;
  console.log(id);
  var selectSQL = `update  t_goods_details SET details = '${txt}'  WHERE goods_id = ${id}`;
  conf.query(selectSQL,function(err,result){
      res.json({result:200});
    });
});
/***文档***/

//vue
router.get('/vue', function(req, res, next) {
  res.render('system/vue',{left:5});
});
//css
router.get('/css', function(req, res, next) {
  res.render('system/css',{left:6});
});
//其它
router.get('/else', function(req, res, next) {
  res.render('system/else',{left:7});
});


module.exports = router;
