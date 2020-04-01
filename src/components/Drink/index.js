import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

export default function Drink({item, index, handlePress}) {
  const {strDrink, strInstructions, strAlcoholic, strDrinkThumb} = item;

  return (
    <View>
      {index === 0 && <View style={styles.fixPaddingTop} />}
      <TouchableOpacity onPress={() => handlePress(item)}>
        <View style={styles.container}>
          <FastImage style={styles.image} source={{uri: strDrinkThumb}} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  fixPaddingTop: {
    height: 10,
    backgroundColor: 'rgb(245, 245, 245)',
  },
  container: {
    padding: 10,
    backgroundColor: 'rgb(245, 245, 245)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    paddingHorizontal: 15,
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
    backgroundColor: 'rgb(230, 230, 230)',
    aspectRatio: 1,
    borderRadius: 5,
  },
});
