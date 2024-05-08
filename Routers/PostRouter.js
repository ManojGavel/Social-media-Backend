const express = require("express");
const router = express.Router();
const { protect } = require("../Controllers/AuthController");

const {
  createPost,
  getPosts,
  upload,
  addLike,
  addComment,
  getPostsbyFirends,
  //   getPost,
  //   updatePost,
  //   deletePost,
} = require("../Controllers/PostController");

router
  .route("/")
  .post(protect, upload.single("image"), createPost)
  .get(protect, getPostsbyFirends);
router.route("/like/:id").patch(protect, addLike);
router.route("/comment/:id").patch(protect, addComment);

module.exports = router;
