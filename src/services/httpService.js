var $ = require('jquery-browserify');
var GOOGLE_FEED_API_URL =  "https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&num=50&q=";
var q = require('q');

class HttpService { 
	static get(url, callback) {
		var deferred = q.defer();

		var response = $.ajax({
			url: GOOGLE_FEED_API_URL + encodeURIComponent(url),
			type: 'GET',
 		    dataType: 'jsonp',
		    contentType : 'application/json',
			success: function (response) {
				var rss = response.responseData.feed;
				deferred.resolve(rss);
			},
			error: function(err) {
				deferred.reject(err);
			}
		});

		return deferred.promise;
	}

}

module.exports = HttpService;