const SavedArticle = require("../models/saved-articles");

const handleSaveArticle = async (req, res) => {
  const { userId, article } = req.body;
  try {
    const existingArticle = await SavedArticle.findOne({
      userId,
      articleId: article.articleId,
    });
    if (existingArticle) {
      return res.status(400).json({ message: "Article Already Saved" });
    }
    const savedArticle = new SavedArticle({
      userId,
      articleId: article.articleId,
      title: article.title,
      description: article.description,
      urlToImage: article.urlToImage,
      url: article.url,
    });
    await savedArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(500).json({ message: "Error saving Article", error });
  }
};

const handleGetArticle = async (req, res) => {
  try {
    const savedArticles = await SavedArticle.find({
      userId: req.params.userId,
    });
    res.status(200).json(savedArticles);
  } catch (error) {
    res.status(500).json({ message: "error fetching articles", error });
  }
};

module.exports = {
  handleSaveArticle,
  handleGetArticle,
};
