import React, {useCallback} from 'react';
import {View, Text, StyleSheet, Platform, Button} from 'react-native';

export default function Home({navigation}) {
  const handlePress = useCallback(() => {
    navigation.navigate('List');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Hello world</Text>
      <Text style={styles.platformText}>{platformText}</Text>
      <Button onPress={handlePress} title="Go to list" />
    </View>
  );
}

const platformText = Platform.select({
  ios: 'iOS',
  android: 'Android',
});

const platformTextColor = Platform.select({
  ios: '#ff0000',
  android: '#00ff00',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  platformText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: platformTextColor,
  },
});
