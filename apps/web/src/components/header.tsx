import React from 'react';
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { LoginDialog } from './LoginDialog';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export const Header = () => {
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false);
  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            BAG watch
          </Typography>
          <Button color="inherit" onClick={() => setLoginDialogOpen(true)}>
            Login
          </Button>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>
      <LoginDialog open={loginDialogOpen} setOpen={setLoginDialogOpen} />
    </>
  );
};
