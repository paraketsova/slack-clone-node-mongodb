const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
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


//==== Passport ====//

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    // TODO: add support for logging in with email    
    UserModel.findOne({ username: username }, function(error, user) {
      if (error) {
        return done(error);
      }
      if  (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (password !== user.password) {
        return done(null, false, { message: 'Incorrect pasword.' });
      }
      return done(null, user);
    })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  UserModel.findOne({ _id: id }, function(error, user) {
    done(error, user);
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

//==== App ====//

const app = express();

app.use(session({ secret: 'ponies' }));
app.use(flash());
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(passport.initialize());
app.use(passport.session());

app.get('/', ensureAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use(express.static(__dirname + '/public'));

app.get('/login', function(req, res) {
  res.render('login.ejs', { loginError: req.flash('error') });
});

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }));

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
      response.render('mdb.ejs', { channels, messages });
    })
  })
});

app.get('/api/getChannels', ensureAuthenticated, async function (request, response) {
  const channels = await ChannelModel.find().exec();
  response.json(channels);
});

app.get('/api/getMe', ensureAuthenticated, async function (request, response) {
  response.json(request.user);
});

app.get('/api/getUser/:username', ensureAuthenticated, async function (request, response) {
  const username = request.params.username; 
  const user = await UserModel.findOne({ username: username }).exec();
  response.json(user);
});

app.get('/api/getMessages/:channelId', ensureAuthenticated, async (request, response) => {
  // Use route parameters. The captured values are populated in the req.params object, 
  // with the name of the route parameter specified in the path as their respective keys.
  const channelId = request.params.channelId; 

  const messages = await MessageModel.find({ channel: { _id: channelId } })
    .populate(['user'])
    .exec();
  response.json(messages);
});

app.listen(3000);
