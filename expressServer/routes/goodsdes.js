var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resourceaa123');
});

/* GET users listing. */
router.get('/b', function(req, res, next) {
  res.send('respond with a resourceaa');
});

module.exports = router;
