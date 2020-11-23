import {
  CircularProgress,
  Container,
  Fab,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import axios from 'axios';
import { isError, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { useHistory } from 'react-router-dom';
import { AddExpenseDialog } from '../components/AddExpenseDialog';
import { ExpenseTable } from '../components/ExpenseTable';

import { Header } from '../components/header';
import { DashboardSidebar } from '../components/DashboardSidebar';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  grid: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  paperHeader: {
    textAlign: 'center',
    padding: theme.spacing(3),
  },
}));

export const App = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();
  const date = new Date();

  const getToken = (): string | void => {
    if (localStorage.getItem('token')) {
      return JSON.parse(localStorage.getItem('token') || '');
    }

    history.push('/');
  };

  const { isLoading, error, data } = useQuery(
    'expenseQuery',
    async () =>
      await axios.get(
        `/api/expenses?month=${date.getMonth()}&year=${date.getFullYear()}`,
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
  );

  if (error && isError(error))
    return (
      <>
        <Header />
        <p>{error.message}</p>
      </>
    );

  if (isLoading)
    return (
      <>
        <Header />
        <Container style={{ textAlign: 'center' }}>
          <CircularProgress />
        </Container>
      </>
    );

  return (
    <>
      <Header />
      <Container>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          spacing={3}
          className={classes.grid}
        >
          <Grid item sm={12} className={classes.paperHeader}>
            <Paper>
              <Typography variant="h4" style={{ textTransform: 'uppercase' }}>
                {date.toLocaleString('default', { month: 'long' })}{' '}
                {date.getFullYear()}
              </Typography>
            </Paper>
          </Grid>
          <Grid item md sm={12}>
            <DashboardSidebar result={data?.data.result} />
          </Grid>
          <Grid item md={8} sm={12}>
            <Paper>
              <ExpenseTable result={data?.data.result} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <AddExpenseDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      <Fab
        className={classes.fab}
        color="primary"
        onClick={() => setDialogOpen(true)}
      >
        <AddIcon />
      </Fab>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
