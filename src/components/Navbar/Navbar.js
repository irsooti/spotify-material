import React from 'react';
import { Toolbar, Button, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { observer } from 'mobx-react';
import store from '../../store';
import { withStyles } from '@material-ui/core/styles';
import { redirectUrl } from '../../api/spotifyClient';

const styles = theme => {
   console.log(theme.palette.primary);

   return {
      layout: {
         width: 'auto',
         marginLeft: theme.spacing.unit * 3,
         marginRight: theme.spacing.unit * 3,
         [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto'
         }
      },
      toolbarMain: {
         borderBottom: `1px solid ${theme.palette.grey[50]}`,
         backgroundColor: '#1db954',
         color: `${theme.palette.grey[50]}`
      },
      toolbarTitle: {
         flex: 1
      },
      toolbarSecondary: {
         justifyContent: 'space-between'
      }
   };
};
@observer
class Navbar extends React.Component {
   redirectHandler = () => {
      return (window.location.href = redirectUrl);
   };

   render() {
      const {
         classes: { toolbarMain, toolbarTitle, toolbarSecondary }
      } = this.props;

      return (
         <>
            <Toolbar className={toolbarMain}>
               <Typography
                  component="h2"
                  variant="h5"
                  color="inherit"
                  align="center"
                  noWrap
                  className={toolbarTitle}
               >
                  Spotify Web
               </Typography>
               <>
                  {store.user.authenticated ? (
                     <Avatar
                        src={store.user.avatar}
                        title={store.user.displayName}
                     />
                  ) : (
                     <Button
                        onClick={this.redirectHandler}
                        variant="outlined"
                        size="small"
                     >
                        Sign in
                     </Button>
                  )}
               </>
            </Toolbar>
            <Toolbar variant="dense" className={toolbarSecondary}>
               {/* {sections.map(section => (
               <Typography color="inherit" noWrap key={section}>
                  {section}
               </Typography>
            ))} */}
            </Toolbar>
         </>
      );
   }
}

export default withStyles(styles)(Navbar);
