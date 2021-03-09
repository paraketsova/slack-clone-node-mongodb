"use strict";

var express = require('express');

var app = express();

var path = require('path'); //по умолчанию  приложение ищет статические файлы в папке /public


app.use(express["static"]('public')); // serving static files (HTML, js, CSS)

app.get('/api/getChannels', function (request, response) {
  var channels = ['aaa', 'bbb', 'ccc'];
  response.json(channels);
});
app.listen(3000);