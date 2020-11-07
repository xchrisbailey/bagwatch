import React from 'react';
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { LoginDialog } from './LoginDialog';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();
  const classes = useStyles();

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    history.push('/');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            BAG watch
          </Typography>
          {window.localStorage.getItem('user') ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={() => setLoginDialogOpen(true)}>
                Login
              </Button>
              <Button color="inherit">Sign Up</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <LoginDialog open={loginDialogOpen} setOpen={setLoginDialogOpen} />
    </>
  );
};
