const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { Console } = require('console');
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.listen(process.env.PORT || 3000, function(){
    console.log("server up");
})

app.get("/", function(req , res){
    res.sendFile(__dirname + "/signup.html");
    
})
app.post("/" ,function(req ,res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  console.log(req.body);
  
  const data = {
    members : [
      {
        email_address : email,
        status : "subscribed",
        merge_fields :{
          FNAME : firstName,
          Lname : lastName,
        }
      }


    ]
  }
  
  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/7fb158384d";
  const options = {
    method : "POST",
    auth : "arpit:711ae33c06fd6a62cb3e4e9efc9e30e8-us14"
  }
  const request = https.request(url , options , function(response){

    response.on("data", function(data){
      console.log(JSON.parse(data));
      
    })
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/sucess.html");
    }
    else{
      res.sendFile(__dirname + "/faliure.html");

    }
    
  })
  request.write(jsonData);
  request.end();
  
})

app.post("/faliure",function(req,res){
  res.redirect("/");
})
app.post("/sucess",function(req,res){
  res.redirect("/");
})



// api Key
// 711ae33c06fd6a62cb3e4e9efc9e30e8-us14

// audiance id
// 7fb158384d.