const UserModel = require('../models/user');

const UserRoutes = {};

UserRoutes.signupGet = (req, res) => {
  res.render('signup.ejs', { signupError: req.flash('error') });
};

UserRoutes.signupPost = (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;

  let errors = [];

  if (!username || !firstname || !lastname || !email || !password) {
    errors.push("Please fill out all fields");
  }

  if (password.length < 6) {
    errors.push("Use at least 6 characters for your password");
  }

  if (errors.length > 0) {
    res.render('signup.ejs', { errors, username, firstname, lastname, email, password });
  } else {
    const newUser = new UserModel({ username, firstname, lastname, email, password });

    newUser.save()
      .then((user) => {
        // Automatically log in the user after successful sign up
        req.login(user, function(err) {
          if (err) { return next(err); }
          return res.redirect('/');
        });
      })
      .catch(error => console.log(error));
  }
};

UserRoutes.loginGet = (req, res) => {
  res.render('login.ejs', { loginError: req.flash('error') });
};

UserRoutes.loginPost = (passport) => passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true });

UserRoutes.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

module.exports = UserRoutes;
