// routes/index.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Jalur buruan
router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.render('index', { posts });
});

// Jalur ditel
router.get('/post/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', { post });
});

// Jalur jannah dengan mu eaaaa (tapi wadul awowowog)
router.get('/create', (req, res) => {
  res.render('create');
});

router.post('/create', async (req, res) => {
  const { title, content } = req.body;
  await Post.create({ title, content });
  res.redirect('/');
});

module.exports = router; // hooh ajig sok poho titik dua koma na, kamu cantik jiga doma
