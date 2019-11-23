const { twitter_config } = require("config");
const { search_key, search_qty } = twitter_config

const twitterCredential = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

const TwitterClass = require("../services/Twitter");
const Twitter = new TwitterClass(twitterCredential);
const { formatTweet } = require('../helpers/tweet-formater')

const listRecentTweets = async (req, res) => {
    try {
        const tweets = await Twitter.getRecentTweets(search_qty, search_key);
        res
            .status(200)
            .send({ message: "Tweets resgatado com sucesso", data: tweets });
    } catch (error) {
        throw new Error(error);
    }
}

const streamTweets = (io) => {
    Twitter.tweetStream(search_key).on("tweet", tweet => {
        const formatedTweet = formatTweet(tweet)
        io.emit("tweet", { tweet: formatedTweet });
    });
}

module.exports = { listRecentTweets, streamTweets }