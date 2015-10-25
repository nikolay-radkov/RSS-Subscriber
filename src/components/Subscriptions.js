var React = require('react-native');
//var SubscriptionStore = require( '../stores/subscriptionStore');
//var SubscriptionActions = require( '../actions/subscriptionActions');

var{ StorageService } = require('../services');

var { 
	View,
	TouchableHighlight
} = React;

var Subscriptions = React.createClass({
	getInitialState: function() {
		var subscriptions = StorageService.getAll();
		return { 
			subscriptions: subscriptions
		}
	},

	componentDidMount:function() {
       
	},

	_onChange: function () {
		this.setState({ subscriptions: StorageService.getAll() });
	},

	deleteSubscription: function (id) {
		StorageService.remove(id);
	},

  	refresh: function() {
  		/*return new Promise( function( resolve, reject ) {

			SubscriptionActions.updateAll();

			resolve();
		});*/
  	},

  	nextPage: function() {

  	},

	render: function(argument) {
		console.log('Log message');
		var content;
		var self = this;
		if (this.state.subscriptions && this.state.subscriptions.length > 0) {
			content = this.state.subscriptions.map(function (subscription) {
				var index = subscription.feedUrl.indexOf('//') + 2;
				index = subscription.feedUrl.indexOf('/', index);
				var url = subscription.feedUrl.substring(0, index);

				return <TouchableHighlight key={subscription.id}  onPress={self.nextPage} underlayColor="transparent" className="list-item">
					<View className="info">
						/*<Image src={ url + "/favicon.ico" } className="favicon"/>*/
						<View className="title">
							{subscription.title}
						</View>
						/*<View className="link">
							<i>Link:</i> <a href={subscription.feedUrl}>{subscription.feedUrl}</a>		
						</View>
						<View className="date">
							<i>Updated at: { new Date(subscription.entries[0].publishedDate).toLocaleString() }</i>
						</View>*/
					</View>
					<View className="buttons">
					 	<TouchableHighlight bsStyle="danger" onPress={self.deleteSubscription.bind(self, subscription.id)}>Delete</TouchableHighlight>
					</View>
				</TouchableHighlight>
			})
		} else {
			content = <View>No elements added yet</View>;
		}

		return (
			 <View>
			 	{content}
		      </View>
		);
	}
});

module.exports = Subscriptions;