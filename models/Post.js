// models/Post.js
const { DataTypes } = require('sequelize');
const sequelize = require('../node_modules/sequelize_instance');
const Post = require('../models/Post');
// fungsi kanggo nambah posting anyar
const createPost = async (judul, konten, tanggal_publikasi, kategori_id) => {
    try {
      const post = await Post.create({ judul, konten, tanggal_publikasi, kategori_id });
      return post;
    } catch (err) {
      throw err;
    }
  };
// fungsi kanggo nyandak daftar kabeh posting
const getAllPosts = async () => {
    try {
      const posts = await Post.findAll();
      return posts;
    } catch (err) {
      throw err;
    }
  };
// fungsi kanggo nyandak posting berdasarkeun ID
const getPostById = async (postId) => {
    try {
      const post = await Post.findByPk(postId);
      return post;
    } catch (err) {
      throw err;
    }
  };
// fungsi kanggo ngedit posting berdasarkeun ID
const updatePost = async (postId, judul, konten, tanggal_publikasi, kategori_id) => {
    try {
      const post = await Post.findByPk(postId);
      if (!post) throw new Error('Post not found.');
  
      post.judul = judul;
      post.konten = konten;
      post.tanggal_publikasi = tanggal_publikasi;
      post.kategori_id = kategori_id;
  
      await post.save();
      return post;
    } catch (err) {
      throw err;
    }
  };
// fungsi kanggo ngahapus posting berdasarkeun ID
const deletePost = async (postId) => {
    try {
      const post = await Post.findByPk(postId);
      if (!post) throw new Error('Post not found.');
  
      await post.destroy();
    } catch (err) {
      throw err;
    }
  };
  
  module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
  };
  



const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  konten: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tanggal_publikasi: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  kategori_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Post;
