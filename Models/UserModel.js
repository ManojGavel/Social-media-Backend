const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 50,
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 50,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function () {
        return this.password === this.confirmPassword;
      },
      message: "Password and Confirm Password must be same",
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
