import axios from 'axios';
const { REACT_APP_SPOTIFY_CLIENT_ID, REACT_APP_REDIRECT_URI } = process.env;

export const redirect_uri = REACT_APP_REDIRECT_URI;
export const scopes = 'user-read-private user-read-email user-library-read';
export const redirectUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(
   redirect_uri
)}&scope=${encodeURIComponent(scopes)}`;

const spotifyClient = axios.create({
   baseURL: 'https://api.spotify.com/v1/'
});

spotifyClient.interceptors.request.use(conf => {
   conf.headers = {
      Authorization: sessionStorage.getItem('spotify-auth')
         ? `Bearer ${sessionStorage.getItem('spotify-auth')}`
         : null
   };

   return conf;
});

spotifyClient.interceptors.response.use(
   conf => conf,
   error => {
      console.log(error.response.status);
      if (error.response.status === 401) {
         console.log(error.response.status, 'STATUs');
         sessionStorage.removeItem('spotify-auth');
      }

      return Promise.reject(error);
   }
);

export default spotifyClient;
