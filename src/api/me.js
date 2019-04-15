import spotifyClient from './spotifyClient';

export default function getMe() {
   return spotifyClient.get('me').then(({ data }) => data);
}

export function getUserTopArtist() {
   return spotifyClient
      .get('me/top/artists', {
         params: {
            time_range: 'medium_term',
            limit: 10
         }
      })
      .then(({ data }) => data);
}

export function getCurrentUserSavedTracks(offset = 0) {
   return spotifyClient
      .get('me/tracks', {
         params: {
            market: 'IT',
            offset
         }
      })
      .then(({ data }) => data);
}
