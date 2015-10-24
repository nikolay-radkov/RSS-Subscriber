'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  View,
  TouchableHighlight,
} = React;

var _getRandomRoute = function() {
  return {
    title: '#' + Math.ceil(Math.random() * 1000),
  };
};

var HelloPage = React.createClass({
   _renderScene: function(route, navigator) {
      console.log('Log message');
    return (
      <View>
        <Text> Hello worlds!</Text>
      </View>
    );
  },
  render: function() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={_getRandomRoute()}
        renderScene={this._renderScene}
         configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromBottom;
          }}  
      />
    ); 
  }
})


var RSSStorage = React.createClass({
  routeTo: function(routeName, resourceId) {
   
  },
  render: function() {
    return (
      <View>
        <Navigator
          style={styles.container}
          initialRoute={{
            index: 0,
            name: "home"
          }}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromBottom;
          }}  
          renderScene={(route, navigator) =>
            {
              switch (route.name) {
                case 'entries':
                  return <HelloPage />;
                  break;
                case 'entryInfo':
                  return <HelloPage />;
                  break;
                case 'subscribe':
                  return <HelloPage />;
                  break;
                default:
                  return <HelloPage />;
                  break;
              }
            }
          }
        /> 
      </View>
    );
  }
});

var styles = StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  }
});

 AppRegistry.registerComponent('RSSStorage', () => RSSStorage);