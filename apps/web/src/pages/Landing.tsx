import React from 'react';
import { Header } from '../components/header';
import { Container, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginTop: theme.spacing(3),
    textTransform: 'uppercase',
  },
}));

const Landing = () => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Typography variant="h2" color="primary" className={classes.title}>
          Bag Watch
        </Typography>

        <Typography variant="body1" gutterBottom>
          Expense tracking made simple, and pretty
        </Typography>
      </Container>
    </>
  );
};

export default Landing;
