var express = require('express');
var router = express.Router();

/* GET home page. */

//Test getting routate at ID
/*
router.get('/id/:id', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
*/

router.get('/', function(req, res, next) {
  res.render('store', { title: 'Express' });
});




module.exports = router;
