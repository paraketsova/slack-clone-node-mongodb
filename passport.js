const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./models/user');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  function(username, password, done) {
    // TODO: add support for logging in with email    
    UserModel.findOne({ username: username }, async function(error, user) {
      if (error) {
        return done(error);
      }

      if  (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return done(null, false, { message: 'Incorrect password.' });
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
    res.sendStatus(401);
  }
}

module.exports = { passport, ensureAuthenticated };
