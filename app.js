//test commit
require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dashboardRouter = require('./routes/dashboard');
var storeRouter = require('./routes/store');
var apiRouter = require('./routes/api');


var login = require('./routes/login');
const {v4: uuidv4} = require("uuid")
var app = express();

/*
PASSPORT
*/
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const bodyparser = require("body-parser")

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
/*
const session = require("express-session")
app.use(session({
  secret: uuidv4(),
  resave: false,
  saveUninitalized: true
}));
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//console.log(process.env.SESSION_SECRET)

console.log(process.env.uri)
//MONGODB


var read


const { MongoClient } = require('mongodb');
const uri = process.env.uri;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log("CONNECTED")
  //const collection = client.db("test").collection("devices");
  var collection = client.db("test")

/*
    collection.collection('author').insertOne({
        Authorid: 1,
        Author: "I am the author",
        Post: "MyPost"
    });
*/
    //console.log(collection.Employee.find({Employeeid :2 }))
    //read = collection.collection('Employee').find();
    //read = collection.collection('employees').find({Employeeid: 2})
    console.log("read:" + read)
  // perform actions on the collection object
  //client.close();
});

function show_find()
{
  console.log("read: " + read)
/*
read.forEach(item => {
  console.log(item)
})
*/
}
setTimeout(show_find,5000)
/*
var MongoClient = require('mongodb').MongoClient;
var url = process.env.uri;

MongoClient.connect(url, function(err, db) {

    db.collection('employees').insertOne({
        Employeeid: 4,
        EmployeeName: "NewEmployee"
    });
});
*/




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', login);
app.use('/dashboard', dashboardRouter);
app.use('/store', storeRouter);
app.use('/api', apiRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
