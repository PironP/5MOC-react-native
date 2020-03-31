import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default function Drink({route, navigation}) {
  const {item} = route.params;

  const [data, setData] = useState([]);

  useEffect(() => {
    navigation.setOptions({title: item.strDrink});
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${item.idDrink}`,
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
      <Text style={styles.category}>Type: {data.strCategory}</Text>
      <Image style={styles.image} source={{uri: data.strDrinkThumb}} />
      <Text style={styles.instructions}>How to : {data.strInstructions}</Text>
      {data.strAlcoholic === 'Non alcoholic' && (
        <Image
          style={styles.warning}
          source={{
            uri: 'https://www.sojennie.paris/img/cms/O_Alcool_EN.png',
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  category: {
    fontSize: 18,
    marginBottom: 20,
  },
  instructions: {
    backgroundColor: 'rgb(225, 225, 225)',
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  warning: {
    width: '30%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  image: {
    backgroundColor: 'rgb(225, 225, 225)',
    borderRadius: 5,
    width: '50%',
    aspectRatio: 1,
    marginBottom: 20,
  },
});
