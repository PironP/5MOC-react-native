import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Image, Button} from 'react-native';

export default function List({route, navigation}) {
  const {item} = route.params;

  const [uri, setUri] = useState();

  useEffect(() => {
    navigation.setOptions({title: item.name});
    fetchUrl();
  }, [fetchUrl, item.id, item.name, navigation]);

  const fetchUrl = useCallback(() => {
    fetch(
      `https://api.thecatapi.com/v1/images/search?format=json&breed_id=${
        item.id
      }`,
    )
      .then(response => response.json())
      .then(json => setUri(json[0].url))
      .catch(error => console.error(error));
  }, [item.id]);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri}} />
      <Button title="Reload" onPress={fetchUrl} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    backgroundColor: 'rgb(225, 225, 225)',
    borderRadius: 5,
    width: '80%',
    aspectRatio: 1,
  },
});
