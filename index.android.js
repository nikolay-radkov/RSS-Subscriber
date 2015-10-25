'use strict';

var React = require('react-native');

var Router = require('gb-native-router');
var Subscribe = require('./src/components/Subscribe');
//import InitializeActions from './actions/initializeActions';

//InitializeActions.initApp();

var {
  AppRegistry,
  View,
  Text,


  ScrollView 
} = React;

var HelloPage = React.createClass({

  nextPage: function() {
    this.props.toRoute({
      name: "A new screen",
      component: HelloPag
    });
  },

  render: function() {
    return (
      <ScrollView>dsa</ScrollView>
    );
  }
});





var firstRoute = {
  name: 'Welcome!',
  component: Subscribe
};
 
// The Router wrapper
var RSSStorage = React.createClass({
  render:function() {
    return (
      <Router firstRoute={firstRoute} />
    )
  }
});

AppRegistry.registerComponent('RSSStorage', () => RSSStorage);

