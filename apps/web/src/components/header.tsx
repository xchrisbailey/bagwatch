import React from 'react';
import {
  AppBar,
  Button,
  Link,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { LoginDialog } from './LoginDialog';
import { SignupDialog } from './SignupDialog';

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
  const [signupDialogOpen, setSignupDialogOpen] = React.useState(false);
  const history = useHistory();
  const classes = useStyles();

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href="/" variant="inherit" color="inherit" underline="none">
              BAG watch
            </Link>
          </Typography>
          {window.localStorage.getItem('token') ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={() => setLoginDialogOpen(true)}>
                Login
              </Button>
              <Button color="inherit" onClick={() => setSignupDialogOpen(true)}>
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <LoginDialog open={loginDialogOpen} setOpen={setLoginDialogOpen} />
      <SignupDialog open={signupDialogOpen} setOpen={setSignupDialogOpen} />
    </>
  );
};
