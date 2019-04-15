import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import PersonalTracks from '../PersonalTracks/PersonalTracks';
import Album from '../Album/Album';
const Main = ({ isAuthenticated = false, children }) => {
   const authenticatedFrag = (
      <div>
         <Router>
            <Route path="/" exact component={PersonalTracks} />
            <Route path="/album/:id" exact component={Album} />
         </Router>
      </div>
   );
   const notAuthenticatedFrag = <div>You must login.</div>;

   return <>{isAuthenticated ? authenticatedFrag : notAuthenticatedFrag}</>;
};

export default Main;
