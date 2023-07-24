const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/User');

const app = express();
const port = 3000;

// Ngatur koneksi ka MongoDB
mongoose.connect('mongodb://localhost/my_blog_cms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', (error) => console.error(error));
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'my-secret-key', resave: false, saveUninitialized: false }));
// Membuat middleware untuk memeriksa apakah pengguna telah terotentikasi atau belum
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
  
  // Contoh penggunaan middleware untuk rute yang memerlukan otorisasi
  router.get('/admin/posts', ensureAuthenticated, (req, res) => {
    // Render halaman untuk mengelola posting
  });
  
// Menggunakan session untuk menyimpan status otentikasi pengguna
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false
  }));
  
  // Inisialisasi Passport.js
  app.use(passport.initialize());
  app.use(passport.session());
  
  // ...
  
  // Membuat variabel global untuk mengakses user saat ini dari template (opsional)
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
