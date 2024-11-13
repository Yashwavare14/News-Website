const mongoose = require("mongoose");

const savedrticleSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  articleId: {
    type: String,

    unique: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  urlToImage: {
    type: String,
  },
  url: {
    type: String,
  },
});

const SavedArticle = mongoose.model("SavedArticle", savedrticleSchema);

module.exports = SavedArticle;
