const express = require("express");
const router = express.Router();
const { protect } = require("../Controllers/AuthController");

const {
  createPost,
  getPosts,
  upload
//   getPost,
//   updatePost,
//   deletePost,
} = require("../Controllers/PostController");


// const multer = require('multer');
// const taskRouter = express.Router();
// // Multer for image upload
// const storage = multer.diskStorage({
//     destination: (req,file,cb) => {
//         cb(null, './');
//     },
//     filename : (req,file,cb) => {
//         cb(null,new Date().toISOString() + '-' + file.originalname);
//     },
// });
// const upload = multer({ storage : storage });


router.route("/").post(protect, upload.single('image') ,createPost).get(getPosts);

module.exports = router;