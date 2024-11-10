const express = require("express");
const router = express.Router();
const {
  handleSaveArticle,
  handleGetArticle,
} = require("../controllers/article");

router.post("/save", handleSaveArticle);
router.get("/user/:userId", handleGetArticle);

module.exports = router;
