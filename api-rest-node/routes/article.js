const express = require('express')
const router = express.Router()

const ArticleController = require('../controllers/article')

router.get("/article/testing", ArticleController.test)
router.get("/article/course", ArticleController.course)

router.post("/article/create", ArticleController.create)
router.get("/articles", ArticleController.list)

module.exports = router