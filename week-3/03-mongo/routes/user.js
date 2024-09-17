const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");
const { default: mongoose } = require("mongoose");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  const resp = await User.findOne({
    username: username,
    password: password,
  });
  if (resp) {
    return res.status(400).send("Username already exists");
  }
  await User.create({
    username,
    password,
  });
  res.json({
    msg: "User created successfully",
  });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const resp = await Course.find();
  res.json({
    courses: resp,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;

  await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  ).catch(function (e) {
    console.log(e);
  });
  res.json({
    msg: "Purchase complete",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers.username;

  const user = await User.findOne({
    username: username,
  });

  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });
  res.json({
    purchasedCourses: courses,
  });
});

module.exports = router;
