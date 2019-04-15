import spotifyClient from './spotifyClient';

export function getAlbum(id) {
   return spotifyClient.get(`albums/${id}`).then(({ data }) => data);
}
