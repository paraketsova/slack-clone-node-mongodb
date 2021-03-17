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


//==== App ====//

const { passport, ensureAuthenticated } = require('./passport');
const PageRoutes = require('./routes/pages');
const UserRoutes = require('./routes/users');
const ApiRoutes = require('./routes/api');

const app = express();

app.use(session({ secret: 'ponies' }));
app.use(flash());
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(passport.initialize());
app.use(passport.session());

app.get('/', PageRoutes.root);
app.get('/mdb', PageRoutes.mdb);

app.get('/signup', UserRoutes.signupGet);
app.post('/signup', UserRoutes.signupPost);
app.get('/login', UserRoutes.loginGet);
app.post('/login', UserRoutes.loginPost(passport));
app.get('/logout', UserRoutes.logout);

app.get('/api/getChannels', ensureAuthenticated, ApiRoutes.getChannels);
app.get('/api/getMe', ensureAuthenticated, ApiRoutes.getMe);
app.get('/api/getUser/:username', ensureAuthenticated, ApiRoutes.getUser);
app.get('/api/getMessages/:channelId', ensureAuthenticated, ApiRoutes.getMessages);

app.use(express.static(__dirname + '/public'));
app.listen(3000);
