// app.js
const express = require('express');
const app = express();

const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// rute buruan/ halam depan kalo bahasa sunda nya mah buruan :v
app.get('/', (req, res) => {
    res.send('Selamat datang di blog kami!');
  });

// nampilkeun daftar posting blog
const { getAllPosts } = require('./views/daftar-post.ejs');

app.get('views/daftar-post.ejs', async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.render('posts', { posts }); // template engine kanggo render posts
  } catch (err) {
    res.status(500).send('Terjadi kesalahan dalam mengambil posting.');
  }
});

// kanggo ningali buruan tambah posting
app.get('views/tambah-post.ejs', (req, res) => {
    res.render('tambah-post'); 
  });
// tambah postingan anyar 
const { createPost } = require('./views/tambah-post.ejs');

app.post('views/daftar-post.ejs', async (req, res) => {
  try {
    // table anu sesuai sareung database tadi
    const { judul, konten, tanggal_publikasi, kategori_id } = req.body;
    await createPost(judul, konten, tanggal_publikasi, kategori_id);
    res.redirect('views/daftar-post.ejs'); // Redirect ka halaman atau buruan tambah posting
  } catch (err) {
    res.status(500).send('Terjadi kesalahan dalam menambahkan posting.');
  }
});

// middleware
app.get('/', (req, res) => {
    res.render('beranda');
  });
  
  app.get('views/daftar-post.ejs', (req, res) => {
    const posts = [
      { id: 1, judul: 'Judul Post 1' },
      { id: 2, judul: 'Judul Post 2' },
      // ... (data post dari database, contoh sederhana untuk demonstrasi)
    ];
  
    res.render('daftar-post', { posts });
  });
// body-parser 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// mulai aplikasi 
const port = 3000; // Ganti dengan port yang Anda inginkan

app.listen(port, () => {
  console.log(`Aplikasi berjalan pada http://localhost:${port}`);
});

