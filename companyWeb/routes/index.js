var express = require('express');
var conf = require('../conf/conf');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){

  // mysql.createSever({});
  res.render('index', { title: '企业网站搭建-云工作室' ,"b":false});
});
router.get('/banners', function(req, res, next) {
  res.render('index2', { title: '咕噜噜/banners' });
});

router.get('/a', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;
