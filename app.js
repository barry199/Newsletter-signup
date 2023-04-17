const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html')
})


app.post('/', function(req, res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;


  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data)

  const url = "https://us21.api.mailchimp.com/3.0/lists/baf16e927e";

  const options = {
    method: "POST",
    auth:"barcode:b92763d493c57a15c4f48fd2c0d7e2b4-us2"
  }

  const request =  https.request(url, options, function(response){
      response.on('data', function(data){
        if(response.statusCode === 200){
          res.sendFile(__dirname + '/success.html')
        }else{
          res.sendFile(__dirname + '/failure.html')
        }
        console.log(JSON.parse(data))
      })
  })
    request.write(jsonData);
    request.end();
});



//Api key
//db917b54976c4b3b0f1bcc741a53e711-us21

//Audience id
//baf16e927e

app.post('/failure', function(req, res){
    res.redirect('/')
})

app.listen(process.env.PORT || 3000, function(){
  console.log('server running....')
})


