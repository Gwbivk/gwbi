const express =require("express")
const path =require("path")

const app =express()
const mongoose = require('mongoose');
const bodyparser = require( "body-parser")

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var Pusher = require('pusher');


var pusher = new Pusher({

  appId: '<1328106>',
  key: '<d682cae98fca50915cc7>',
  secret: '<e5367dd372643f71de04>',
  cluster: 'ap2',
  encrypted: true
});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/comment', function(req, res){
  console.log(req.body);
  var newComment = {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment
  }
  pusher.trigger('flash-comments', 'new_comment', newComment);
  res.json({  created: true });
});

// Error Handler for 404 Pages
app.use(function(req, res, next) {
    var error404 = new Error('Route Not Found');
    error404.status = 404;
    next(error404);
});

module.exports = app;




mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/vircontact',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
  );


const port = process.env.PORT || 80;
// define mongoose schemas
var contactSchema = new mongoose.Schema({ 
    name: String ,
    email: String, 
    phone: String ,
    amount: String,
    describe: String
  });
  var contact = mongoose.model('contact', contactSchema);








app.use('/static',express.static('static'))
 app.use(express.urlencoded())

//pug specific stuff
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))


//endpoints
app.get('/',(req,res)=>{
    const params ={}
    res.status(200).render('home.pug',params);

})

app.get('/contact',(req,res)=>{
    const params ={}
    res.status(200).render('contact.pug',params);

})


app.post('/contact', (req,res)=>{
    var  myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("this oder has been saved ")
       
     })
    
 })
 
app.listen(port,() => {
    console.log(`the application started successfuly on port${port}`);
})