const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt = require("jsonwebtoken");
const { Admin } = require("../db");
const { Course } = require("../db");
const router = Router();

const JWT_SECRET_KEY = "NNINDINW**D*W)U@@()(EU(ENwefnwifniwef))";

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const response = await Admin.findOne({
    username,
    password,
  });
  if (response) {
    return res.status(400).send("Username already exists.");
  }

  await Admin.create({
    username: username,
    password: password,
  });

  res.status(200).send("Admin created successfully.");
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const response = await Admin.findOne({
    username,
    password,
  });

  if (!response) {
    return res.status(400).send("Admin does not exist.");
  }

  const token = jwt.sign({ username: username, password:password }, JWT_SECRET_KEY);
  const payload = "Bearer ".concat(token);
  res.status(200).json({
    token: payload,
  });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;

  await Course.create({
    title,
    description,
    imageLink,
    price,
  });
  res.json({
    msg: "Course created successfully",
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const entries = await Course.find();
  res.json({
    courses: entries,
  });
});

module.exports = router;
