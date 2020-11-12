import { Container, Fab, Grid, makeStyles, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import { AddExpenseDialog } from '../components/AddExpenseDialog';
import { ExpenseTable } from '../components/ExpenseTable';

import { Header } from '../components/header';

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
}));

export const App = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const classes = useStyles();

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
          <Grid item md sm={12}>
            <Paper>Graph and Info section</Paper>
          </Grid>
          <Grid item md={8} sm={12}>
            <Paper>
              <ExpenseTable />
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
