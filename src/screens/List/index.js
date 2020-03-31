import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Drink from '../../components/Drink';

export default function List({navigation}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
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
  },
});
