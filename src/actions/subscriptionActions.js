"use strict"

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import { HttpService, StorageService } from '../services';

var SubscriptionActions = {
	create: function(url) {
	    HttpService.get(url)
	 		.then(function(subscription){
	 			StorageService.add(subscription);

				Dispatcher.dispatch({
					actionType: ActionTypes.CREATE_SUBSCRIPTION,
					subscription: subscription
				});
	 		});	
	},
	updateAll: function() {
		var subscriptions = StorageService.getAll();

		for (var i=0; i< subscriptions.length; i++) {
			 this.update(subscriptions[i].id);
	 	}
	},
	update: function (id) {
		var subscription = StorageService.getById(id);

	    HttpService.get(subscription.feedUrl)
	 		.then(function(updatedSubscription){
	 			StorageService.update(updatedSubscription);
	 			updatedSubscription.id = id;
	 			
	 			Dispatcher.dispatch({
	 				actionType: ActionTypes.UPDATE_SUBSCRIPTION,
	 				subscription: updatedSubscription
	 			})
 			});
	},
	remove: function(id) {
		StorageService.remove(id);

		Dispatcher.dispatch({
			actionType: ActionTypes.DELETE_SUBSCRIPTION,
			id: id
		});
	},
};

module.exports = SubscriptionActions;