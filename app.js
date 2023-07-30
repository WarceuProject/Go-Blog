// app.js
const express = require('express');
const app = express();

// rute buruan/ halam depan kalo bahasa sunda nya mah buruan :v
app.get('/', (req, res) => {
    res.send('Selamat datang di blog kami!');
  });

// nampilkeun daftar posting blog
const { getAllPosts } = require('./path/to/postController');

app.get('/posts', async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.render('posts', { posts }); // template engine kanggo render posts
  } catch (err) {
    res.status(500).send('Terjadi kesalahan dalam mengambil posting.');
  }
});

// kanggo ningali buruan tambah posting
app.get('/posts/tambah', (req, res) => {
    res.render('tambah-post'); 
  });
// tambah postingan anyar 
const { createPost } = require('./path/to/postController');

app.post('/posts', async (req, res) => {
  try {
    // table anu sesuai sareung database tadi
    const { judul, konten, tanggal_publikasi, kategori_id } = req.body;
    await createPost(judul, konten, tanggal_publikasi, kategori_id);
    res.redirect('/posts'); // Redirect ka halaman atau buruan tambah posting
  } catch (err) {
    res.status(500).send('Terjadi kesalahan dalam menambahkan posting.');
  }
});
// body-parser 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// mulai aplikasi 
const port = 3000; // Ganti dengan port yang Anda inginkan

app.listen(port, () => {
  console.log(`Aplikasi berjalan pada http://localhost:${port}`);
});
