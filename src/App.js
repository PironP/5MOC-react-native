import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Home from './screens/Home';
import List from './screens/List';
import Cat from './screens/Cat';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Overview'}}
        />
        <Stack.Screen
          name="List"
          component={List}
          options={{title: 'Cat List'}}
        />
        <Stack.Screen name="Cat" component={Cat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
