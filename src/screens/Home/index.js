import React, {useCallback} from 'react';
import {View, Text, Image, StyleSheet, Platform, Button} from 'react-native';

export default function Home({navigation}) {
  const handlePress = useCallback(() => {
    navigation.navigate('List');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Cockt'app</Text>
      <Image
        style={styles.image}
        source={{
          uri:
            'https://www.stickpng.com/assets/images/587e337f9686194a55adab7c.png',
        }}
      />
      <Text style={styles.platformText}>{platformText}</Text>
      <Button onPress={handlePress} title="Discover our cocktails" />
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
  image: {
    width: '50%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  platformText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: platformTextColor,
  },
});
