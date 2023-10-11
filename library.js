"use strict";

const Twitter = module.exports;
const embed = '<blockquote class="content twitter-tweet" lang="en"><a href="https://x.com/$1/status/$2"></a></blockquote>';

Twitter.parse = function (data) {
	const regularUrl = /<a href="(?:https?:\/\/)?(?:(?:(?:mobile|www)\.)?(?:x|twitter)\.com)\/([^\/"\s]*)\/statuse?s?\/([^\/"\s]*)(\/photo\/\d|)".*?>.+?<\/a>/g
	const postContent = data && data.postData && data.postData.content;

	if (postContent && postContent.match(regularUrl)) {
		data.postData.content = postContent.replace(regularUrl, embed);
	}
	return data;
};

