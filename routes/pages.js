const path = require('path');
const ChannelModel = require('../models/channel');
const MessageModel = require('../models/message');

const PageRoutes = {};

PageRoutes.root = (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
  } else {
    res.sendFile(path.join(__dirname + '/../public/index-unauthenticated.html'));
  }
};

PageRoutes.mdb = (req, res) => {
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
      res.render('mdb.ejs', { channels, messages });
    })
  })
};

module.exports = PageRoutes;