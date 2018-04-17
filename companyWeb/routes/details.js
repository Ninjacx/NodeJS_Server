var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/d', function(req, res, next) {
  res.send('details');
});

module.exports = router;
