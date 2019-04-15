import axios from 'axios';

const {
   REACT_APP_SPOTIFY_CLIENT_ID,
   REACT_APP_SPOTIFY_CLIENT_SECRET
} = process.env;

export function authenticate({ body: { grant_type, code, redirect_uri } }) {
   return axios
      .post(
         'https://accounts.spotify.com/api/token',
         {
            grant_type,
            code,
            redirect_uri
         },
         {
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
               Authorization: `Basic ${btoa(
                  REACT_APP_SPOTIFY_CLIENT_ID +
                     ':' +
                     REACT_APP_SPOTIFY_CLIENT_SECRET
               )}`
            }
         }
      )
      .then(console.log)
      .catch(console.warn);
}
