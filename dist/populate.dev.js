#! /usr/bin/env node
"use strict";

console.log('This script populates '); // Get arguments passed on command line

var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

var async = require('async');

var User = require('./models/user');

var Channel = require('./models/channel');

var Message = require('./models/message');

var mongoose = require('mongoose');

var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var users = [];
var channels = [];
var messages = [];

function userCreate(username, firstname, lastname, cb) {
  userdetail = {
    username: username,
    firstname: firstname,
    lastname: lastname
  };
  var user = new User(userdetail);
  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log('New User: ' + user);
    users.push(user);
    cb(null, user);
  });
}

function channelCreate(name, cb) {
  var channel = new Channel({
    name: name
  });
  channel.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log('New Channel: ' + channel);
    channels.push(channel);
    cb(null, channel);
  });
}

function messageCreate(user, channel, timestamp, text, cb) {
  messagedetail = {
    user: user,
    channel: channel,
    timestamp: timestamp,
    text: text
  };
  if (user != false) messagedetail.user = user;
  if (channel != false) messagedetail.channel = channel;
  var message = new Message(messagedetail);
  message.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log('New Message: ' + message);
    messages.push(message);
    cb(null, message);
  });
}

function createUsersChannels(cb) {
  async.series([function (callback) {
    userCreate('AnnaB', 'Anna', 'Bothfuss', callback);
  }, function (callback) {
    userCreate('BorisC', 'Boris', 'Cova', callback);
  }, function (callback) {
    userCreate('CarlaD', 'Carla', 'Dmitrov', callback);
  }, function (callback) {
    userCreate('BobD', 'Babba', 'Crichevsky', callback);
  }, function (callback) {
    userCreate('CiranoD', 'Cirano', 'de Bergerac', callback);
  }, function (callback) {
    userCreate('DimitriyE', 'Dimitriy', 'Essensson', callback);
  }, function (callback) {
    userCreate('CalipsoD', 'Calipso', 'Dyesy', callback);
  }, function (callback) {
    userCreate('DrontE', 'Dront', 'Eliminatus', callback);
  }, function (callback) {
    userCreate('ElenaA', 'Elena', 'Aconit', callback);
  }, function (callback) {
    channelCreate('channel_1', callback);
  }, function (callback) {
    channelCreate('channel_2', callback);
  }, function (callback) {
    channelCreate('channel_3', callback);
  }], // optional callback
  cb);
}

function createMessages(cb) {
  async.parallel([function (callback) {
    messageCreate(users[0], channels[0], "2021-03-02 13:14:51", "My dog used to chase people on a bike a lot. It got so bad I had to take his bike away", callback);
  }, function (callback) {
    messageCreate(users[1], channels[1], "2021-03-02 13:14:52", "What kind of magic do cows believe in? MOODOO.", callback);
  }, function (callback) {
    messageCreate(users[2], channels[2], "2021-03-02 13:14:55", "What do you call someone with no nose? Nobody knows.", callback);
  }, function (callback) {
    messageCreate(users[3], channels[0], "2021-03-03 14:14:51", "Did you hear the one about the guy with the broken hearing aid? Neither did he.", callback);
  }, function (callback) {
    messageCreate(users[4], channels[1], "2021-03-03 14:14:52", "What do you call a fly without wings? A walk.", callback);
  }, function (callback) {
    messageCreate(users[5], channels[2], "2021-03-03 14:14:55", "How many optometrists does it take to change a light bulb? 1 or 2? 1... or 2? do you call someone with no nose? Nobody knows.", callback);
  }, function (callback) {
    messageCreate(users[7], channels[0], "2021-03-04 14:14:51", "I used to work for a soft drink can crusher. It was soda pressing.", callback);
  }, function (callback) {
    messageCreate(users[8], channels[1], "2021-03-04 14:14:52", "I went to the zoo the other day, there was only one dog in it. It was a shitzu.", callback);
  }, function (callback) {
    messageCreate(users[0], channels[2], "2021-03-04 14:14:55", "Why are skeletons so calm? Because nothing gets under their skin.", callback);
  }, function (callback) {
    messageCreate(users[1], channels[0], "2021-03-05 14:14:51", "What did celery say when he broke up with his girlfriend? She wasn't right for me, so I really don't carrot all.", callback);
  }, function (callback) {
    messageCreate(users[2], channels[1], "2021-03-05 14:14:52", "I gave all my dead batteries away today, free of charge.", callback);
  }, function (callback) {
    messageCreate(users[3], channels[2], "2021-03-05 14:14:55", "Do you know where you can get chicken broth in bulk? The stock market.", callback);
  }], // optional callback
  cb);
}

async.series([createUsersChannels, createMessages], // Optional callback
function (err, results) {
  if (err) {
    console.log('FINAL ERR: ' + err);
  } else {
    console.log('Messages: ' + messages);
  } // All done, disconnect from database


  mongoose.connection.close();
});