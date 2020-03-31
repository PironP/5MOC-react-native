import {useState, useEffect} from 'react';
import queryString from 'query-string';
import {YOUTUBE_API_KEY} from 'react-native-dotenv';
import {YOUTUBE_API} from '../Constants';

export const useYoutubeVideo = cocktailName => {
  const [videoId, setVideoId] = useState('8DcW1BVlUvc');

  useEffect(() => {
    if (!cocktailName || true) {
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

        setVideoId(json.items[0].id.videoId);
      })
      .catch(error => console.error(error));
  }, [cocktailName]);

  return videoId;
};
