const express = require("express")
const router = express.Router()
const UserController = require("../controllers/user")

router.get("/test-user", UserController.testUser)
router.post("/registrer", UserController.register)

module.exports = router