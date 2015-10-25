"use strict";

var dispatcher  = require( '../dispatcher/appDispatcher');
var ActionTypes  = require( '../constants/actionTypes');
var createStore = require('flux-util').createStore;

var { StorageService }  = require( '../services');
var _  = require( 'lodash');
const CHANGE_EVENT = 'change';

var _subscriptions = [];

var EntryStore = createStore({
	getAllById(id) {
		var subscription = _.find(_subscriptions,{id: id});
		if (subscription) {
			return subscription.entries;
		}
		
		//TODO: redirect
		return [];
	},
	getById(subscriptionId, entryId) {
		var entries = this.getAllById(subscriptionId);

		var entry = _.find(entries, {id: entryId});
		return entry;
	},
	dispatcherIndex: dispatcher.register((action) => {
		switch(action.actionType) {
			case ActionTypes.INITIALIZE :
				_subscriptions = action.initialData.subscriptions;
				EntryStore.emitChange(action.actionType);
				break;
			case ActionTypes.UPDATE_SUBSCRIPTION :
				var index = _.findIndex(_subscriptions, function(subscription) {
				  	return subscription.id == ation.subscription.id;
				});

				if(index >= 0) {
					_subscriptions[index] = action.subscription;
					EntryStore.emitChange(action.actionType);
				}
				break;
			case ActionTypes.UPDATE_SUBSCRIPTION :
				 var index = _.findIndex(_subscriptions, function(subscription) {
				  	return subscription.id == action.subscription.id;
				});

			 	_subscriptions.splice(index, 1, action.subscription);

				EntryStore.emitChange(action.actionType);
				break;

		}

		return true;
	})
});

module.exports = EntryStore;