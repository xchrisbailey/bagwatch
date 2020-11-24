import React from 'react';
import { Header } from '../components/header';
import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import { Link as RLink } from 'react-router-dom';
import { LoginDialog } from '../components/LoginDialog';
import { SignupDialog } from '../components/SignupDialog';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginTop: theme.spacing(3),
    textTransform: 'uppercase',
  },
}));

const Landing = () => {
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false);
  const [signupDialogOpen, setSignupDialogOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <>
      <Header loginOpen={setLoginDialogOpen} signupOpen={setSignupDialogOpen} />
      <Container maxWidth="md">
        <Typography variant="h2" color="primary" className={classes.title}>
          Bag Watch
        </Typography>

        <Typography variant="body1" gutterBottom>
          Expense tracking made simple, and pretty
        </Typography>
        {localStorage.getItem('token') ? (
          <Button
            variant="contained"
            component={RLink}
            color="primary"
            to="/dashboard"
          >
            load your dashboard
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '1rem' }}
              onClick={() => setLoginDialogOpen(true)}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSignupDialogOpen(true)}
            >
              Sign Up
            </Button>
          </>
        )}
      </Container>

      <LoginDialog open={loginDialogOpen} setOpen={setLoginDialogOpen} />
      <SignupDialog open={signupDialogOpen} setOpen={setSignupDialogOpen} />
    </>
  );
};

export default Landing;
