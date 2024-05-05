const {
addFriend,
getFriends,
removeFriend,
getFriendRequests,
acceptFriendRequest,
declineFriendRequest,
} = require("../Controllers/FriendsController");
const express = require("express");
const router = express.Router();

router.route("/").post(addFriend).get(getFriends);
router.route("/remove/:id").delete(removeFriend);
router.route("/requests").get(getFriendRequests);
router.route("/accept/:id").patch(acceptFriendRequest);
router.route("/decline/:id").patch(declineFriendRequest);

module.exports = router;