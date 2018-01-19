var express = require('express');
var app = express();
var url = require('url');
var path = require('path');

app.use(express.static('public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');


var router = express.Router();

app.get('/', function(req, res) {
  //console.log('test');
  //console.log(req.originalUrl);
    res.render('index', { date: new Date().toDateString()});
});
  

app.use(function (req, res) {
  //console.log(url.parse(req.url));
  var pathname = url.parse(req.url).pathname;
  //Take the extra slash off from the pathname
  pathname = pathname.substring(1, pathname.length);
  //console.log('pathname: ' + pathname);
  
  var unixStr = null;
  var naturalStr = null;
  var strftime = require('strftime');
  
  
  if (pathname) {    
    
    //Strip spaces of %20
    pathname = decodeURIComponent((pathname+'').replace(/\+/g, '%20'));
    var date = new Date(pathname);
    var natDate = new Date(pathname * 1000);
    
    console.log('pathname: ' + pathname);
    console.log('date: ' + date);
    console.log('natDate: ' + natDate);
    
    if (date.getTime() > 0){
      //It's a natural date
      naturalStr = strftime('%B %d, %Y', date);
      unixStr = Math.round(date.getTime(pathname)/1000);
    }  
    
    else if (natDate.getTime() > 0){         
       //It's a unix timestamp:
       unixStr = pathname;      
       naturalStr = strftime('%B %d, %Y', natDate);
    }

    var timeStamps = {
      'unix' : unixStr,
      'natural' : naturalStr    
    };
    
    //res.send(pathname);
    res.send(timeStamps);    
  }  
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
