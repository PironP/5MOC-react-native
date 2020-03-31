import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default function Drink({route, navigation}) {
  const {item} = route.params;

  const [data, setData] = useState([]);

  useEffect(() => {
    navigation.setOptions({title: item.strDrink});
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${
        item.idDrink
      }`,
    )
      .then(response => response.json())
      .then(json => {
        console.log(('rest', json.drinks[0]));
        setData(json.drinks[0]);
      })
      .catch(error => console.error(error));
  }, [item.strDrink, item.idDrink, data.strDrinkThumb, navigation]);

  return (
    <View style={styles.container}>
      <Text>{data.strCategory}</Text>
      <Image style={styles.image} source={{uri: data.strDrinkThumb}} />
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
