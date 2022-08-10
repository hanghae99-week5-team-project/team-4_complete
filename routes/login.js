const express = require('express');
const router = express.Router();
const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();


router.get("/" ,(req, res ) => {
    res.send("welcome to login")
})
router.post("/", usersController.loginUser);


module.exports = router;