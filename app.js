const express = require('express');
const path = require('path');
const async = require('async');


//==== DB ===//

const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://localhost:27017/slackClone', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}) 
  .then(() => console.log('connected...'))
  .catch(err => console.log(err));

const db = mongoose.connection;

db.on('error', error => {
  console.log(error);
})

const UserModel = require('./models/user');
const ChannelModel = require('./models/channel');
const MessageModel = require('./models/message');


//==== App ====//

const app = express();

app.use(express.static(__dirname + "/public"));

app.get('/mdb', (request, response) => {
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

app.get('/api/getChannels', async function (request, response) {
  const channels = await ChannelModel.find().exec();
  response.json(channels);
});

app.get('/api/getUser', async function (request, response) {
  const userId = request.params.userId; 
  const user = await UserModel.findOne({user: { _id: userId } }).exec();
  response.json(user);
});

app.get('/api/getMessages/:channelId', async (request, response) => {
  // Use route parameters. The captured values are populated in the req.params object, 
  // with the name of the route parameter specified in the path as their respective keys.
  const channelId = request.params.channelId; 

  const messages = await MessageModel.find({ channel: { _id: channelId } })
  .populate(['channel', 'user'])
  .exec();
  response.json(messages);
})

//----Passport ----//
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  {
    usernameField: 'email', // to name at html form
    passwordField: 'passwd'
  },
  function(username, password, done) {
    UserModel.findOne({username: username}, function(error, user) {
      if (error) {
        return done(error)
      }
      if  (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect pasword.' })
      }
    })
  }
))

app.post('login', passport.authenticate('local', { // = analog app.post (request, response)
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

//---

app.listen(3000);
