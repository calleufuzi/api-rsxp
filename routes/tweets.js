const express = require("express");
const router = express.Router();

const twitterCredential = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

const TwiterClass = require("../services/Twitter");
const Tweeter = new TwiterClass(twitterCredential);

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const tweets = await Tweeter.getRecentsTweet(40, "#code");
    res
      .status(200)
      .send({ message: "Tweets resgatado com sucesso", data: tweets });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
