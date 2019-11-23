const twitterModule = require("twit");
const { formatTweet } = require('../helpers/tweet-formater')

class Twitter {
  constructor(credential) {
    if (!credential) throw new Error("No credentials provide");
    this.client = new twitterModule(credential);
  }
}

class TwitterStream extends Twitter {
  constructor(credential) {
    super(credential);
  }

  /**
   * @description search for most recently twits
   * @param {number} twitsQty number of twitts to get
   * @param {string} searchKey search key for twits
   */
  getRecentTweets(twitsQty, searchKey) {
    return new Promise((res, rej) => {
      if (twitsQty && searchKey) {
        this.client.get(
          "search/tweets",
          { q: searchKey, count: twitsQty },
          (err, data, response) => {
            let tweetArray = [];

            if (err) throw new Error(err);

            if (data && data.statuses.length > 0) {
              tweetArray = data.statuses.map((tweet) => formatTweet(tweet));
              res(tweetArray);
            } else {
              throw new Error("No tweets Found!");
            }
          }
        );
      }else{
        throw new Error("Tweets quantity and search key is required")
      }
    });
  }

  /**
   * @description get stream of tweets
   * @param {string} searchKey search key for twits
   */
  tweetStream(searchKey) {
    const stream = this.client.stream("statuses/filter", {
      track: searchKey
    });
    return stream;
  }
}

module.exports = TwitterStream;
