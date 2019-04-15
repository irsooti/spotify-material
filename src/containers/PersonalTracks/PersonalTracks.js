import React, { useEffect, useState } from 'react';
import TrackCard from '../../components/TrackCard/TrackCard';
import { getCurrentUserSavedTracks } from '../../api/me';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import spotifyClient from '../../api/spotifyClient';
import useFullScrollDetector from '../../hooks/useFullScrollDetector';
import LinearProgress from '@material-ui/core/LinearProgress';
const styles = theme => ({
   container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: `${theme.spacing.unit * 3}px`
   },
   root: {
      flexGrow: 1
   }
});

const PersonalTracks = ({ classes }) => {
   const [tracks, setTracks] = useState([]);
   const [nextPage, setNextPage] = useState({});
   const [isLoading, setIsLoading] = useState(true);

   const pageIsScrolled = useFullScrollDetector();

   useEffect(() => {
      getCurrentUserSavedTracks().then(result => {
         setTracks(tracks.concat(result.items));
         setIsLoading(false);
         setNextPage(result.next);
      });
   }, []);

   useEffect(() => {
      console.log(pageIsScrolled);

      if (pageIsScrolled && !isLoading) {
         loadMoreSavedTracks();
      }
   }, [pageIsScrolled]);

   function loadMoreSavedTracks() {
      if (!nextPage) return;

      setIsLoading(true);
      spotifyClient.get(nextPage).then(({ data }) => {
         setTracks(tracks.concat(data.items));
         setIsLoading(false);
         setNextPage(data.next);
      });
   }

   return (
      <div style={{ paddingBottom: '200px' }}>
         <Grid container justify="center" alignItems="center">
            {tracks.map(item => (
               <TrackCard
                  key={item.track.id}
                  name={item.track.name}
                  album={item.track.album}
                  artists={item.track.artists}
               />
            ))}
         </Grid>
         <Grid container justify="center">
            <Grid>
               {isLoading ? (
                  <div className={classes.root}>
                     <LinearProgress variant="query" />
                     <br />
                     <LinearProgress color="secondary" variant="query" />
                  </div>
               ) : null}
            </Grid>
         </Grid>
      </div>
   );
};

export default withStyles(styles)(PersonalTracks);
