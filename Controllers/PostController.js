const PostModel = require("../Models/PostModel");
const AppError = require("../Utils/AppError");
const multer = require("multer");

const protect = require("../Controllers/AuthController");

exports.createPost = async (req, res, next) => {
  try {
    console.log("come to create post");
    const { title, description, image } = req.body;
    console.log(req.file, "image");
    const newPost = await PostModel.create({
      title,
      description,
      image,
      user: req.user._id,
    });
    res.status(201).json({
      status: "success",
      data: {
        newPost,
      },
    });
    console.log("come to end");
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json({
      status: "success",
      data: {
        posts,
      },
    });
  } catch (err) {
    next(AppError(err.message, 400));
  }
};


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}`);
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `post-${req.body.user_id}-${Date.now()}.${ext}`); // soon going to add the
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

exports.uploadImage = multer({
  storage,
  fileFilter: multerFilter,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
});
