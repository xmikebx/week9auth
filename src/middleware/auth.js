const bcrypt = require("bcrypt");

const User = require("../users/model");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const hashPass = async (req, res, next) => {
  try {
    console.log("req.body.password before hash:", req.body.password);

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;

    console.log("req.body.password after hash:", req.body.password);

    next();
  } catch (err) {
    res.status(501).json({ message: err.message, err: err });
  }
};

// const login = async (req, res) => {
//   try {
//     const user = await User.findOne({ include: { all: true } });
//     if (!user) {
//       res.status(402).json({ message: err.message, err: err });
//     }

//     comparePass();
//     res.send("hello world");
//   } catch (error) {
//     res.status(500).json({ message: error.message, error: error });
//   }
// };

const comparePass = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    const matched = await bcrypt.compare(
      req.body.password,
      user.dataValues.password
    );

    console.log(matched);

    if (!matched) {
      res.status(401).json({ message: "no!!!!!!!!!!!" });
    }
    //...

    // https://www.npmjs.com/package/bcrypt

    //compare passwords
    // what we will need;

    // plain text password (e.g. 'mypassword123) & the hashed password on the DB

    // how do we get plain text password? send it in the request body

    // how do we get the hashed password? find the user

    // How do we find the user? by the username - sent in the request body

    // we've found the user - then, use bcrypt to compare.

    // const matched = use bcrypt.compare(plaintext, hashed password)

    //or

    // req.matched = use bcrypt.compare(plaintext, hashed password) (harder way)

    // if matched false - response with code from unauthorised

    // next()
    req.user = user;
    next();
    res
      .status(201)
      .json({ message: "Successfully logged in!", user: req.user });
  } catch (err) {
    res.status(501).json({ message: err.message, err: err });
  }
};

module.exports = {
  hashPass: hashPass,
  comparePass: comparePass,
  // login: login,
};
