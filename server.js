//place where we configure different routes

const express = require('express');
const hbs =require('hbs');
const fs= require('fs');
// new express app
//no arguments needed
var app = express();

hbs.registerPartials(__dirname+'/views/partials');

//key is the value u wanna set and the value is what u wanna use
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

//done to register middleware
//takes a fn
//next is used to exit the middleware
app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`

  console.log(log);
  fs.appendFile('server.log',log + '\n', (err)=>{
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});
app.use((req,res,next)=>{
  res.render('maintainence.hbs');
});
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear()
});

//set up http route handlers
//register a handlers
//two arguments: the url and the fucntion to run
app.get('/', (req,res)=>{
  //response for http request
  res.send({
    name:'Chanchev',
    likes:[
      'Biking',
      'Cities'
    ]
  });
});

app.get('/about',(req,res)=>{
  //res.send('About page');
  res.render('about.hbs',{
    pageTitle:'About page',
  });
});

app.get('/bad',(req,res)=>{
  res.send('Error handling request');
});
//binds application to a port on machine
//takes a second argument
app.listen(3000, ()=>{
  console.log('Server is up');
});
