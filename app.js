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

app.get('/api/getUser', function (request, response) {
  const user = ['Mariia', 'Paraketsova', 'ponka'];
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

app.listen(3000);
