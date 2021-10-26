var express = require('express');
var router = express.Router();

/* GET home page. */
var read
const { MongoClient } = require('mongodb');
const uri = process.env.uri;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var item_array = []

router.get('/', function(req, res, next) {

  client.connect(err => {
    item_array = []
    console.log("CONNECTED")
    var collection = client.db("test")
      read = collection.collection('employees').find({Employeeid: 2})
      console.log("read:" + read)
      var z = read.length
      var zcount = 0

      read.forEach(item => {
        z = read.length
        item_array.push(item)
        //console.log(item_array[0])
        zcount++
        console.log (read)
        if (zcount == z)
        console.log("END FOREACH")
        //console.log(item)
      })
      console.log("RENDERING ITEM ARRAY: " + item_array[0])
      res.render('api', { post: req.query.post, author: item_array[0] });
  });


  //console.log(req.query.fname)
  //res.render('api', { post: req.query.post, author: item_array });
});

module.exports = router;
