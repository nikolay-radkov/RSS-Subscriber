var _  = require( 'lodash');

var React = require('react-native');
var { AsyncStorage } = React;
var q = require('q');

var StorageService  = (function(){
	function getNewId() {
		var deferred = q.defer();

		AsyncStorage.getItem('nextId', function(error, nextId){
			if(error){
				deferred.reject();
			}

			if(!nextId){
				nextId = 0;
			}

			nextId++;
			AsyncStorage.setItem('nextId', nextId);

			deferred.resolve(nextId);
		});
		
		return deferred.promise;
	}

	function setEntriesIndex(subscription) {
		subscription.entries.sort(function(a, b){
			return new Date(b.publishedDate) - new Date(a.publishedDate);
		});

		for (var i = 0; i < subscription.entries.length; i++) {
			subscription.entries[i].id = i;
		};
	}

	function getAll() {
		var deferred = q.defer();
		
		AsyncStorage.getItem('subscriptions', function(error, data){
			if(error) {
				deferred.reject(error);
			}

			deferred.resolve(JSON.parse(data));
		});
		

		return deferred.promise;
	}

	function add(item) {
		var deferred = q.defer();
debugger;
		getAll().then(function(subscriptions){
			if (!subscriptions) {
				subscriptions = [];
			}

			getNewId().then(function(nextId){
				item.id = nextId;
				setEntriesIndex(item);
				subscriptions.push(item);
				AsyncStorage.setItem('subscriptions', JSON.stringify(subscriptions));
				deferred.resolve();
			},
			function(){
				deferred.reject();
			})
			
		});

		return deferred.promise;
	}

	function getById(id) {
		var subscriptions = JSON.parse(localStorage.getItem('subscriptions'));
		var subscription = _.find(subscriptions, {id: id});

		return subscription;
	}
	
	function remove(id) {
		var subscriptions = JSON.parse(localStorage.getItem('subscriptions'));
		var index = _.findIndex(subscriptions, function(subscription) {
		  	return subscription.id == id;
		});
		subscriptions.splice(index, 1);
		localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
	}
	
	function update(id, item) {
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


	return {
		getNewId: getNewId,
		setEntriesIndex: setEntriesIndex,
		getAll: getAll,
		add: add,
		getById: getById,
		remove: remove,
		update: update
	}
}());

module.exports = StorageService;