var React  = require( 'react-native');
var { 
	StorageService, 
	HttpService 
}  = require( '../services');


var {
	TextInput,
	View,
	TouchableHighlight,
	Text
} = React;

//var SubscriptionStore  = require( '../stores/subscriptionStore');
//var SubscriptionActions  = require( '../actions/subscriptionActions');
//var { NormalLayout }  = require( './common');

var Subscribe = React.createClass({
	getInitialState: function() {
		return {url: ''};
  	},
  	handleChange: function() {
	    this.setState({
	      url: this.refs.input.getValue()
	    });
  	},
  	componentWillMount: function() {
  	//	SubscriptionStore.addChangeListener(this._onCreate);
  	},
  	componentWillUnmount: function() {
  	//	SubscriptionStore.removeChangeListener(this._onCreate);
  	},
  	_onCreate: function() {
  	//	toastr.success('RSS added successfully');
  	//	this.history.pushState(null, 'subscriptions');
  	},
  	submit: function(event) {
  		event.preventDefault();
		HttpService.get(this.state.url).then(function(item){
			StorageService.add(item);
		});
  	},
	render: function(argument) {
				return ( <View>
				 <TextInput
				    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
				    onChangeText={(url) => this.setState({url})}
   					 value={this.state.url}/>
					  <TouchableHighlight onPress={this.submit}>
					  	<Text>Add</Text>
					  </TouchableHighlight>
			      
		     </View>
		);
	}
});

module.exports = Subscribe;