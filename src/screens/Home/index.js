import React, {useCallback} from 'react';
import {View, Text, StyleSheet, Platform, Button} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default function Home({navigation}) {
  const handlePress = useCallback(() => {
    navigation.navigate('List');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Hello world</Text>
      <Text style={styles.platformText}>{platformText}</Text>
      <Button onPress={handlePress} title="Go to list" />
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
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
  map: {
    width: '100%',
    height: 300,
  },
});
