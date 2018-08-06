/**
  产品路由
**/
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('goods/details',{a:1});
});

module.exports = router;
