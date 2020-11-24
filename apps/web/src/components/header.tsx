import React, { Dispatch, SetStateAction } from 'react';
import {
  AppBar,
  Button,
  Link,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

interface Props {
  signupOpen?: Dispatch<SetStateAction<boolean>>;
  loginOpen?: Dispatch<SetStateAction<boolean>>;
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export const Header = ({ signupOpen, loginOpen }: Props) => {
  const history = useHistory();
  const classes = useStyles();

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    history.push('/');
  };

  return (
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
            {loginOpen && (
              <Button color="inherit" onClick={() => loginOpen(true)}>
                Login
              </Button>
            )}
            {signupOpen && (
              <Button color="inherit" onClick={() => signupOpen(true)}>
                Sign Up
              </Button>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
