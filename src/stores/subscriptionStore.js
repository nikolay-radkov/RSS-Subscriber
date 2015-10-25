"use strict";

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import { EventEmitter } from 'events';
import { StorageService } from '../services';
import _ from 'lodash';
const CHANGE_EVENT = 'change';

var _subscriptions = [];

var SubscriptionStore = Object.assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback){
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback);
	},
	emitChange: function(callback){
		this.emit(CHANGE_EVENT);
	},
	getAll: function() {
		return _subscriptions;
	},
	getById: function(id) {
		return _.find(_subscriptions,{id: id});
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case ActionTypes.INITIALIZE :
			_subscriptions = action.initialData.subscriptions;
			SubscriptionStore.emitChange();
			break;
		case ActionTypes.CREATE_SUBSCRIPTION :
			_subscriptions.push(action.subscription);
			SubscriptionStore.emitChange();
			break;
		case ActionTypes.DELETE_SUBSCRIPTION :
			 _.remove(_subscriptions, function(subscription) {
			  	return subscription.id == action.id;
			});
			SubscriptionStore.emitChange();
			break;
		case ActionTypes.UPDATE_SUBSCRIPTION :
			 var index = _.findIndex(_subscriptions, function(subscription) {
			  	return subscription.id == action.subscription.id;
			});

		 	_subscriptions.splice(index, 1, action.subscription);

			SubscriptionStore.emitChange();
			break;
	}
});

module.exports = SubscriptionStore;