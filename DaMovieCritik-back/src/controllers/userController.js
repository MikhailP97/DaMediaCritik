const express = require("express")
const router = express.Router()
const userService = require("../services/userService")
const auth = require("../middleware/auth")

//findAll
router.get("/",auth.tokenInterceptor, userService.findAll)
//findById
router.get("/id/:id", userService.findById)
// register
router.post("/", userService.register)
// updateUser
router.put("/:id", auth.tokenInterceptor, userService.update)
// deleteUser
router.delete("/:id",auth.tokenInterceptor, userService.delete)
// login
router.post('/login', userService.login)

module.exports = router;