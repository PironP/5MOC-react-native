import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Breed from '../../components/Breed';

export default function List({navigation}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/breeds')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  const handlePress = useCallback(
    item => {
      navigation.navigate('Cat', {item});
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={values => <Breed {...values} handlePress={handlePress} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
