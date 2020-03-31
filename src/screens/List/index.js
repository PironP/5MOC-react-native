import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import queryString from 'query-string';
import Drink from '../../components/Drink';
import {COCKTAIL_API} from '../../Constants';

export default function List({navigation}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${COCKTAIL_API}?${queryString.stringify({f: 'a'})}`)
      .then(response => response.json())
      .then(json => setData(json.drinks))
      .catch(error => console.error(error));
  }, []);

  const handlePress = useCallback(
    item => {
      navigation.navigate('Drink', {item});
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={values => <Drink {...values} handlePress={handlePress} />}
        keyExtractor={item => item.idDrink}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(70,49,104)',
  },
});
