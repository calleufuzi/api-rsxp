const formatTweet = ({ text, user, entities, id } ) => {
    return {
        id,
        text,
        userScreenName: "@" + user.screen_name,
        userImage: user.profile_image_url_https,
        userDescription: user.description,
        image:
            entities.media && entities.media[0]
                ? entities.media[0].media_url_https
                : null
    }
}

module.exports = { formatTweet }