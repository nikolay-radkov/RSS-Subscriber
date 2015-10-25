var React = require('react-native');
var SubscriptionStore = require( '../stores/subscriptionStore');
var SubscriptionActions = require( '../actions/subscriptionActions');

var { 
	View,
	TouchableHighlight
} = React;

var Subscriptions = React.createClass({
	getInitialState: function() {
		var subscriptions = SubscriptionStore.getAll();
		return { 
			subscriptions: subscriptions
		}
	},

	componentWillMount: function () {
		SubscriptionStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function () {
		SubscriptionStore.removeChangeListener(this._onChange);
	},

	componentDidMount:function() {
        WebPullToRefresh.init({
            loadingFunction: this.refresh
        });
	},

	_onChange: function () {
		this.setState({ subscriptions: SubscriptionStore.getAll() });
	},

	deleteSubscription: function (id) {
		toastr.error('RSS deleted successfully');
		SubscriptionActions.remove(id);
	},

  	refresh: function() {
  		return new Promise( function( resolve, reject ) {

			SubscriptionActions.updateAll();

			resolve();
		});
  	},

	render: function(argument) {
		var content;
		var self = this;
		if (this.state.subscriptions && this.state.subscriptions.length > 0) {
			content = this.state.subscriptions.map(function (subscription) {
				var index = subscription.feedUrl.indexOf('//') + 2;
				index = subscription.feedUrl.indexOf('/', index);
				var url = subscription.feedUrl.substring(0, index);

				return <TouchableHighlight key={subscription.id}  onPress={this.nextPage} underlayColor="transparent" className="list-item">
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
					 	<Button bsStyle="danger" onClick={self.deleteSubscription.bind(self, subscription.id)}>Delete</Button>
					</View>
				</TouchableHighlight>
			})
		} else {
			content = <h1>No elements added yet</h1>;
		}

		return (
			 <View>
			 	{content}
		      </View>
		);
	}
});

module.exports = Subscriptions;