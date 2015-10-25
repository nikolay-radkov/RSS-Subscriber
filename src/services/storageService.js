import _ from 'lodash';

class StorageService  {
	static getNewId() {
		var nextId = localStorage.getItem('nextId');
		if(!nextId){
			nextId = 0;
		}

		nextId++;
		localStorage.setItem('nextId', nextId);
		return nextId;
	}
	static setEntriesIndex(subscription) {
		subscription.entries.sort(function(a, b){
			return new Date(b.publishedDate) - new Date(a.publishedDate);
		});

		for (var i = 0; i < subscription.entries.length; i++) {
			subscription.entries[i].id = i;
		};
	}
	static getAll() {
		return JSON.parse(localStorage.getItem('subscriptions'));
	}
	static add(item) {
		var subscriptions = JSON.parse(localStorage.getItem('subscriptions'));
		if (!subscriptions) {
			subscriptions = [];
		}
		item.id = this.getNewId();
		this.setEntriesIndex(item);
		subscriptions.push(item);
		localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
	}
	static getById(id) {
		var subscriptions = JSON.parse(localStorage.getItem('subscriptions'));
		var subscription = _.find(subscriptions, {id: id});

		return subscription;
	}
	static remove(id) {
		var subscriptions = JSON.parse(localStorage.getItem('subscriptions'));
		var index = _.findIndex(subscriptions, function(subscription) {
		  	return subscription.id == id;
		});
		subscriptions.splice(index, 1);
		localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
	}
	static update(id, item) {
		var subscriptions = JSON.parse(localStorage.getItem('subscriptions'));
		var index = _.findIndex(subscriptions, function(subscription) {
		  	return subscription.id == id;
		});

		if (index >= 0) {
			item.id = id;
			subscriptions[index] = item;
			localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
		}
	}
}

module.exports = StorageService;