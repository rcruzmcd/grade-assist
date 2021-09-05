import { Typography, Toolbar } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { useState } from 'react';

import Nav from './Nav';
import Header from './Header';
import Home from '../pages/Home';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginLeft: drawerWidth,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
  })
);

const Skeleton = () => {
  const classes = useStyles();

  return (
    <div>
      <header>
        <Header />
      </header>
      <div>
        <aside>
          <Nav />
        </aside>
        <main className={classes.content}>
          <Toolbar />
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="*">{/* not found */}</Route>
          </Switch>
        </main>
      </div>
    </div>
  );
};

export default Skeleton;
