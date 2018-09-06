var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/a', function(req, res, next) {
  res.send('respond with a resourceaa');
});

/* GET users listing. */
router.get('/b', function(req, res, next) {
  res.send('respond with a resourceaa');
});

module.exports = router;
