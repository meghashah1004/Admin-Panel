exports.connectToDb=function ( qryStr)
{
    console.log("query: "+qryStr)
    client.query(qryStr, function(err,result) {
            done(); // closing the connection;
           if(err){
               console.log(err);
              
               res.status(400).send("from query: "+err);
           }
           console.log(result);
            console.log("B");
               console.log("B3");
           return result;
       });
};