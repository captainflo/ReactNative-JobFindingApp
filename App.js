import React from 'react';
import { StyleSheet, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

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

    function main() {
      return (
        <Tab.Navigator>
          <Tab.Screen name="Deck" component={DeckScreen} />
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Review Jobs" component={MyStack} />
        </Tab.Navigator>
      );
    }

    return (
      <NavigationContainer>
        <Tab.Navigator style={styles.containerForAndroid}>
          <Tab.Screen name="Home" component={WelcomeScreen} />
          <Tab.Screen name="Settings" component={AuthScreen} />
          <Tab.Screen name="Main" component={main} />
        </Tab.Navigator>
      </NavigationContainer>
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
    color: 'red',
  },
  buttonSetting: {
    color: Platform.OS === 'android' ? 'red' : 'rgba(0, 122,255,1)',
    paddingRight: 10,
  },
});

export default App;
