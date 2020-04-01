import {useState, useEffect, useContext} from 'react';
import queryString from 'query-string';
import {YOUTUBE_API_KEY} from 'react-native-dotenv';
import {YOUTUBE_API} from '../Constants';
import {Store} from '../App';

export const useYoutubeVideo = cocktailName => {
  const store = useContext(Store);
  const {videosIds, setVideosIds} = store;

  const [videoId, setVideoId] = useState();

  useEffect(() => {
    if (!cocktailName) {
      return;
    }

    if (videosIds[cocktailName]) {
      setVideoId(videosIds[cocktailName]);
      return;
    }

    const params = {
      key: YOUTUBE_API_KEY,
      part: 'snippet',
      type: 'video',
      maxResults: 1,
      q: `${cocktailName} cocktail recipe`,
    };

    fetch(`${YOUTUBE_API}?${queryString.stringify(params)}`)
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          console.error(json.error);
        }

        setVideosIds({...videosIds, [cocktailName]: json.items[0].id.videoId});
      })
      .catch(error => console.error(error));
  }, [cocktailName, setVideosIds, videosIds]);

  return videoId;
};
