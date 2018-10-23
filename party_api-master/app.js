const Pool = require('pg-pool');
const express = require('express');
const app = express();
const selector=require('./select');
const updator=require('./update');
const bodyParser = require('body-parser');
const moment = require('moment-timezone');
var now =moment();

app.use(bodyParser.json());  
const urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));


var config = {
  user: 'user',
    host:'host',
  database: 'database', 
  password: 'password', 
  port: 5432, 
  max: 10, 
  idleTimeoutMillis: 30000,
};

var pool = new Pool(config);

app.post('/', function(req, res){
    res.write('hexa');
});

async function fetch (queryStr,req,res)
{
    await pool.connect(  async function(err,client,done) {
        
       if(err){
           console.log("not able to get connection "+ err);
           res.status(400).send("not able to get connection "+err);
       } 
        await client.query(queryStr, function(err,result) {
            done(); // closing the connection;
           if(err){
               console.log(err);
               res.status(400).send("from query: "+err);
           }
           console.log(result);
           res.status(200).send(result);
       });
    });
    req.on('end', function () {
        res.end('Done');
        console.log('Done');
    });
}


async function update (queryStr,values,json_obj,req,res)
{
    await pool.connect(function(err,client,done) {
       if(err){
           console.log("not able to get connection "+ err);
           res.status(400).send("not able to get connection "+err);
       } 
       client.query(queryStr,values,function(err,result) {
           done(); // closing the connection;
           if(err){
               console.log(err);
               res.status(400).send("from query: "+err);
               console.log("error in updation");
           }
            res.status(200).send(json_obj);

       });
    });
    req.on('end', function () {
        res.end('Done');
        console.log('Done');
    });
}
app.get('/fetchusers',   function (req, res) {
    
     console.log("get users ");
    fetch(selector.userQuery,req,res);
});

app.post('/updateusers', urlencodedParser, function (req, res) {
    console.log(" update users");
    var json_obj=req.body;
//    console.log(json_obj);
    var lastModifiedBy = now.tz('Asia/Calcutta').format('YYYY-MM-DD HH:mm:ss');
    var values=[json_obj.status,json_obj.subscription,lastModifiedBy,119,json_obj.id];
    
    update(updator.userUpdate,values,json_obj,req,res);
});

app.get('/fetchtrips', function (req, res) {
      console.log(" get trips");
   fetch(selector.tripsQuery,req,res);
});

app.post('/updatetrips', urlencodedParser, async function (req, res) {
    console.log(" update trips");
    var json_obj=req.body;
//    console.log(json_obj);
    
    var lastModifiedAt = now.tz('Asia/Calcutta').format('YYYY-MM-DD HH:mm:ss');
    var num_days=json_obj.num_days;
    if(num_days=="")
        num_days='0';
   
    var values=[json_obj.id,
                json_obj.pickup_location,
                json_obj.drop_location,
                json_obj.pickup_date,
                json_obj.pickup_time,
                json_obj.car_type,
                json_obj.num_seats,
                json_obj.is_return_trip,
                json_obj.avg_distance,
                json_obj.avg_duration,
                json_obj.avg_fare,
                json_obj.fare_with_toll,
                json_obj.fare_without_toll,
                json_obj.promo_code,
                json_obj.booking_type,
                json_obj.status,
                lastModifiedAt,
                119 ,
                json_obj.waypoints,
                num_days];

    update(updator.tripUpdate,values,json_obj,req,res); 
    
});

app.get('/fetchpromos',   function (req, res) {
     console.log("get promos");
    fetch(selector.promoQuery,req,res);
});

app.post('/updatepromos', urlencodedParser, function (req, res) {
      console.log("modify promos");
    var json_obj=req.body;
//    console.log(json_obj);
    var lastModifiedAt = now.tz('Asia/Calcutta').format('YYYY-MM-DD HH:mm:ss');
    
    var values=[json_obj.id,json_obj.promo_code, json_obj.promo_percentage,json_obj.promo_category,json_obj.status,lastModifiedAt, 119 ];
        
    update(updator.promoUpdate,values,json_obj,req,res);
});

app.get('/fetchcommission',  function (req, res) {
     console.log("get commission");
    fetch(selector.commissionQuery,req,res);
});

app.post('/updatecommission', urlencodedParser, function (req, res) {
      console.log("modify commission");
    var json_obj=req.body;
    var lastModifiedAt = now.tz('Asia/Calcutta').format('YYYY-MM-DD HH:mm:ss');
    
    var values=[json_obj.total_trip_amount,json_obj.percentage_commission,
     json_obj.amount_to_be_paid, json_obj.payment_status,
     json_obj.payment_mode,json_obj.account_information,
     json_obj.status,lastModifiedAt, 119,json_obj.id ];
        
    update(updator.commissionUpdate,values,json_obj,req,res);
});

app.get('/fetchvehicledetails', async function (req, res) {
    
    console.log("get vehicle");
    fetch(selector.vehicleQuery,req,res);

});

app.post('/updatevehicledetails',urlencodedParser,function (req, res) {
    

    console.log("modify vehicle");
    var json_obj=req.body;
    var lastModifiedAt = now.tz('Asia/Calcutta').format('YYYY-MM-DD HH:mm:ss');
    
    var values=[parseInt(json_obj.id),json_obj.license_plate,
                json_obj.driver_name,json_obj.driver_contact_number,json_obj.owner_name,json_obj.owner_contact_number,
                parseInt(json_obj.status),lastModifiedAt,119]
        
    update(updator.vehicleUpdate,values,json_obj,req,res);

});

app.post('/insert_vehicle_details',urlencodedParser,function (req, res) {
    
    var json_obj=req.body;
    console.log("insert record for vehicle: ");
    console.log(req);
    console.log(JSON.stringify(json_obj));    
        
    pool.connect(function(err,client,done) {
       if(err){
           console.log("not able to get connection "+ err);
           res.status(400).send(err);
       }
        
    var license_plate = json_obj.license_plate;
    var driver_name = json_obj.driver_name;
    var driver_contact_number = json_obj.driver_contact_number;
    var owner_name = json_obj.owner_name;
    var owner_contact_number = json_obj.owner_contact_number;
    var status = 0;
    var party_trip_id = json_obj.party_trip_id;
        
        
    var created_by = 119;
    var last_modified_by = 119;
    var last_modified_at = now.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
    var created_at = last_modified_at;    
        
   var queryStr="INSERT INTO assigned_vehicle_details VALUES (DEFAULT,($1),($2),($3),($4),($5),($6),($7),($8),($9),($10),($11))";
     client.query(queryStr,[license_plate,driver_name,driver_contact_number,owner_name,owner_contact_number,created_by,created_at,last_modified_by,last_modified_at,status,party_trip_id],function(err,result) {
          
         //call `done()` to release the client back to the pool
           done(); 
           if(err){
               console.log(err);
               res.status(400).send("from query: "+err);
           }
            console.log(result);
            res.status(200).send(json_obj);
//            send(result);
       });
    });
    function send (sendUpdate) {
        res.send(sendUpdate);
    }
    req.on('end', function () {
        res.end('Done');
        console.log('Done');
    });
});

module.exports=app;
