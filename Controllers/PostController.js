const PostModel = require("../Models/PostModel");
const AppError = require("../Utils/AppError");
const multer = require("multer");
const path = require("path");

const protect = require("../Controllers/AuthController");

exports.createPost = async (req, res) => {
  try {
    const { file } = req;
    console.log(req.file, "file")
    const { title, description } = req.body;
    const postImageData = await PostModel.create({
      title,
      image: process.env.BASE_URL_POST + file.filename,
      description,
      user: req.user._id,
    });
    return res.status(200).json({
      status: 200,
      message: "Post images successfully!",
      data: postImageData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unexpected error,please try again later!",
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
    // next(AppError(err.message, 400));
    res.status(500).json({
      message: "Unexpected error, please try again later!",
    });
  }
};

exports.getPostsbyFirends = async (req, res, next) => {
  try {
    const { user } = req;
    const posts = await PostModel.find({ user: { $in: user.friends } });
    res.status(200).json({
      status: "success",
      data: {
        posts,
      },
    });
  } catch (err) {
    // next(AppError(err.message, 400));
    res.status(500).json({
      message: "Unexpected error, please try again later!",
    });
  }
};


const uploadPath = path.join(__dirname, "../public");
const storage = multer.diskStorage({
  destination: uploadPath,
  filename: function (req, file, cb) {
    try {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    } catch (err) {
      console.log("error");
    }
  },
});

exports.upload = multer({ storage: storage });

exports.addLike = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    if (post.likes.includes(user._id)) {
      post.likes = post.likes.filter((like) => like != user._id);
      await post.save();
      return res.status(400).json({
        message: "You already liked this post and it has been unliked!",
      });

    }
    post.likes.push(user._id);
    await post.save();
    res.status(200).json({
      message: "Post liked successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unexpected error, please try again later!",
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const { comment } = req.body;
    const post = await PostModel.findById(id);
    if
      (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    const commentData = {
      comment,
      user: user._id,
    };
    post.comments.push(commentData);
    await post.save();
    res.status(200).json({
      message: "Comment added successfully",
    });
  }
  catch (error) {
    res.status(500).json({
      message: "Unexpected error, please try again later!",
    });
  }
};