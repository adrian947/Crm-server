require("dotenv").config({ path: ".env" });
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const newUser = async (input) => {
  const { email, password } = input;

  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new Error("The user is already registered");
  }
  const salt = bcrypt.genSaltSync(10);
  input.password = bcrypt.hashSync(password, salt);

  try {
    const user = await new User(input);
    user.save();
    return user;
  } catch (error) {
    console.log("error", error);
  }
};

const authUser = async (input) => {
  const { email, password } = input;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("The user does not exist");
  }
  const verifyPassword = await bcrypt.compare(password, user.password);
  if (verifyPassword) {
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        surName: user.surName,
        email: user.email,
      },
      process.env.SECRETA,
      { expiresIn: "8h" }
    );
    return { token: token };
  } else {
    throw new Error("wrong username or password");
  }
};

const getUser = async (token, ctx) => {
  const user = jwt.verify(token, process.env.SECRETA);

  return user;
};

const verifyToken = async (token) => {
  try {
     jwt.verify(token, process.env.SECRETA);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  newUser,
  authUser,
  getUser,
  verifyToken,
};
