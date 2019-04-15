import React, { useEffect, useState } from 'react';
import { getAlbum } from '../../api/album';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
   card: {
      maxWidth: 600
   },
   media: {
      // ⚠️ object-fit is not supported by IE 11.
      objectFit: 'cover'
   }
};

const Album = ({ match, classes }) => {
   const [info, setInfo] = useState(null);

   useEffect(() => {
      getAlbum(match.params.id).then(album => setInfo(album));
   }, []);

   return info ? (
      <Grid container justify="center" alignItems="center">
         <Card className={classes.card}>
            <CardMedia
               component="img"
               alt="Contemplative Reptile"
               className={classes.media}
               height="300"
               image={info.images[0].url}
               title="Contemplative Reptile"
            />
            <CardContent>
               <Typography>{info.name}</Typography>
               <List className={classes.root}>
                  {info.tracks.items.map(item => (
                     <ListItem key={item.id} alignItems="flex-start">
                        <ListItemText
                           primary={item.track_number}
                           secondary={
                              <React.Fragment>
                                 <Typography
                                    component="span"
                                    className={classes.inline}
                                    color="textPrimary"
                                 >
                                    {item.name}
                                 </Typography>
                                 {info.artists
                                    .map(artist => artist.name)
                                    .join(', ')}
                              </React.Fragment>
                           }
                        />
                     </ListItem>
                  ))}
               </List>
            </CardContent>
         </Card>
      </Grid>
   ) : null;
};

export default withStyles(styles)(Album);
