const express = require('express');
const app = express();
const path = require('path');

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/public/html/index.html'));
});

app.get('/api/getChannels', function (request, response) {
  const channels = ['aaa', 'bbb', 'ccc'];
  response.json(channels);
});

app.listen(3000);