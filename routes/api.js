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
      //console.log("read:" + read)
      var z = read.length
      var zcount = 0
      console.log("read" + read)

  Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  //console.log("KEY " + key)
  return size;
};

        const myObj = {}
        var size = Object.size(read);
        read.forEach(function(item, index)  {
        z = read.length
        console.log("TPYE " + typeof(item))
        item_array.push(item)
        console.log(item_array)

        zcount++
        //console.log (read)
        if (zcount == size)
        {
          var str = []
          for(var i in item_array[0]){
            console.log("DATA")
            console.log(i)
            console.log(item_array[0][i])
            str.push(item_array[0][i])
          }
          console.log("ARRAY " + item_array)
          //render
          console.log("RENDERING ITEM ARRAY: " + item_array[0])
          res.render('api', { post: req.query.post, author: str });
          console.log("END FOREACH")
        }
      })


  });

  //console.log(req.query.fname)
  //res.render('api', { post: req.query.post, author: item_array });
});

module.exports = router;
