const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { promisify } = require("util");
const FriendsModels = require("../Models/FriendsModels");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  user.password = undefined;
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    console.log(
      name,
      "name",
      email,
      "email",
      password,
      "password",
      confirmPassword,
      "confirmPassword"
    );
    const newUser = await UserModel.create({
      name,
      email,
      password,
      confirmPassword,
    });

    FriendsModels.create({
      user: newUser._id,
    });
    createSendToken(newUser, 201, res);
  } catch (err) {
    console.log(req.body, "req.body");
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
