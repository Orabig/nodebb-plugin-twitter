'use strict';

/* globals document, $ */

$(document).ready(function () {
	// Inject twitter widget into footer
	var scriptEl = document.createElement('script');
	scriptEl.async = 'async';
	scriptEl.src = '//platform.twitter.com/widgets.js';
	scriptEl.charset = 'utf-8';

	document.head.appendChild(scriptEl);

	function delayedLoad(el) {
		if (!twttr) {
			return setTimeout(delayedLoad, 1000, el);
		}
		twttr.widgets.load(el);
	}

	$(window).on('action:posts.loaded action:topic.loaded action:posts.edited', function () {
		delayedLoad($('ul[component="topic"]').get(0));
	});
	$(window).on('action:ajaxify.end', () => {
		if (!ajaxify.data.template.topic) {
			const target = $('blockquote.twitter-tweet');
			target.each((i, el) => {
				delayedLoad(el);
			});
		}
	});
});