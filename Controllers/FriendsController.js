const FriendsModel = require("../Models/FriendsModels");
const UserModel = require("../Models/UserModel");

exports.addFriend = async (req, res) => {
    try {
        const { friendId } = req.body;
        const { user } = req;
        const friend = await FriendsModel.findOne({ user: user._id });
        console.log(friend.friends.includes(friendId), "friend.friends.includes(friendId)")
        if (friend.friends.includes(friendId)) {
        return res.status(400).json({
            message: "You are already friends with this user",
        });
        }
        friend.friends.push(friendId);
        await friend.save();
        res.status(200).json({
        message: "Friend added successfully",
        });
    } catch (error) {
        res.status(500).json({
        message: "Unexpected error, please try again later!",
        });
    }
    }

exports.getFriends = async (req, res) => {
  try {
    const { user } = req;
    const friends = await FriendsModel.findOne({ user: user._id }).populate(
      "friends"
    );
    res.status(200).json({
      data: friends,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unexpected error, please try again later!",
    });
  }
};

exports.getAllUserList = async (req, res) => {
  try {
    let users = await UserModel.find({});
    const friends = await FriendsModel.findOne({ user: req.user._id });
    
    users = users.filter((user) => user._id != req.user._id);
    // users = users.filter((user) => !users._id.includes(friends.friends));
    console.log(users, "users")
    res.status(200).json({
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unexpected error, please try again later!",
    });
  }
};
exports.removeFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const friend = await FriendsModel.findOne({ user: user._id });
    if (!friend.friends.includes(id)) {
      return res.status(400).json({
        message: "You are not friends with this user",
      });
    }
    friend.friends = friend.friends.filter((friend) => friend != id);
    await friend.save();
    res.status(200).json({
      message: "Friend removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unexpected error, please try again later!",
    });
  }
};

exports.getFriendRequests = async (req, res) => {
  try {
    const { user } = req;
    const friends = await FriendsModel.find({ friends: user._id });
    res.status(200).json({
      data: friends,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unexpected error, please try again later!",
    });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const friend = await FriendsModel.findOne({ user: user._id });
    if (friend.friends.includes(id)) {
      return res.status(400).json({
        message: "You are already friends with this user",
      });
    }
    friend.friends.push(id);
    await friend.save();
    res.status(200).json({
      message: "Friend added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unexpected error, please try again later!",
    });
  }
};

exports.declineFriendRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const friend = await FriendsModel.findOne({ user: user._id });
    if (!friend.friends.includes(id)) {
      return res.status(400).json({
        message: "You are not friends with this user",
      });
    }
    friend.friends = friend.friends.filter((friend) => friend != id);
    await friend.save();
    res.status(200).json({
      message: "Friend removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unexpected error, please try again later!",
    });
  }
};
