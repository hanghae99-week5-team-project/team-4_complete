const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth_middlewares");

const UsersController = require("../controllers/users.controller");

// router.get("/" ,(req, res ) => {
//     res.send("welcome to users")
// })

const usersController = new UsersController();
router.get("/me", authMiddleware, usersController.getUser);
router.post("/", usersController.postUser);

module.exports = router;
