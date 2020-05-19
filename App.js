import React from 'react';
import { StyleSheet, Text, Platform, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import DeckScreen from './screens/DeckScreen';
import MapScreen from './screens/MapScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingScreen from './screens/SettingScreen';

class App extends React.Component {
  render() {
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();

    function main() {
      return (
        <Tab.Navigator
          tabBarOptions={{
            style: Platform.OS === 'android' && styles.containerForAndroid,
          }}
        >
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Deck" component={DeckScreen} />
          <Tab.Screen name="Review Jobs" component={MyStack} />
        </Tab.Navigator>
      );
    }

    function MyStack({ navigation }) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerRight: () => (
                <Text
                  style={styles.buttonSetting}
                  onPress={() => navigation.navigate('Setting')}
                >
                  Setting
                </Text>
              ),
            }}
            name="Review Jobs"
            component={ReviewScreen}
          />
          <Stack.Screen name="Setting" component={SettingScreen} />
        </Stack.Navigator>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              style: Platform.OS === 'android' && styles.containerForAndroid,
            }}
          >
            <Tab.Screen
              options={{ tabBarVisible: false }}
              name="Home"
              component={WelcomeScreen}
            />
            <Tab.Screen
              options={{ tabBarVisible: false }}
              name="Auth"
              component={AuthScreen}
            />
            <Tab.Screen
              options={{ tabBarVisible: false }}
              name="Main"
              component={main}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerForAndroid: {
    paddingBottom: 20,
    height: 60,
  },
  buttonSetting: {
    color: 'rgba(0, 122,255,1)',
    paddingRight: 12,
  },
});

export default App;
