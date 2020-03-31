import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Home from './screens/Home';
import List from './screens/List';
import Drink from './screens/Drink';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: '🍹🍸🍷'}}
        />
        <Stack.Screen
          name="List"
          component={List}
          options={{title: 'Drink List'}}
        />
        <Stack.Screen name="Drink" component={Drink} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
