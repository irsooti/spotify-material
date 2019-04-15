import React, { Component } from 'react';
import './App.css';
import store from '../../store';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import DevTools, { configureDevtool } from 'mobx-react-devtools';
import Navbar from '../../components/Navbar/Navbar';
import { getUrlParamsFromHash } from '../../utils/urlHelper';
import getMe from '../../api/me';
import Main from '../Main/Main';

// Any configurations are optional
configureDevtool({
   // Turn on logging changes button programmatically:
   logEnabled: true,
   // Turn off displaying components updates button programmatically:
   updatesEnabled: true,
   // Log only changes of type `reaction`
   // (only affects top-level messages in console, not inside groups)
   logFilter: change => change.type === 'reaction'
});

@observer
class App extends Component {
   @action.bound
   setUser({ avatar, displayName }) {
      store.user = { authenticated: true, avatar, displayName };
   }

   async componentDidMount() {
      if (!sessionStorage['spotify-auth']) {
         const { access_token } = getUrlParamsFromHash(['access_token']);
         sessionStorage.setItem('spotify-auth', access_token);
         window.history.pushState({}, null, '#/');
      }

      const { images, display_name } = await getMe();
      this.setUser({ avatar: images[0].url, displayName: display_name });
   }

   render() {
      return (
         <div className="App">
            <DevTools />
            <Navbar />
            <Main isAuthenticated={store.user.authenticated} />
         </div>
      );
   }
}

export default App;
