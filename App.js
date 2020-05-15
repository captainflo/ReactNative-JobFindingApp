import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import DeckScreen from './screens/DeckScreen';
import MapScreen from './screens/MapScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingScreen from './screens/SettingScreen';
enableScreens();
class App extends React.Component {
  render() {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();

    function MyStack({ navigation }) {
      return (
        <Stack.Navigator initialRouteName="Review jobs">
          <Stack.Screen
            options={{
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('Setting')}
                  title="Setting"
                />
              ),
              headerStyle: {
                backgroundColor: '#f4511e',
                height: '120px',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
            name="Review"
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
          <Tab.Screen name="Review" component={MyStack} />
        </Tab.Navigator>
      );
    }

    return (
      <NavigationContainer>
        <Tab.Navigator>
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
});

export default App;
