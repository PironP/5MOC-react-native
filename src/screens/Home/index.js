import React, {useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Home({navigation}) {
  const handlePress = useCallback(() => {
    navigation.navigate('List');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.welcomeTitle1}>Cocktail</Text>
        <Text style={styles.welcomeTitle2}>App</Text>
      </View>
      <LottieView
        style={styles.image}
        source={require('../../images/cocktail.json')}
        autoPlay
        loop
      />
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text>Discover our cocktails</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(200,200,200)',
  },
  welcome: {
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'row',
    margin: 10,
    marginBottom: 20,
  },
  welcomeTitle1: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  welcomeTitle2: {
    fontSize: 26,
    color: 'rgb(251,64,82)',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
});
