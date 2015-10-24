class Subscription extends Object {
	constructor: function(favicon, name, url, updatedAt) {
		if(!favicon && !name && !url && !updatedAt) {
			throw "Unspecified field";
		}

		this.favicon = favicon;
		this.name = name;
		this.url = url;
		this.updatedAt = updatedAt;
	}
}

module.exports = Subscription;