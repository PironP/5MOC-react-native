import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default function Drink({item, handlePress}) {
  const {strDrink, strInstructions, strAlcoholic, strDrinkThumb} = item;

  return (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: strDrinkThumb}} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{strDrink}</Text>
          <Text style={styles.instructions}>
            {strInstructions.substring(0, 100)}
            {strInstructions.length > 100 && '...'}
          </Text>
          <Text style={styles.info}>{strAlcoholic}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    padding: 15,
    display: 'flex',
    marginRight: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  instructions: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  image: {
    width: '25%',
    aspectRatio: 1,
    borderRadius: 5,
  },
});
