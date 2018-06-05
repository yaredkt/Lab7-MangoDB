var createError = require('http-errors');
var express = require('express');
var mongo=require('mongoskin');
var crypto=require('crypto');
var algorithm='aes256';
var key='asaadsaad';

var db=mongo.db("mongodb://localhost:27017/mydb",{native_parser:true});

var app=express();

app.get('/secret',function(req,res)
{
    if(db)
    {
    db.bind('homework7');
    db.homework7.findOne({},function(err,doc)
    {
    console.log(doc.message);
    var decryptedMessage=decrypt(doc.message);
    res.send(decryptedMessage);
    }); 
    }       
          
    else{
        console.log("Error connecting to Database");
    }
    
});
function decrypt(text)
{
    var decipher=crypto.createDecipher(algorithm,key);
    return decipher.update(text,'hex','utf8')+ decipher.final('utf8');
}

app.listen(3000);
