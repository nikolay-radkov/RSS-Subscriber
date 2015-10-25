"use strict";

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import { EventEmitter } from 'events';
import { StorageService } from '../services';
import _ from 'lodash';
const CHANGE_EVENT = 'change';

var _subscriptions = [];

var EntryStore = Object.assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback){
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback);
	},
	emitChange: function(callback){
		this.emit(CHANGE_EVENT);
	},
	getAllById: function(id) {
		var subscription = _.find(_subscriptions,{id: id});
		if (subscription) {
			return subscription.entries;
		}
		
		//TODO: redirect
		return [];
	},
	getById: function(subscriptionId, entryId) {
		var entries = this.getAllById(subscriptionId);

		var entry = _.find(entries, {id: entryId});
		return entry;
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case ActionTypes.INITIALIZE :
			_subscriptions = action.initialData.subscriptions;
			EntryStore.emitChange();
			break;
		case ActionTypes.UPDATE_SUBSCRIPTION :
			var index = _.findIndex(_subscriptions, function(subscription) {
			  	return subscription.id == ation.subscription.id;
			});

			if(index >= 0) {
				_subscriptions[index] = action.subscription;
				EntryStore.emitChange();
			}
			break;
		case ActionTypes.UPDATE_SUBSCRIPTION :
			 var index = _.findIndex(_subscriptions, function(subscription) {
			  	return subscription.id == action.subscription.id;
			});

		 	_subscriptions.splice(index, 1, action.subscription);

			EntryStore.emitChange();
			break;

	}
});

module.exports = EntryStore;