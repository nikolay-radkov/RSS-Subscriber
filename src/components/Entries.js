var React = require('react');

import EntryStore from '../stores/entryStore';
import SubscriptionActions from '../actions/subscriptionActions';
import { Link } from 'react-router';
import { 
	ListGroup,
	ListGroupItem,
	Grid,
	Row,
	Col,
	Button
} from 'react-bootstrap';

import { PullDownLayout } from './common';

var Entries = React.createClass({
	getInitialState: function() {
		var id = parseInt(this.props.params.id, 10);
		var entries = EntryStore.getAllById(id);
		return { 
			id: id,
			entries: entries
		};
	},

	componentWillMount: function () {
		EntryStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function () {
		EntryStore.removeChangeListener(this._onChange);
	},

	componentDidMount:function() {
        WebPullToRefresh.init( {
            loadingFunction: this.refresh
        } );
	},

	_onChange: function () {
		var entries = EntryStore.getAllById(this.state.id);
		this.setState({ entries: entries });
	},

  	refresh: function() {
  		var self = this;

  		return new Promise( function( resolve, reject ) {

			SubscriptionActions.update(self.state.id);

			resolve();
		});
  	},

	render: function() {
		var content;
		var self = this;
		if (this.state.entries && this.state.entries.length > 0) {
			content = this.state.entries.map(function (entry) {
				return <div key={entry.id} className="list-item text-center">
					<div className="info">
						<div className="title">
							<Link to={`/entry/${self.state.id + '|' + entry.id}`}>
								{entry.title}
							</Link>
						</div>
						<div className="date">
							<i>{ new Date(entry.publishedDate).toLocaleString() }</i>
						</div>
					</div>
				</div>
			})
		} else {
			content = <h1>No elements added yet</h1>;
		}

		return (
			<PullDownLayout 
				content={content} 
				toRoute='/subscriptions' 
				message='Home' 
				title='Entries'/>
		);
	}
});

module.exports = Entries;