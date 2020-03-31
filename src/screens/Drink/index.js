import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import YouTube from 'react-native-youtube';
import queryString from 'query-string';
import {YOUTUBE_API_KEY} from 'react-native-dotenv';

export default function Drink({route, navigation}) {
  const {item} = route.params;

  const [data, setData] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [videoId, setVideoId] = useState();
  const YOUTUBE_API = 'https://www.googleapis.com/youtube/v3/search';

  useEffect(() => {
    navigation.setOptions({title: item.strDrink});
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${item.idDrink}`,
    )
      .then(response => response.json())
      .then(json => {
        setData(json.drinks[0]);
        const drink = Object.entries(json.drinks[0]);
        setIngredients(
          Object(drink)
            .filter(value => value[0].includes('strIngredient') && value[1])
            .map(value => value[1]),
        );
      })
      .catch(error => console.error(error));
  }, [item.strDrink, item.idDrink, setIngredients, navigation]);

  useEffect(() => {
    if (!data) {
      return;
    }

    const params = {
      key: YOUTUBE_API_KEY,
      part: 'snippet',
      type: 'video',
      maxResults: 1,
      q: `${data.strDrink} cocktail recipe`,
    };

    fetch(`${YOUTUBE_API}?${queryString.stringify(params)}`)
      .then(response => response.json())
      .then(json => setVideoId(json.items[0].id.videoId))
      .catch(error => console.error(error));
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={styles.category}>Type: {data.strDrink}</Text>
      <Image style={styles.image} source={{uri: data.strDrinkThumb}} />
      <Text style={styles.instructions}>How to : {data.strInstructions}</Text>
      <Text style={styles.title}>Ingredients :</Text>
      <FlatList
        style={styles.list}
        data={ingredients}
        renderItem={({item}) => <Text style={styles.ingredient}>{item}</Text>}
        keyExtractor={ingredient => ingredient}
      />
      {data.strAlcoholic === 'Non alcoholic' && (
        <Image
          style={styles.warning}
          source={{
            uri: 'https://www.sojennie.paris/img/cms/O_Alcool_EN.png',
          }}
        />
      )}
      {!videoId && <Text>Loading video</Text>}
      {videoId && <YouTube videoId={videoId} style={styles.video} />}
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructions: {
    backgroundColor: 'rgb(225, 225, 225)',
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  list: {
    width: '80%',
  },
  ingredient: {
    fontSize: 14,
    marginBottom: 5,
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
  video: {
    alignSelf: 'stretch',
    height: 300,
  },
});
