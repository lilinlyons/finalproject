const {
    registerUser,
    loginUser,
    emailAlerts,
    getAllUsers

} = require("../controllers/reg.controller.js");
const express = require("express");


const router = express.Router();

router.post("/register", registerUser);
router.post("/emailalerts", emailAlerts);
router.get("/users", getAllUsers)
router.post("/login", loginUser)



module.exports = {
    router
};