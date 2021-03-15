"use strict";

var express = require('express');

var app = express();

var path = require('path'); //??


var async = require("async"); //??
//==== DB ===//


var mongoose = require('mongoose');

var connection = mongoose.connect('mongodb://localhost:27017/slackClone', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('connected...');
})["catch"](function (err) {
  return console.log(err);
});
var db = mongoose.connection;
db.on('error', function (error) {
  console.log(error);
});

var UserModel = require('./models/user');

var ChannelModel = require('./models/channel');

var MessageModel = require('./models/message');

app.use(express["static"](__dirname + "/public"));
app.get('/mdb', function (request, response) {
  ChannelModel.find().exec(function (error, channels) {
    if (error) {
      return handleError(error);
    }

    MessageModel.find().populate(['channel', 'user']) //populates the channel id with actual channel info
    .exec(function (error, messages) {
      if (error) {
        return handleError(error);
      }

      console.log(messages);
      response.render("index.ejs", {
        channels: channels,
        messages: messages
      });
    });
  });
}); //====================//

app.get('/api/getChannels', function (request, response) {
  response.json(channels);
});
app.get('/api/getUser', function (request, response) {
  var user = ['Mariia', 'Paraketsova', 'ponka'];
  response.json(user);
});
app.get('/api/getMessages/:channelId', function (request, response) {
  var channelId = request.params.channelId; //use route parameters. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.

  MessageModel.find({
    'name.last': 'Ghost'
  }, 'name occupation', function (err, person) {
    if (err) return handleError(err); // Prints "Space Ghost is a talk show host".

    console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation);
  }); //======?????
  // const messages = db.get('messages');
  // const channels = db.get('channels');

  /*  ChannelModel
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
  */
  //====????

  response.json(messages.filter(function (message) {
    return message.channel == channelId;
  }));
});
app.listen(3000);