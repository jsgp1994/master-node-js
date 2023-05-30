const express = require('express')
const router = express.Router()
const multer = require('multer')

const ArticleController = require('../controllers/article')

const storage = multer.diskStorage({
    destination: ( req, file, cb ) => {
        cb(null, './images/articles/')
    },
    filename: ( req, file, cb ) => {
        cb(null, "article_" + Date.now() + "_" +file.originalname)
    }
})

const upImage = multer( { storage } )

router.get("/article/testing", ArticleController.test)
router.get("/article/course", ArticleController.course)

router.post("/article/create", ArticleController.create)
router.get("/articles/:last?", ArticleController.list)
router.get("/article/:one", ArticleController.one)

router.delete("/article/:articleId", ArticleController.deleteArticle)
router.put("/article/:articleId", ArticleController.edit)
router.post("/article/image/:articleId",[ upImage.single("file") ], ArticleController.updateImage)
router.get("/image/:file", ArticleController.imageLoad)
router.get("/article/search/:data", ArticleController.search)

module.exports = router