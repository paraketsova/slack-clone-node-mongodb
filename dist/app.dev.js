"use strict";

var express = require('express');

var app = express();

var path = require('path'); //по умолчанию  приложение ищет статические файлы в папке /public


app.use(express["static"]('public')); // serving static files (HTML, js, CSS)

app.get('/api/getChannels', function (request, response) {
  response.json(channels);
});
app.get('/api/getUser', function (request, response) {
  var user = ['Mariia', 'Paraketsova', 'ponka'];
  response.json(user);
});
app.get('/api/getMessages', function (request, response) {
  response.json(messages);
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
var messagesStorageA = [{
  "from": "Anna",
  "to": "Boris",
  "date": "1995-12-17T03:22:00",
  "text": "My dog used to chase people on a bike a lot. It got so bad I had to take his bike away."
}, {
  "from": "Boris",
  "to": "Carla",
  "date": "1995-12-17T03:23:00",
  "text": "What kind of magic do cows believe in? MOODOO."
}, {
  "from": "Carla",
  "to": "Dastin",
  "date": "1995-12-17T03:24:00",
  "text": "What do you call someone with no nose? Nobody knows."
}];
var messagesStorageB = [{
  "from": "Babba",
  "to": "Cirano",
  "date": "1996-12-17T03:22:00",
  "text": "Your dog used to chase people on a bike a lot. It got so bad I had to take his bike away."
}, {
  "from": "Cirano",
  "to": "Dimitriy",
  "date": "1996-12-17T03:23:00",
  "text": "Do you know what kind of magic do cows believe in? MOODOO."
}, {
  "from": "Dimitriy",
  "to": "Elena",
  "date": "1996-12-17T03:24:00",
  "text": "Ou! What do you call someone with no nose? Nobody knows."
}];
var messagesStorageC = [{
  "from": "Carabas",
  "to": "Dinamo",
  "date": "1997-12-17T03:22:00",
  "text": "His dog used to chase people on a bike a lot. It got so bad I had to take his bike away."
}, {
  "from": "Dinamo",
  "to": "Elanius",
  "date": "1997-12-17T03:23:00",
  "text": "Does he know what kind of magic do cows believe in? MOODOO."
}, {
  "from": "Elanius",
  "to": "Alba",
  "date": "1997-12-17T03:24:00",
  "text": "AAA! What do you call someone with no nose? Nobody knows."
}];

function getFakeMessages(storageX) {
  return storageX;
}

var messages = getFakeMessages(messagesStorageA); //TEST for one channel