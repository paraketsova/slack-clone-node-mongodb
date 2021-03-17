"use strict";

var express = require('express');

var path = require('path');

var async = require('async'); //==== DB ===//


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

var MessageModel = require('./models/message'); //==== App ====//


var app = express();
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
});
app.get('/api/getChannels', function _callee(request, response) {
  var channels;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(ChannelModel.find().exec());

        case 2:
          channels = _context.sent;
          response.json(channels);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.get('/api/getUser', function _callee2(request, response) {
  var userId, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userId = request.params.userId;
          _context2.next = 3;
          return regeneratorRuntime.awrap(UserModel.findOne({
            user: {
              _id: userId
            }
          }).exec());

        case 3:
          user = _context2.sent;
          response.json(user);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.get('/api/getMessages/:channelId', function _callee3(request, response) {
  var channelId, messages;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // Use route parameters. The captured values are populated in the req.params object, 
          // with the name of the route parameter specified in the path as their respective keys.
          channelId = request.params.channelId;
          _context3.next = 3;
          return regeneratorRuntime.awrap(MessageModel.find({
            channel: {
              _id: channelId
            }
          }).populate(['channel', 'user']).exec());

        case 3:
          messages = _context3.sent;
          response.json(messages);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //----Passport ----//

var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'email',
  // to name at html form
  passwordField: 'passwd'
}, function (username, password, done) {
  UserModel.findOne({
    username: username
  }, function (error, user) {
    if (error) {
      return done(error);
    }

    if (!user) {
      return done(null, false, {
        message: 'Incorrect username.'
      });
    }

    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Incorrect pasword.'
      });
    }

    return done(null, user);
  });
}));
app.post('/login', passport.authenticate('local', {
  // = analog app.post (request, response)
  successRedirect: '/',
  failureRedirect: '/login'
})); //---

app.listen(3000);