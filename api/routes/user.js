const router = require("express").Router();
const User = require("../models/User");

// Create
router.post("/create", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    if (user) return res.status(200).json(user);
    else res.status(400).json({ error: "User Exist 😣" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Users
router.get("/get", async (req, res) => {
  try {
    const users = await User.find();
    if (users) return res.status(200).json(users);
    else res.status(400).json({ error: "Users Not Found 😣" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get By ((ID))
router.get("/find/:id", async (req, res) => {
  try {
    const getUser = await User.findById(req.params.id);
    if (getUser) return res.status(200).json(getUser);
    else res.status(400).json({ error: "User Not Found 😣" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search  ((searchTerm))
router.get("/search/:searchTerm", async (req, res) => {
  try {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, "i");
    const users = await User.find({ username: { $regex: searchRegex } });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete By ((ID))
router.delete("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted Success");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
router.put("/update/:id", async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
