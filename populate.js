#! /usr/bin/env node

console.log('This script populates ');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var User = require('./models/user');
var Channel = require('./models/channel');
var Message = require('./models/message');
var Attachment = require('./models/attachment');
const bcrypt = require('bcrypt');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []
var channels = []
var messages = []
var attachments = []

function userCreate(username, firstname, lastname, email, password, cb) {
    const userdetail = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: bcrypt.hashSync(password, 10)
    };

    var user = new User(userdetail);

    user.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New User: ' + user);
        users.push(user)
        cb(null, user)
    });
}

function channelCreate(name, cb) {
    var channel = new Channel({ name: name });

    channel.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Channel: ' + channel);
        channels.push(channel)
        cb(null, channel);
    });
}

function attachmentCreate(name, type, size, cb) {
  const attachmentDetail = {
    name: name,
    type: type,
    size: size
  };

  const attachment = new Attachment(attachmentDetail);

  attachment.save(function (err) {
    if (err) {
        cb(err, null);
        return;
    }
    console.log('New Attachment: ' + attachment);
    attachments.push(attachment)
    cb(null, attachment);
  });
}

function messageCreate(user, channel, timestamp, text, attachments, cb) {
    messagedetail = {
        user: user,
        channel: channel,
        timestamp: timestamp,
        text: text,
        attachments: attachments
    }
    if (user != false) messagedetail.user = user
    if (channel != false) messagedetail.channel = channel

    var message = new Message(messagedetail);
    message.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Message: ' + message);
        messages.push(message)
        cb(null, message)
    });
}


function createUsersChannelsAttachments(cb) {
  async.series([
    function (callback) {
      userCreate('AnnaB', 'Anna', 'Bothfuss', 'anna_b@gmail.com', 'A01', callback);
    },
    function (callback) {
      userCreate('BorisC', 'Boris', 'Cova', 'boris_c@gmail.com', 'B01', callback);
    },
    function (callback) {
      userCreate('CarlaD','Carla', 'Dmitrov', 'carlaD@gmail.com', 'C01', callback);
    },
    function (callback) {
      userCreate('BobD','Bob', 'Crichevsky', 'bob_c@gmail.com', 'B01', callback);
    },
    function (callback) {
      userCreate('CiranoD','Cirano','de Bergerac', 'cirano_d@gmail.com', 'C01', callback);
    },
    function (callback) {
      userCreate('DimitriyE','Dimitriy', 'Essensson', 'dima_e@gmail.com', 'D01', callback);
    },
    function (callback) {
      userCreate('CalipsoD','Calipso', 'Dyesy', 'calipso_d@gmail.com', 'C01', callback);
    },
    function (callback) {
      userCreate('DrontE','Dront', 'Eliminatus', 'dront_E@gmail.com', 'D01', callback);
    },
    function (callback) {
      userCreate('ElenaA','Elena', 'Aconit', 'elena_a@gmail.com', 'Enna01', callback);
    },
    function (callback) {
      channelCreate('Warm', callback);
    },
    function (callback) {
      channelCreate('Warmer', callback);
    },
    function (callback) {
      channelCreate('Warmest', callback);
    }
  ],
  // optional callback
  cb);
}

function createMessages(cb) {
  async.parallel([
    function (callback) {
      messageCreate(users[0], channels[0], "2021-03-02 13:14:51", "My dog used to chase people on a bike a lot. It got so bad I had to take his bike away", [], callback);
    },
    function (callback) {
      messageCreate(users[1], channels[1], "2021-03-02 13:14:52", "What kind of magic do cows believe in? MOODOO.",  [], callback);
    },
    function (callback) {
      messageCreate(users[2], channels[2], "2021-03-02 13:14:55", "What do you call someone with no nose? Nobody knows.", [], callback);
    },
    function (callback) {
      messageCreate(users[3], channels[0], "2021-03-03 14:14:51", "Did you hear the one about the guy with the broken hearing aid? Neither did he.", [], callback);
    },
    function (callback) {
      messageCreate(users[4], channels[1], "2021-03-03 14:14:52", "What do you call a fly without wings? A walk.", [], callback);
    },
    function (callback) {
      messageCreate(users[5], channels[2], "2021-03-03 14:14:55", "How many optometrists does it take to change a light bulb? 1 or 2? 1... or 2? do you call someone with no nose? Nobody knows.", [], callback);
    },
    function (callback) {
      messageCreate(users[7], channels[0], "2021-03-04 14:14:51", "I used to work for a soft drink can crusher. It was soda pressing.", [], callback);
    },
    function (callback) {
      messageCreate(users[8], channels[1], "2021-03-04 14:14:52", "I went to the zoo the other day, there was only one dog in it. It was a shitzu.", [], callback);
    },
    function (callback) {
      messageCreate(users[0], channels[2], "2021-03-04 14:14:55", "Why are skeletons so calm? Because nothing gets under their skin.", [], callback);
    },
    function (callback) {
      messageCreate(users[1], channels[0], "2021-03-05 14:14:51", "What did celery say when he broke up with his girlfriend? She wasn't right for me, so I really don't carrot all.", [], callback);
    },
    function (callback) {
      messageCreate(users[2], channels[1], "2021-03-05 14:14:52", "I gave all my dead batteries away today, free of charge.", [], callback);
    },
    function (callback) {
      messageCreate(users[3], channels[2], "2021-03-05 14:14:55", "Do you know where you can get chicken broth in bulk? The stock market.", [], callback);
    },

  ],
  // optional callback
  cb);
}


async.series([
    createUsersChannelsAttachments,
    createMessages
],
    // Optional callback
    function (err, results) {
        if (err) {
          console.log('FINAL ERR: ' + err);
        }
        else {
          console.log('Messages: ' + messages);

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });