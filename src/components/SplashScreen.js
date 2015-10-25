"use strict"

import React from 'react';
import { History } from 'react-router';

var SplashScreen = React.createClass({
	getInitialState: function() {
		return {
			intervalId: '',
			images: [],
			urls: [
				"images/android-icon-36x36.png",
				"images/android-icon-48x48.png",
				"images/android-icon-72x72.png",
				"images/android-icon-96x96.png",
				"images/android-icon-144x144.png",
				"images/android-icon-192x192.png"
			],
			currentIndex: 0,
			currentImage: 'images/android-icon-36x36.png'
		};
	},
	mixins: [History],
	componentWillUnmount:function() {
		clearInterval(this.state.intervalId);
	},
	componentWillMount: function() {
		var self = this;
		var images = [];
		var intervalId = '';

		for (var i=0; i < this.state.urls.length; i++) {
			let image = new Image();
			image.src = this.state.urls[i]
			images.push(image);
		}

		intervalId = setInterval(function(){
			var index = self.state.currentIndex + 1;

			if (index === images.length) {
				index = 0;
			}
			self.setState({
				currentImage: images[index].src,
				currentIndex: index
			});
		}, 170);

		self.setState({
			intervalId: intervalId
		})
	},
	componentDidMount: function() {
		var self = this;

		setTimeout(function(){
  			self.history.pushState(null, 'subscriptions');
		}, 6000);
	},

	render: function() {
		return (
			<div className="landing">
				<div className="header"> 
					<h1>R3S</h1>
				</div>
				<div className="footer">
					<img src={this.state.currentImage}/>
				</div>
				<div className="below-footer"></div>
			</div>
		);
	}
});

module.exports = SplashScreen;