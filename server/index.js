const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSesson = require('cookie-session');

const passport = require('passport');
const app = express();
app.use(
  cookieSesson({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  }),
);

app.use(passport.initialize());
app.use(passport.session());

/* Routes */
require('./routes/authRoutes')(app);
/* Models */
require('./models/User');
/* Services */
require('./services/passport');

/* app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})); */

const option = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000,
};

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(keys.mongoURI, option).then(
  function() {
    console.log('success');
  },
  function(err) {
    console.log(err);
  },
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
