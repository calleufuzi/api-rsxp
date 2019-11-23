const express = require("express");
const router = express.Router();
const { listRecentTweets } = require("../controllers/tweetController")

/* GET tweets listing. */
router.get("/", listRecentTweets);

module.exports = router;
