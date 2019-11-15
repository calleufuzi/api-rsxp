const twitterModule = require('twit');

class Twitter {

	constructor(credential) {
		if (!credential) throw new Error("No credentials provide");
		this.client = new twitterModule(credential)
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
	getRecentsTwits(twitsQty, searchKey){

  }

}

module.exports = TwitterStream;
