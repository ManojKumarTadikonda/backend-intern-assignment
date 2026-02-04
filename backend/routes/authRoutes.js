const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/register", controller.register);

// Admin-only: admin creates admin
router.post("/register-admin", authMiddleware, controller.register);

router.post("/login", controller.login);

module.exports = router;
