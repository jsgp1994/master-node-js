const express = require('express')
const router = express.Router()

const ArticleController = require('../controllers/article')

router.get("/article/testing", ArticleController.test)
router.get("/article/course", ArticleController.course)

router.post("/article/create", ArticleController.create)
router.get("/articles/:last?", ArticleController.list)
router.get("/article/:one", ArticleController.one)

router.delete("/article/:articleId", ArticleController.deleteArticle)
router.put("/article/:articleId", ArticleController.edit)

module.exports = router