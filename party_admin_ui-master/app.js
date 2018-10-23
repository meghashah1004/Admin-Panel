// load the things we need
const express = require('express');  
const path = require('path');  
const request = require('request');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());  
const urlencodedParser = bodyParser.urlencoded({ extended: false });



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// view engine setup
app.set('view engine', 'ejs');
app.use(express.static('public'));


function fetch (url,req, res, next)
{
     request(url, function (err, response, body) {
    if(err){
      console.log(err);
       res.status(400).send("from front node js: "+err);
    } else {
                 console.log(response.body);
        res.status(200).send(response.body);
      }
          
    });
}
function update (url,urlencodedParser,req, res)
{
    request({
    url: url,
    method: "POST",
    json: req.body
}, function (err, response, body) {
    if(err){
      console.log(err);
       res.status(400).send("from modify node js: "+err);
    } else {
//         console.log(response.body);
        res.status(200).send(response.body);
      }
          
    });
}

app.get('/', function(req, res, next) {  
    res.render('pages/party_user_table');
});
//party_users api to fetch data in the datatable
app.get('/get', function(req, res, next) {  
    
     let url ='url';
    fetch(url,req,res,next);
   
  });
//party_users api to update data in the datbase
app.post('/post', urlencodedParser,function (req, res) {  
    console.log("users dataStr: ");
    let url ='url';
    update(url,urlencodedParser,req,res);
  });

app.get('/party_user_table', function(req, res, next) {  
    res.render('pages/party_user_table');
});


app.get('/party_trips_table', function(req, res, next) {  
    res.render('pages/party_trips_table');
});


app.get('/party_promo_table', function(req, res, next) {  
    res.render('pages/party_promo_table');
});



app.get('/party_commission_table', function(req, res, next) {  
    res.render('pages/party_commission_table');
});


app.get('/party_assigned_vehicle_details', function(req, res, next) {  
    res.render('pages/party_assigned_vehicle_details');
});


module.exports = app;


