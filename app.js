const express = require('express');
const app = express();
const path = require('path');

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/public/html/index.html'));
});



app.listen(3000);