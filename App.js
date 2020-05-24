import React from 'react';
import { StyleSheet, Text, Platform, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import configureStore from './store';
import { PersistGate } from 'redux-persist/es/integration/react';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import DeckScreen from './screens/DeckScreen';
import MapScreen from './screens/MapScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingScreen from './screens/SettingScreen';
import { Icon } from 'react-native-elements';

class App extends React.Component {
  render() {
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    const { persistor, store } = configureStore();
    function main() {
      return (
        <Tab.Navigator
          tabBarOptions={{
            style: Platform.OS === 'android' && styles.containerForAndroid,
          }}
        >
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Icon
                    name="my-location"
                    size={20}
                    color={focused ? 'rgba(0, 122,255,1)' : 'gray'}
                  />
                );
              },
            }}
            name="Map"
            component={MapScreen}
          />
          <Tab.Screen
            options={{
              tabBarLabel: 'Jobs',
              tabBarIcon: ({ focused }) => {
                return (
                  <Icon
                    name="description"
                    size={20}
                    color={focused ? 'rgba(0, 122,255,1)' : 'gray'}
                  />
                );
              },
            }}
            name="Deck"
            component={DeckScreen}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Icon
                    name="favorite"
                    size={20}
                    color={focused ? 'rgba(0, 122,255,1)' : 'gray'}
                  />
                );
              },
            }}
            name="Review Jobs"
            component={MyStack}
          />
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
        <PersistGate persistor={persistor}>
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
        </PersistGate>
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
    paddingTop: 5,
    height: 60,
  },
  buttonSetting: {
    color: 'rgba(0, 122,255,1)',
    paddingRight: 12,
  },
});

export default App;
