const express = require('express');
const app = express();
const path = require('path'); //??
var async = require("async"); //??


//==== DB ===//

const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://localhost:27017/slackClone');
const db = mongoose.connection;


app.get('/mdb', (request, response) => {
  const UserModel = require('./models/user');
  const ChannelModel = require('./models/channel');
  const MessageModel = require('./models/message');

  ChannelModel
  .find()
  .exec((error, channels) => {
    if (error) {
      return handleError(error);
    }
    MessageModel
    .find()
    .populate(['channel', 'user']) //populates the channel id with actual channel info
    .exec((error, messages) => {
      if (error) {
        return handleError(error);
      }

      console.log(messages);
      response.render("index.ejs", {channels, messages})
    })
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