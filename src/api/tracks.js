import spotifyClient from './spotifyClient';

export function getTrack(id) {
   return spotifyClient.get(`tracks/${id}`).then(({ data }) => data);
}
