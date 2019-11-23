const twitterModule = require("twit");

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
              tweetArray = data.statuses.map(({ text, user, entities }) => {
                return {
                  text,
                  userScreenName: "@" + user.screen_name,
                  userImage: user.profile_image_url_https,
                  userDescription: user.description,
                  image:
                    entities.media && entities.media[0]
                      ? entities.media[0].media_url_https
                      : null
                };
              });
              res(tweetArray);
            } else {
              throw new Error("No tweets Found!");
            }
          }
        );
      }
    });
  }

  tweetStream(searchKey) {
    const stream = this.client.stream("statuses/filter", {
      track: searchKey
    });
    return stream;
  }
}

module.exports = TwitterStream;
