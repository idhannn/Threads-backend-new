const router = require("express").Router();
const User = require("../models/userModel");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      result: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/search", async (req, res) => {
  try {
    const keyword = req.query.username;
    const users = await User.find();
    const me = req.user.id;

    if (!keyword || keyword === "") {
      const result = users.filter((user) => {
        return user._id != me;
      });
      return res.status(200).json({
        success: true,
        result,
      });
    }

    const result = users.filter((user) => {
      return user._id != me && user.username.includes(keyword.toLowerCase());
    });

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/profile/:username", async (req, res) => {
  try {
    const username = req.params.username;
    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Data Kurang!",
      });
    }

    const userByUsername = await User.findOne({ username });
    const { password, ...rest } = userByUsername._doc;

    res.status(200).json({
      success: true,
      result: rest,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Data Kurang!",
      });
    }

    const userById = await User.findById(id);
    const { password, ...rest } = userById._doc;

    res.status(200).json({
      success: true,
      result: rest,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.patch("/user/update/:id", async (req, res) => {
  try {
    const { avatar, username } = req.body;
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Data Kurang!",
      });
    }

    await User.findByIdAndUpdate(id, {
      avatar,
      username,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
