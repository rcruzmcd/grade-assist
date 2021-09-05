import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import clsx from 'clsx';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import {
  IconButton,
  AppBar,
  Badge,
  Toolbar,
  Typography,
  Grid,
} from '@material-ui/core';

import { AuthContext } from '../context/auth-context';
import { useContext, useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    grow: {
      flexGrow: 1,
    },
  })
);

const Header = () => {
  const ctx = useContext(AuthContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const menuId = 'primary-search-account-menu';

  const logoutHandler = () => {
    ctx.onLogout();
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" noWrap>
          Grade Assist
        </Typography>
        <div className={classes.grow}></div>
        <Typography variant="h6" noWrap>
          {ctx.user.userType} - {ctx.user.email}
        </Typography>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          color="inherit"
          onClick={logoutHandler}
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
