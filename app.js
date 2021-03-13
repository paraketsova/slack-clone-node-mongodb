const express = require('express');
const app = express();
const path = require('path');

//==== DB ===//

const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://localhost:27017/slackClone');
const db = mongoose.connection;


app.get('/mdb', (request, response) => {
  const UserModel = require('./models/user');
  const ChannelModel = require('./models/channel');
  const MessageModel = require('./models/message');

  MessageModel
  .findOne({
    text: "My dog used to chase people on a bike a lot. It got so bad I had to take his bike away"
  })
  .exec((error, message) => {
    if (error) {
      return handleError(error);
    }

    console.log(message);
    response.render("index.ejs", message)
  }) 
  
});

db.on('error', error => {
  console.log(error)
  })



app.listen(3000);

//=============//
/*
//по умолчанию  приложение ищет статические файлы в папке /public
 app.use(express.static('public')); // serving static files (HTML, js, CSS)


app.get('/api/getChannels', function (request, response) {
  
  response.json(channels);
});

app.get('/api/getUser', function (request, response) {
  const user = ['Mariia', 'Paraketsova', 'ponka'];
  response.json(user);
});

app.get('/api/getMessages/:channelId', (request, response) => {
  const channelId = request.params.channelId; //use route parameters. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.
  response.json(messages.filter(message => message.channelId == channelId));
}) */