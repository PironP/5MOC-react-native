import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import queryString from 'query-string';
import Home from './screens/Home';
import List from './screens/List';
import Drink from './screens/Drink';
import {COCKTAIL_API} from './Constants';

const Stack = createStackNavigator();
export const Store = React.createContext();

const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value !== null) {
      return value;
    }
  } catch (error) {
    return;
  }
};

const urls = Array.from('abcde').map(
  letter => `${COCKTAIL_API}?${queryString.stringify({f: letter})}`,
);

export default function App() {
  const [drinks, setDrinks] = useState({});
  const [videosIds, setVideosIds] = useState({});

  useEffect(() => {
    (async () => {
      const storedDrinks = await getData('drinks');

      if (storedDrinks) {
        console.log('Use cached data...');
        setDrinks(JSON.parse(storedDrinks));
        return;
      }

      console.log('Fetching data...');

      Promise.all(urls.map(url => fetch(url).then(response => response.json())))
        .then(jsonArray => {
          const apiDrinks = jsonArray.reduce(
            (acc, cur) => [...acc, ...cur.drinks],
            [],
          );

          setDrinks(apiDrinks);
          setData('drinks', JSON.stringify(apiDrinks));
        })
        .catch(error => console.error(error));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const storedVideosIds = await getData('videosIds');

      console.log('Stored VideosIds:', storedVideosIds);

      if (storedVideosIds) {
        setVideosIds(JSON.parse(storedVideosIds));
      }
    })();
  }, []);

  const store = {
    drinks,
    videosIds,
    setVideosIds: newVideosIds => {
      setVideosIds(newVideosIds);
      setData('videosIds', JSON.stringify(newVideosIds));
    },
  };

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
