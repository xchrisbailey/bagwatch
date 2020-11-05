import React, { Dispatch, SetStateAction } from 'react';
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';

interface Props {
  openLogin: Dispatch<SetStateAction<boolean>>;
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export const Header = ({ openLogin }: Props) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          BAG watch
        </Typography>
        <Button color="inherit" onClick={() => openLogin(true)}>
          Login
        </Button>
        <Button color="inherit">Sign Up</Button>
      </Toolbar>
    </AppBar>
  );
};
