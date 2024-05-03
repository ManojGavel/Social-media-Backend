const express = require("express");
const router = express.Router();
const { protect } = require("../Controllers/AuthController");

const {
  createPost,
  getPosts,
  uploadImage
//   getPost,
//   updatePost,
//   deletePost,
} = require("../Controllers/PostController");


router.route("/").post(protect, uploadImage.single("Image") ,createPost).get(getPosts);

module.exports = router;