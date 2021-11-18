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
      //Delete record
    else if (req.query.type == 2)
      post_or_get = 2

      var zcount = 0
      console.log("read" + read)
      console.log("POST OR GET: " + post_or_get)
      //Read data
      if (post_or_get == 0)
      {
        let author = ""
        let post = ""
        if (req.query.author != null)
        author = req.query.author
        if (req.query.post != null)
        post = req.query.post;
        //Get data from DB
        collection.collection('author').insertOne({
            Authorid: 1,
            Author: author,
            Post: post
        });
        res.render('api', { post: "added author", author: "added author" });
      }
      //Else write data
  else if (post_or_get == 1)
  {

/*
    var db_empty = 0
    collection.count(function (err, count) {
    if (!err && count === 0) {
        db_empty = 1
    }
  })
    if (db_empty == 1)
    {
    console.log("NOT EMPTY")
    }
    else {
      console.log("EMPTY")
    }
    */
    //Read data from DB

    var is_empty = false
    z = collection.collection('author').find({Authorid: 1})
    z.count(function (err, count) {
      console.log("COUNTbbbb" + count)

      if (count == 0)
      {
      is_empty = true
      console.log("SET TO TRUE - EMPTY")
      res.json({none: ""})
      console.log("RENDERED")
      }
      else {
        console.log("SET TO FALSE - NOT EMPTY")
      }
});

//is_empty = true

/*
    test = collection.collection('author').find({Authorid: 1})
    test.forEach(function(item, index)  {
      console.log("ITEMSb:" + item + " " + index)

    })
*/

    read = collection.collection('author').find({Authorid: 1})
    //read = collection.collection('author').find()
    console.log("read author")
        const myObj = {}
        //var size = Object.size(read);
        var size = 3
        console.log("SIZE TO READ IS:" + size)
        //Use object size to determine data to post
        var timeout_set = 0
        console.log("READ" + read.length)


        read.forEach(function(item, index)  {
          console.log("FOREACH START")
        if (timeout_set == 0)
        {

          timeout_set = 1
          //set timeout not ideal on prod app over async/await but for this small-scale demo app it seems ok
          setTimeout(end_foreach,1000)

        }
        console.log("type " + typeof(item))
        item_array.push(item)
        //console.log("ITM: " + item)
        zcount++
        //console.log("REAL SIZE:" + zcount)

        function end_foreach()
        {
          var b = 0
          var str = []
          let auth_str = []
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
        //author
          //console.log("STR:" + str[1] + ", " + str[4] + ", " + str[8])

          console.log("STR:" + str)
          console.log("STR0 " +str[0])
          //res.render('api', { post: str, author: "" });
          if (is_empty == false)
          {
          res.json({post: str[2], post2: str[5], post3: str[8], author: str[1], author2: str[4], author3: str[8]})
          }
          else {
            console.log("NOT EMPTY")
          }
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
    else if (post_or_get == 2)
    {
      if (req.query.id == null)
      console.log("NO ID GIVEN")
      var id = parseInt(req.query.id)
      if (Number.isInteger(id))
      {
          console.log("ID IS INTEGER:" + id)
          var myquery = { Authorid: id }
          read = collection.collection('author').deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          console.log("1 document deleted");
          //db.close();
        });
      }
      else
      {
        console.log("ID NOT INT")
      }

      //console.log("ID IS:" + id)
      console.log("Delete API for record")
      //read = collection.collection('author').find({Authorid: 1})
      res.render('api', { post: "Delete_request", author: "Delete_request" });
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
