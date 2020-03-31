import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Breed({item, handlePress}) {
  const {name, description} = item;

  return (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#08B6CE',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
});
