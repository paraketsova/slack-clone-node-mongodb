"use strict";

var express = require('express');

var app = express();

var path = require('path'); //==== DB ===//


var mongoose = require('mongoose');

var connection = mongoose.connect('mongodb://localhost:27017/slackClone');
var db = mongoose.connection;
app.get('/mdb', function (request, response) {
  var UserModel = require('./models/user');

  var ChannelModel = require('./models/channel');

  var MessageModel = require('./models/message');

  response.render('index.ejs');
});
db.on('error', function (error) {
  console.log(error);
}); //=============//
//по умолчанию  приложение ищет статические файлы в папке /public

app.use(express["static"]('public')); // serving static files (HTML, js, CSS)

app.get('/api/getChannels', function (request, response) {
  response.json(channels);
});
app.get('/api/getUser', function (request, response) {
  var user = ['Mariia', 'Paraketsova', 'ponka'];
  response.json(user);
});
app.get('/api/getMessages/:channelId', function (request, response) {
  var channelId = request.params.channelId; //use route parameters. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.

  response.json(messages.filter(function (message) {
    return message.channelId == channelId;
  }));
});
app.listen(3000); //--Fake channels, messages storage--//

var channels = [{
  "id": "1",
  "name": "aaa",
  "description": "This is a A channel"
}, {
  "id": "2",
  "name": "bbb",
  "description": "This is a B channel"
}, {
  "id": "3",
  "name": "ccc",
  "description": "This is a C channel"
}];
var messages = [{
  "id": "001",
  "channelId": "1",
  "from": "Anna",
  "to": "Boris",
  "date": "1995-12-17T03:22:00",
  "text": "My dog used to chase people on a bike a lot. It got so bad I had to take his bike away."
}, {
  "id": "002",
  "channelId": "1",
  "from": "Boris",
  "to": "Carla",
  "date": "1995-12-17T03:23:00",
  "text": "What kind of magic do cows believe in? MOODOO."
}, {
  "id": "003",
  "channelId": "1",
  "from": "Carla",
  "to": "Dastin",
  "date": "1995-12-17T03:24:00",
  "text": "What do you call someone with no nose? Nobody knows."
}, {
  "id": "004",
  "channelId": "2",
  "from": "Babba",
  "to": "Cirano",
  "date": "1996-12-17T03:22:00",
  "text": "Your dog used to chase people on a bike a lot. It got so bad I had to take his bike away."
}, {
  "id": "005",
  "channelId": "2",
  "from": "Cirano",
  "to": "Dimitriy",
  "date": "1996-12-17T03:23:00",
  "text": "Do you know what kind of magic do cows believe in? MOODOO."
}, {
  "id": "006",
  "channelId": "2",
  "from": "Dimitriy",
  "to": "Elena",
  "date": "1996-12-17T03:24:00",
  "text": "Ou! What do you call someone with no nose? Nobody knows."
}, {
  "id": "007",
  "channelId": "3",
  "from": "Carabas",
  "to": "Dinamo",
  "date": "1997-12-17T03:22:00",
  "text": "His dog used to chase people on a bike a lot. It got so bad I had to take his bike away."
}, {
  "id": "008",
  "channelId": "3",
  "from": "Dinamo",
  "to": "Elanius",
  "date": "1997-12-17T03:23:00",
  "text": "Does he know what kind of magic do cows believe in? MOODOO."
}, {
  "id": "009",
  "channelId": "3",
  "from": "Elanius",
  "to": "Alba",
  "date": "1997-12-17T03:24:00",
  "text": "AAA! What do you call someone with no nose? Nobody knows."
}];