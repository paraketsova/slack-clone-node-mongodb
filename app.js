const express = require('express');
const flash = require('connect-flash'); // display flash messages
const session = require('express-session'); // building a user-session
const path = require('path'); // access and interact with the file system (path methods)
const async = require('async'); // a utility module which provides straight-forward, powerful functions for working with asynchronous JavaScript
const fs = require('fs'); // access and interact with the file system - write file and build directory on Diskstorage

//==== DB ===//

const mongoose = require('mongoose'); // storing and reading data from DB
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

const { passport, ensureAuthenticated } = require('./passport'); //to handle user's authentication
const PageRoutes = require('./routes/pages');
const UserRoutes = require('./routes/users');
const ApiRoutes = require('./routes/api');

const app = express(); //skapa obj av express module


const expressEjsLayout = require('express-ejs-layouts'); // layout support for ejs in express
app.set('view engine', 'ejs')
app.use(expressEjsLayout)

app.use(session({ secret: 'ponies' }));
app.use(flash());
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(passport.initialize());
app.use(passport.session());

app.get('/', PageRoutes.root);
app.get('/mdb', PageRoutes.mdb); // TODO: DELETE mdb page!

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

//==== Socket ====//

const http = require('http').Server(app);
const io = require('socket.io')(http); // use socket.io library for build real-time communication

io.on('connection', (socket) => {
  console.log('User connected');

  // Catch message from client
  socket.on('message', async (data) => {
    console.log('Got new message');

    const attachmentIds = [];

    // Catch and save attachments:
    if (data.files.length > 0) {
      const AttachmentModel = require('./models/attachment');

      for (const file of data.files) {
        const attachment = new AttachmentModel(file);

        // Save attachment to DB and get MongoDB Attachment object in return
        const dbAttachment = await attachment.save();

        // Get ID of the newly created attachment, to use in filepath
        const attachmentId = dbAttachment.id;
        attachmentIds.push(attachmentId);

        fs.mkdirSync(`public/attachments/${attachmentId}`);
        fs.writeFile(`public/attachments/${attachmentId}/${file.name}`, file.blob, function (err) {
          if (err) return console.log(err);
          console.log('Attachment uploaded');
        });
      }
    }

    // Save message to DB
    delete data.files; // removing, because this property is not needed for MessageModel
    data.attachments = attachmentIds; // adding IDs of attachments we created above

    const MessageModel = require('./models/message');
    const message = new MessageModel(data);

    const populatedMessage = await message.save()
      .then((m) => m.populate(['user', 'attachments']).execPopulate());

    // Send (forward) message to other clients
    io.emit('message', populatedMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

http.listen(3000);
