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
    var post_or_get = 0
    var collection = client.db("test")

    item_array = []

    if (req.query.type == 0)
      post_or_get = 0
    else if (req.query.type == 1)
      post_or_get = 1
    else {
      post_or_get = 0
    }


      //console.log("read:" + read)
      //var z = read.length
      var zcount = 0
      console.log("read" + read)

console.log("POST OR GET: " + post_or_get)
      if (post_or_get == 0)
      {
        //Get data from DB
        collection.collection('author').insertOne({
            Authorid: 1,
            Author: "I am the author",
            Post: "MyPost"
        });
        res.render('api', { post: "added author", author: "added author" });
      }
      else {
  //Read data from DB
  read = collection.collection('author').find({Authorid: 1})
  console.log("read author")

  //Get the object size
  Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    //console.log("key is" + key + " STATE IS " + obj.hasOwnProperty(key))
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;

};

        const myObj = {}
        var size = Object.size(read);
        console.log("SIZE TO READ IS:" + size)

        //Use object size to determine data to post
        read.forEach(function(item, index)  {
        //z = read.length
        console.log("type " + typeof(item))
        item_array.push(item)
        console.log(item_array)
        zcount++
        console.log("REAL SIZE:" + zcount)
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
        //console.log(item)
      })

      //res.render('api', { post: req.query.post });
    }
  });

//res.render('api', { post: req.query.post, author: res.query.post });
  //console.log(req.query.fname)
  //res.render('api', { post: req.query.post, author: item_array });
});

module.exports = router;
