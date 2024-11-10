const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const handleRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    //creating a user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res
      .status(201)
      .json({ message: "user created successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "error occured while registering",
      success: false,
      error,
    });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "invalid email or password", success: false });
    }
    //check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "invalid email or password", success: false });
    }

    //create web token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "login successfull",
      success: true,
      token,
      email,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({
      message: "error occured while logging in",
      success: false,
      error,
    });
  }
};

module.exports = { handleRegister, handleLogin };
