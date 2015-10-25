"use strict"

import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';
import { StorageService } from '../services';

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