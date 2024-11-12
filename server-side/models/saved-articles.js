const mongoose = require("mongoose");

const savedrticleSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  articleId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  urlToImage: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const SavedArticle = mongoose.model("SavedArticle", savedrticleSchema);

module.exports = SavedArticle;
