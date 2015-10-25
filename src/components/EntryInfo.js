var React = require('react');
import { Link } from 'react-router';
import EntryStore from '../stores/entryStore';
import { NormalLayout } from './common';

import { 
	ListGroup,
	ListGroupItem,
	Grid,
	Row,
	Col,
	Button,
	Jumbotron
} from 'react-bootstrap';
var EntryInfo = React.createClass({
	getInitialState: function() {
		var ids = this.props.params.entryId.split('|');
		var subscriptionId = parseInt(ids[0], 10);
		var entryId = parseInt(ids[1], 10);
		var entry = EntryStore.getById(subscriptionId,entryId);
		return {
			subscriptionId: subscriptionId,
			entryId, entryId,
			entry: entry,
			__html: entry.content
		}
	},
	render: function() {
		var content = <div>
				<div className="entry-content">
					<h1>
						<a href={ this.state.entry.link} >
							{ this.state.entry.title}
						</a>
					</h1>
					<div className="entry-info">
						<i>by <strong>{ this.state.entry.author}</strong> 
						&nbsp;on&nbsp;<strong>{ new Date(this.state.entry.publishedDate).toLocaleString() }</strong>
						</i>
					</div>
					<div className="social-sharing">
						<a href={"https://www.facebook.com/sharer/sharer.php?u=" + this.state.entry.link} target="_blank">
							<img src="./images/facebook.png"/>
						</a>
	
						<a href={"https://plus.google.com/share?url=" + this.state.entry.link} target="_blank">
							<img src="./images/google.png"/>
						</a>
						<a href={"https://twitter.com/home?status=" + this.state.entry.link} target="_blank">
							<img src="./images/twitter.png"/>
						</a>
						<a href={"https://www.linkedin.com/shareArticle?mini=true&url=" + this.state.entry.link} target="_blank">
							<img src="./images/linkedin.png"/>
						</a>
					</div>
				</div>
				<div dangerouslySetInnerHTML={this.state} />
			</div>;

		return (
			<NormalLayout 
				content={content}
				toRoute={ '/entries/' + this.state.subscriptionId }
				message="Back"
				title='Entry Info'/>
		);
	}
}); 

module.exports = EntryInfo;