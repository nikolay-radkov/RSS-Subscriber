import React from 'react';
import { History } from 'react-router';
import { 
	Input, 
	ButtonInput
} from 'react-bootstrap';

import { 
	StorageService, 
	HttpService 
} from '../services';

import SubscriptionStore from '../stores/subscriptionStore';
import SubscriptionActions from '../actions/subscriptionActions';
import { NormalLayout } from './common';

var Subscribe = React.createClass({
	getInitialState: function() {
		return {url: ''};
  	},
  	mixins: [History],
  	handleChange: function() {
	    this.setState({
	      url: this.refs.input.getValue()
	    });
  	},
  	componentWillMount: function() {
  		SubscriptionStore.addChangeListener(this._onCreate);
  	},
  	componentWillUnmount: function() {
  		SubscriptionStore.removeChangeListener(this._onCreate);
  	},
  	_onCreate: function() {
  		toastr.success('RSS added successfully');
  		this.history.pushState(null, 'subscriptions');
  	},
  	submit: function(event) {
  		event.preventDefault();

		SubscriptionActions.create(this.state.url);
  	},
	render: function(argument) {
		var content = <form className="subscribe">
				<div className="logo">
					<img src="./images/apple-icon.png"/>
				</div>
				<div>
					<Input
				        type="text"
				        value={this.state.url}
				        placeholder="http://your-web-site.com/rss"
				        label="Enter the url of rss that you want to store"
				        bsStyle="warning"
				        ref="input"
				        groupClassName="group-class"
				        labelClassName="label-class"
				        onChange={this.handleChange} 
				    />
			    </div>
			    <div>
			      	<ButtonInput 
			      		type="submit" 
			      		value="Add" 
			      		bsStyle="info" 
			      		bsSize="large"
						onClick={this.submit}
			      		/>
	      		</div>
		     </form>
		return (
			<NormalLayout 
				content={content}
				toRoute="/subscriptions" 
				message="Home"
				title="Subscribe"/>
		);
	}
});

module.exports = Subscribe;