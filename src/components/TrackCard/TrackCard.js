import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import AlbumIcon from '@material-ui/icons/Album';
import FaceIcon from '@material-ui/icons/Face';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
   card: {
      maxWidth: 400,
      margin: theme.spacing.unit * 3
   },
   media: {
      minWidth: '400px',
      height: 'auto',
      paddingTop: '56.25%' // 16:9
   },
   actions: {
      display: 'flex'
   },
   expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
         duration: theme.transitions.duration.shortest
      })
   },
   expandOpen: {
      transform: 'rotate(180deg)'
   },
   avatar: {
      backgroundColor: red[500]
   }
});

const TrackCard = ({
   classes,
   track,
   name,
   artists,
   album,
   match,
   history
}) => {
   const [isExpanded, setIsExpanded] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);

   function handleExpandClick(params) {
      setIsExpanded(!isExpanded);
   }

   function handleClick(event) {
      setAnchorEl(event.currentTarget);
   }

   function handleClose() {
      setAnchorEl(null);
   }

   return (
      <Card className={classes.card}>
         <CardHeader
            avatar={
               <Avatar aria-label="Recipe" className={classes.avatar}>
                  {name[0]}
               </Avatar>
            }
            action={
               <IconButton
                  aria-label="More"
                  aria-owns={Boolean(anchorEl) ? 'long-menu' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
               >
                  <MoreVertIcon />
               </IconButton>
            }
            title={name}
            subheader={album.release_date}
         />
         <Menu
            id="long-menu"
            anchorEl={anchorEl}
            onClose={handleClose}
            open={Boolean(anchorEl)}
         >
            <MenuItem
               key={1}
               onClick={() => {
                  console.log(match, history);
                  history.push(`/album/${album.id}`);
               }}
            >
               <AlbumIcon style={{ marginRight: '10px' }} />
               Go to the Album
            </MenuItem>
            <MenuItem disabled={true} key={2} onClick={() => {}}>
               <FaceIcon style={{ marginRight: '10px' }} /> Go to the artist
            </MenuItem>
         </Menu>
         <CardActionArea>
            <CardMedia
               className={classes.media}
               image={album.images[1].url}
               title={name}
            />
         </CardActionArea>
         <CardContent>
            <Typography component="p">
               {artists.map(m => m.name).join(', ')}
            </Typography>
         </CardContent>
         <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <CardActions className={classes.actions} disableActionSpacing>
               <IconButton aria-label="Add to favorites">
                  <FavoriteIcon />
               </IconButton>
               <IconButton aria-label="Share">
                  <ShareIcon />
               </IconButton>
               <IconButton
                  className={classnames(classes.expand, {
                     [classes.expandOpen]: isExpanded
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={isExpanded}
                  aria-label="Show more"
               >
                  <ExpandMoreIcon />
               </IconButton>
            </CardActions>
         </Collapse>
      </Card>
   );
};

export default withRouter(withStyles(styles)(TrackCard));
