import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Drink({item, handlePress}) {
  const {strDrink, strInstructions, strAlcoholic} = item;

  return (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.container}>
        <Text style={styles.name}>{strDrink}</Text>
        <Text style={styles.instructions}>{strInstructions}</Text>
        <Text style={styles.info}>{strAlcoholic}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFA500',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  instructions: {
    fontSize: 14,
  },
  info: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});
