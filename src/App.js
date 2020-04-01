import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import queryString from 'query-string';
import Home from './screens/Home';
import List from './screens/List';
import Drink from './screens/Drink';
import {COCKTAIL_API} from './Constants';

const Stack = createStackNavigator();
export const Store = React.createContext();

export default function App() {
  const [store, setStore] = useState({});

  useEffect(() => {
    fetch(`${COCKTAIL_API}?${queryString.stringify({f: 'a'})}`)
      .then(response => response.json())
      .then(json => setStore({drinks: json.drinks}))
      .catch(error => console.error(error));
  }, []);

  return (
    <Store.Provider value={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
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
    </Store.Provider>
  );
}
