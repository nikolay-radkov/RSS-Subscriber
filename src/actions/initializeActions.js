"use strict"

var Dispatcher  = require( '../dispatcher/appDispatcher');
var ActionTypes  = require( '../constants/actionTypes');
var { StorageService }  = require( '../services');

var InitializeActions = {
	initApp: function() {
		var  subscriptions = StorageService.getAll();

		Dispatcher.dispatch({
			actionType: ActionTypes.INITIALIZE,
			initialData: {
				subscriptions: subscriptions
			}
		});
	}
};

module.exports = InitializeActions;