var GOOGLE_FEED_API_URL =  "https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&num=50&q=";
var q = require('q');

var HttpService = { 
	get: function(url, callback) {
		var deferred = q.defer();

		fetch(GOOGLE_FEED_API_URL + encodeURIComponent(url))
			.then(function (response) {
				return response.text();
			})
			.then(function(body){
				var parsedBody = JSON.parse(body);
				var rss = parsedBody.responseData.feed;
				deferred.resolve(rss);
			});
			
		return deferred.promise;
	}

}

module.exports = HttpService;