"use strict";

var dispatcher  = require( '../dispatcher/appDispatcher');
var ActionTypes  = require( '../constants/actionTypes');
var createStore = require('flux-util').createStore;

var { StorageService }  = require( '../services');
var _  = require( 'lodash');

const CHANGE_EVENT = 'change';

var _subscriptions = [];

var SubscriptionStore = createStore({
	getAll() {
		return _subscriptions;
	},
	getById(id) {
		return _.find(_subscriptions,{id: id});
	},
	dispatcherIndex: dispatcher.register((action) => {
	    switch(action.actionType) {
		case ActionTypes.INITIALIZE :
			_subscriptions = action.initialData.subscriptions;
			SubscriptionStore.emitChange(action.actionType);
			break;
		case ActionTypes.CREATE_SUBSCRIPTION :
			_subscriptions.push(action.subscription);
			SubscriptionStore.emitChange(action.actionType);
			break;
		case ActionTypes.DELETE_SUBSCRIPTION :
			 _.remove(_subscriptions, function(subscription) {
			  	return subscription.id == action.id;
			});
			SubscriptionStore.emitChange(action.actionType);
			break;
		case ActionTypes.UPDATE_SUBSCRIPTION :
			 var index = _.findIndex(_subscriptions, function(subscription) {
			  	return subscription.id == action.subscription.id;
			});

		 	_subscriptions.splice(index, 1, action.subscription);

			SubscriptionStore.emitChange(action.actionType);
			break;
		}

	    return true;
	  })
})

module.exports = SubscriptionStore;