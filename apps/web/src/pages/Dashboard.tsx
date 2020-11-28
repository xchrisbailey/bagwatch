import {
  CircularProgress,
  Container,
  Fab,
  Grid,
  IconButton,
  Paper,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import React, { useState } from 'react';
import axios from 'axios';
import { isError, queryCache, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { useHistory } from 'react-router-dom';
import { AddExpenseDialog } from '../components/AddExpenseDialog';
import { ExpenseTable } from '../components/ExpenseTable';

import { Expense as ExpenseType } from '@bagwatch/data';
import { Header } from '../components/header';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { LoginForm } from '../components/LoginForm';

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
  paperFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export const App = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [url, setUrl] = useState(
    `/api/expenses?month=${date.getMonth()}&year=${date.getFullYear()}`
  );
  const classes = useStyles();
  const history = useHistory();

  const getToken = (): string | void => {
    if (localStorage.getItem('token')) {
      return JSON.parse(localStorage.getItem('token') || '');
    }

    history.push('/');
  };

  const changeDate = async (action: string): Promise<void> => {
    switch (action) {
      case 'inc': {
        const incDate = date.setMonth(date.getMonth() + 1);
        setDate(new Date(incDate));
        setUrl(
          `/api/expenses?month=${date.getMonth()}&year=${date.getFullYear()}`
        );
        await queryCache.refetchQueries(['expenseQuery']);
        break;
      }
      case 'dec': {
        const newDate = date.setMonth(date.getMonth() - 1);
        setDate(new Date(newDate));
        setUrl(
          `/api/expenses?month=${date.getMonth()}&year=${date.getFullYear()}`
        );
        await queryCache.refetchQueries(['expenseQuery']);
        break;
      }
      default:
    }
  };

  const doFetch = (_key: string, u: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      axios
        .get(u, { headers: { authorization: `Bearer ${getToken()}` } })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  const { isLoading, error, data } = useQuery<ExpenseType[], Error>(
    ['expenses', url],
    doFetch,
    {
      refetchOnWindowFocus: false,
    }
  );

  if (error && isError(error))
    if (error.message.includes('401')) {
      return (
        <>
          <Header />
          <Container style={{ marginTop: '2rem' }}>
            <Typography variant="h3" color="error">
              Please login
            </Typography>
            <LoginForm />
          </Container>
        </>
      );
    } else {
      history.push('/');
    }

  if (isLoading)
    return (
      <>
        <Header />
        <Container style={{ textAlign: 'center', marginTop: '2rem' }}>
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
            <Paper className={classes.paperFlex}>
              <IconButton
                aria-label="back-month"
                onClick={() => changeDate('dec')}
              >
                <ArrowLeftIcon />
              </IconButton>
              <Typography variant="h4" style={{ textTransform: 'uppercase' }}>
                {date.toLocaleString('default', { month: 'long' })}{' '}
                {date.getFullYear()}
              </Typography>
              <IconButton
                aria-label="forward-month"
                onClick={() => changeDate('inc')}
              >
                <ArrowRightIcon />
              </IconButton>
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
