import {useState, useEffect, useContext} from 'react';
import queryString from 'query-string';
import {YOUTUBE_API_KEY} from 'react-native-dotenv';
import {YOUTUBE_API} from '../Constants';
import {Store} from '../App';

export const useYoutubeVideo = cocktailName => {
  const store = useContext(Store);
  const {videosIds, setVideosIds} = store;

  // remove default value
  const [videoId, setVideoId] = useState('8DcW1BVlUvc');

  useEffect(() => {
    // remove true
    if (!cocktailName || true) {
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

        // change video id by API response json.items[0].id.videoId
        setVideosIds({...videosIds, [cocktailName]: '8DcW1BVlUvc'});
      })
      .catch(error => console.error(error));
  }, [cocktailName, setVideosIds, videosIds]);

  return videoId;
};
