const ChannelModel = require('../models/channel');
const MessageModel = require('../models/message');

const ApiRoutes = {};

ApiRoutes.getChannels = async (req, res) => {
  const channels = await ChannelModel.find().exec();
  res.json(channels);
}

ApiRoutes.getMe = (req, res) => {
  res.json(req.user);
};

ApiRoutes.getUser = async (req, res) => {
  const username = req.params.username; 
  const user = await UserModel.findOne({ username: username }).exec();
  res.json(user);
};

ApiRoutes.getMessages = async (req, res) => {
  // Use route parameters. The captured values are populated in the req.params object, 
  // with the name of the route parameter specified in the path as their respective keys.
  const channelId = req.params.channelId; 

  const messages = await MessageModel.find({ channel: { _id: channelId } })
    .populate(['user'])
    .exec();
  res.json(messages);
};

module.exports = ApiRoutes;
