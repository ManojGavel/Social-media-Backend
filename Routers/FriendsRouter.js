const { protect } = require("../Controllers/AuthController");
const {
addFriend,
getFriends,
removeFriend,
getFriendRequests,
acceptFriendRequest,
declineFriendRequest,
getAllUserList
} = require("../Controllers/FriendsController");
const express = require("express");
const router = express.Router();

router.route("/").post(protect,addFriend).get(protect,getFriends);
router.route("/remove/:id").delete(protect,removeFriend);
router.route("/requests").get(protect,getFriendRequests);
router.route("/accept/:id").patch(protect,acceptFriendRequest);
router.route("/decline/:id").patch(protect,declineFriendRequest);
router.route("/friendsList").get(protect,getAllUserList);

module.exports = router;