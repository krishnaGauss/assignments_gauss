const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  const resp = await Admin.findOne({
    username: username,
    password: password,
  });
  if (resp) {
    return res.status(400).send("Username already exists");
  }
  await Admin.create({
    username,
    password,
  });
  res.json({
    msg: "Admin created successfully",
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
