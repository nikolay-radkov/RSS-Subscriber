'use strict';

var React = require('react-native');

var Router = require('gb-native-router');
var Subscriptions = require('./src/components/Subscriptions');
//import InitializeActions from './actions/initializeActions';

//InitializeActions.initApp();

var {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  View,
  TouchableHighlight,
  ScrollView
} = React;


var HelloPag = React.createClass({

  nextPage: function() {
    this.props.toRoute({
      name: "A new screen",
      component: HelloPage
    });
  },

  render: function() {
    return (
      <View>
        <TouchableHighlight onPress={this.nextPage} underlayColor="transparent">
          <Text>Next dsada please!</Text>
        </TouchableHighlight>
      </View>
    );
  }
});



var HelloPage = React.createClass({

  nextPage: function() {
    this.props.toRoute({
      name: "A new screen",
      component: HelloPag
    });
  },

  render: function() {
    return (
      <Subscriptions />
     
    );
  }
});

// Your route object should contain at least:
// - The name of the route (which will become the navigation bar title)
// - The component object for the page to render
var firstRoute = {
  name: 'Welcome!',
  component: HelloPage
};

// The Router wrapper
var RSSStorage = React.createClass({
  render() {
    return (
      <Router firstRoute={firstRoute} />
    )
  }
});

AppRegistry.registerComponent('RSSStorage', () => RSSStorage);


/*
var Route = require('react-router');
var Router = require('react-router');
var Router = require('react-router');
var DefaultRoute = require('react-router');






var HelloPage = React.createClass({
  render: function() {
    return (
      <View> 
  <Text> Hello worlds!</Text>
      </View>
    ); 
  }
})


var routes =  (
    <Route path="/" component={HelloPage}>
      <IndexRoute component={HelloPage}/>
      <Route path="subscribe" component={HelloPage}/>
      <Route path="entries/:id" component={HelloPage}/>
      <Route path="/entry/:entryId" component={HelloPage}/>
      <Route path="subscriptions" component={HelloPage}/>
      <Route path="*" component={HelloPage}/>
    </Route>
);

var RSSStorage = React.createClass({


  render:function() {
     <Router>
    {routes}
  </Router>
  }

});

 AppRegistry.registerComponent('RSSStorage', () => RSSStorage);*/