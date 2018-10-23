const app = require('./app');  
const port = 4000;

var server = app.listen(port,'localhost', function () {
    console.log("D");
   var host = server.address().address;
   var port = server.address().port;  
   console.log("Express server listening at http://%s:%s", host, port);

});