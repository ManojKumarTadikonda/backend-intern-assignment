const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/requireAdmin");
const Task = require("../models/Task");

router.use(auth);

// Admin-only route
router.get("/admin/all", requireAdmin, controller.getalltasks);

// User routes
router.get("/", controller.getTasks);
router.post("/", controller.createTask);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);

module.exports = router;
