import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import YouTube from 'react-native-youtube';
import queryString from 'query-string';
import {YOUTUBE_API_KEY} from 'react-native-dotenv';

export default function Home() {
  const name = 'Acd';
  const [videoId, setVideoId] = useState();
  const YOUTUBE_API = 'https://www.googleapis.com/youtube/v3/search';

  useEffect(() => {
    const params = {
      key: YOUTUBE_API_KEY,
      part: 'snippet',
      type: 'video',
      maxResults: 1,
      q: `${name} cocktail recipe`,
    };

    fetch(`${YOUTUBE_API}?${queryString.stringify(params)}`)
      .then(response => response.json())
      .then(json => setVideoId(json.items[0].id.videoId))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      {!videoId && <Text>Loading video</Text>}
      {videoId && <YouTube videoId={videoId} style={styles.video} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    alignSelf: 'stretch',
    height: 300,
  },
});
