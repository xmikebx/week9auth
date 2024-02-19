const sequelize = require("../db/connection");
const User = require("./model");

const signupUser = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({ message: "user added", user: user });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: { all: true } });
    console.log("Route: ", req.path);
    res.send({ message: "all the users", users: users });
  } catch (error) {
    res.send({ message: "its gone pete tong", error: error });
  }
};

module.exports = {
  signupUser: signupUser,
  getAllUsers,
};
