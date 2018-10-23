const app = require('./app');  
const port = 9123;



var server = app.listen(port,'localhost', function () {
    console.log("D");
   var host = server.address().address;
   var port = server.address().port;  
   console.log("Express Server is running.. on   http://%s:%s", host, port);

});
