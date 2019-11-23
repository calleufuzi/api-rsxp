const { twitter  } = require("config");
const twitterCredential = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

const TwitterClass = require("../services/Twitter");
const Twitter = new TwitterClass(twitterCredential);

const listRecentTweets = async (req, res, next) => {
    try {
        const tweets = await Twitter.getRecentTweets(twitter.search_qty, twitter.search_key);
        res
            .status(200)
            .send({ message: "Tweets resgatado com sucesso", data: tweets });
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { listRecentTweets }