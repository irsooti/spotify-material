import React, { Component } from 'react';
import './App.css';
import store from '../../store';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import DevTools, { configureDevtool } from 'mobx-react-devtools';
import Login from '../../views/Login/Login';

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
   setNewVersion(v) {
      store.version = v;
   }

   componentDidUpdate() {
      console.log('[UPDATED]');
   }

   render() {
      return (
         <div className="App">
            <DevTools />
            <Login />
         </div>
      );
   }
}

export default App;
