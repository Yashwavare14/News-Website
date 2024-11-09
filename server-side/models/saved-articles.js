const mongoose = require("mongoose");

const savedrticlleSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  articleId: {
    type: String,
    required: true,
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

const SavedArticle = mongoose.model("savedArticle", savedrticlleSchema);

module.exports = SavedArticle;
