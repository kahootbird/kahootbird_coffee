var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query.fname)
  res.render('index', { post: req.query.post, author: req.query.author });
});

module.exports = router;
