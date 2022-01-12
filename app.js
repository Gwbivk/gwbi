const express =require("express")
const path =require("path")

const app =express()
const mongoose = require('mongoose');
const bodyparser = require( "body-parser")
mongoose.connect('mongodb://localhost/vircontact');


const port =80;
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