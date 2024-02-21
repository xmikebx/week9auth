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
    const users = await User.findAll();
    console.log("Route: ", req.path);
    res.send({ message: "all the users", users: users });
  } catch (error) {
    res.send({ message: "its gone pete tong", error: error });
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });

    console.log("Route: ", req.path);
    if (!user) {
      res.status(404).json({ message: "username not found" });
    }

    res.status(200).json({ message: "user found", user: req.user });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
    });
    if (!user) {
      res.status(401).json({ message: "username not found" });
    }
    res.send({ message: "hello", user: user });
    // const pass = await User.findOne({
    //   where: { username: req.body.password },
    // });
    // if (!pass) {
    //   res.status(401).json({ message: "password invalid" });
    // }
    // res.send({ message: "hello", user: user });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = {
  signupUser: signupUser,
  getAllUsers: getAllUsers,
  login: login,
  getOneUser: getOneUser,
};
