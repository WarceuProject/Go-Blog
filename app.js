const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const User = require('./src/models/User.js');

const app = express();
const port = 3000;

// Ngatur koneksi ka MongoDB
mongoose.connect('mongodb://localhost/Go-Blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 mongoose.connection.on('error', (error) => console.error(error));
 mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

// Middleware
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(session({ secret: 'my-secret-key', resave: false, saveUninitialized: false }));

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
  
  // jalur user
  router.get('/admin/posts', ensureAuthenticated, (req, res) => {
    // dashboard
  });
  

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false
  }));
  
  // Inisialisasi Passport.js
  app.use(passport.initialize());
  app.use(passport.session());
  
  // ...


  app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
  });
  
// Atur soca supados teu nyoeun dosa ka EJS
app.set('view engine', 'ejs');

// Ngajalankeun kahirupan penuh luka
app.listen(port, () => {
  console.log(`Cintaku padamu berjalan di http://localhost:${port}`);
});
