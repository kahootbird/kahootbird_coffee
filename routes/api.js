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
    var post_or_get = null
    var collection = client.db("test")

    item_array = []

    if (req.query.type == 0)
      post_or_get = 0
    else if (req.query.type == 1)
      post_or_get = 1



      //console.log("read:" + read)
      //var z = read.length
      var zcount = 0
      console.log("read" + read)

console.log("POST OR GET: " + post_or_get)
      //Read data
      if (post_or_get == 0)
      {
        //Get data from DB
        collection.collection('author').insertOne({
            Authorid: 2,
            Author: "I am the author",
            Post: "MyPost"
        });
        res.render('api', { post: "added author", author: "added author" });
      }
      //Else write data
      else if (post_or_get == 1){
  //Read data from DB
  read = collection.collection('author').find({Authorid: 1})
  //read = collection.collection('author').find()
  console.log("read author")

  //Get the object size
  /*
  Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    //console.log("key is" + key + " STATE IS " + obj.hasOwnProperty(key))
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};
*/
        const myObj = {}
        //var size = Object.size(read);
        var size = 3
        console.log("SIZE TO READ IS:" + size)

        //Use object size to determine data to post
        var timeout_set = 0
        read.forEach(function(item, index)  {
        if (timeout_set == 0)
        {
          timeout_set = 1
          //set timeout not ideal on prod app over async/await but for this small-scale demo app it seems ok
          setTimeout(end_foreach,1000)
        }

        //z = read.length
        console.log("type " + typeof(item))
        item_array.push(item)
        //console.log("ITM: " + item)
        zcount++
        //console.log("REAL SIZE:" + zcount)

        function end_foreach()
        {
          var b = 0
          var str = []
          console.log("END FOREACH")
          for (var z in item_array)
          {
            b = 0
            console.log("ITEM ARRAY PUSHED")
            for(var i in item_array[z]){
              //console.log("DATA")
              console.log("I:" + i)
              console.log(item_array[z][i])
              //if (i != 0)

              //avoid author_id part with b variable
              if (b != 0)
              str.push(item_array[z][i])
              b++
          }
        }
          console.log("STR:" + str)
          res.render('api', { post: str, author: "" });
        }
        /*
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
        */
      })
    }
    else
    {
      console.log("API call failed")
      //res.render('api', { post: "", author: "API call failed" });
      res.json({post: "post1", post2: "post2", post3: "post3"})
    }
  });

//res.render('api', { post: req.query.post, author: res.query.post });
  //console.log(req.query.fname)
  //res.render('api', { post: req.query.post, author: item_array });
});

module.exports = router;
