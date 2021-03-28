const path = require('path');
const ChannelModel = require('../models/channel');
const MessageModel = require('../models/message');

const PageRoutes = {};

PageRoutes.root = (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
  } else {
    res.render('welcome.ejs');
  }
};

module.exports = PageRoutes;
