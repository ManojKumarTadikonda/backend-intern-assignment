const Task = require("../models/Task");

exports.getalltasks = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 6 } = req.query;

    const query = {};

    // 🔍 Search by title
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // 🏷 Filter by status
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Task.countDocuments(query);

    res.json({
      tasks,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

exports.getTasks = async (req, res) => {
  const { search, status, page = 1, limit = 6 } = req.query;

  const query = { user: req.user.userId };

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const tasks = await Task.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Task.countDocuments(query);

  res.json({
    tasks,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  });
};

exports.createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.user.userId,
  });
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
