const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/User");
const { registerValidation, loginValidation } = require("../../validation/User");

const register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const response = registerValidation({ name, email, password, phone });
  if (response.error) {
    return res.status(400).json({
      message: "Error creating user",
      error: response.error.details[0].message,
    });
  };
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({
      message: "User already exists",
    });
  };
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    phone,
  });
  try {
    const newUser = await user.save();
    res.json({
      message: "User created successfully",
      userDetails: {
        id: newUser._id,
        name: newUser.name,
      }
    })
  } catch (error) {
    res.status(400).json({
      message: error
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const response = loginValidation({ email, password });
  if (response.error) {
    return res.status(400).json({
      message: "Error logging in",
      error: response.error.details[0].message,
    });
  };

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "User does not exist",
    });
  };

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      message: "Invalid password",
    });
  };

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  try {
    res.json({
      userDetails: {
        id: user._id,
        name: user.name
      },
      token
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};

module.exports = {
  register,
  login,
};