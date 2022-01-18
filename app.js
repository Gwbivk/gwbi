const express =require("express")
const path =require("path")

const app =express()
const mongoose = require('mongoose');
const bodyparser = require( "body-parser");
const { Router } = require("express");

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
// app.get('/',(req,res)=>{
//     const params ={}
//     res.status(200).render('home.pug',params);

// })
// app.get('/com',(req,res)=>{
//     const params ={}
//     res.status(200).render('com.pug',params);

// })

// app.get('/contact',(req,res)=>{
//     const params ={}
//     res.status(200).render('contact.pug',params);

// })


// app.post('/contact', (req,res)=>{
//     var  myData = new contact(req.body);
//     myData.save().then(()=>{
//         res.send("this oder has been saved ")
       
//      })
    
//  })

app.use('/static',express.static('static'))
 app.use(express.urlencoded())

//pug specific stuff
app.set('view engine','html')
app.set('views',path.join(__dirname,'views'))


//endpoints
// app.get('/',(req,res)=>{
//     // const params ={}
//     res.status(200).render('index.html');
app.get('/',function(req,res) {
//  const params ={}
     res.sendfile('./views/index.html');

})
app.get('/com',(req,res)=>{
    const params ={}
    res.status(200).render('com.pug',params);

})


//uncom
// router.get('/',function(req,res) {
//     res.sendfile(path.join(__dirname+'/index.html'));

// })
// app.get('/com',(req,res)=>{
//     const params ={}
//     res.status(200).render('com.pug',params);

// })

// app.get('/contact',(req,res)=>{
//     // const params ={}
//     res.status(200).render('contact.html');

// })

app.get('/contact',function(req,res) {
    //  const params ={}
         res.sendfile('./views/contact.html');
    
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