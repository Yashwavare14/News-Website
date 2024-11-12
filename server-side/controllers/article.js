const SavedArticle = require("../models/saved-articles");

const { v4: uuidv4 } = require("uuid");

const handleSaveArticle = async (req, res) => {
  const { username, article } = req.body;
  try {
    const existingArticle = await SavedArticle.findOne({
      username,
      articleId: uuidv4(),
    });
    if (existingArticle) {
      return res.status(400).json({ message: "Article Already Saved" });
    }
    const savedArticle = new SavedArticle({
      username,
      articleId: uuidv4(),
      title: article.title,
      description: article.description,
      urlToImage: article.urlToImage,
      url: article.url,
    });
    await savedArticle.save();
    console.log("article saved successfully");
    res
      .status(201)
      .json({ message: "article successfully saved", success: true });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: "Error saving Article", error, success: false });
  }
};

const handleGetArticle = async (req, res) => {
  try {
    const savedArticles = await SavedArticle.find({
      username: req.params.username,
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
