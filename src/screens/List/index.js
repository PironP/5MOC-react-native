import React, {useCallback, useContext} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Drink from '../../components/Drink';
import {Store} from '../../App';

export default function List({navigation}) {
  const store = useContext(Store);
  const {drinks} = store;

  const handlePress = useCallback(
    item => {
      navigation.navigate('Drink', {item});
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      {drinks && (
        <FlatList
          data={drinks}
          renderItem={values => <Drink {...values} handlePress={handlePress} />}
          keyExtractor={item => item.idDrink}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(70,49,104)',
  },
});
