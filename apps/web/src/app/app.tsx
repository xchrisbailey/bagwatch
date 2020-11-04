import { Container, Fab, makeStyles } from '@material-ui/core';
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
}));

export const App = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Header />
      <Container>
        <ExpenseTable />
      </Container>
      <AddExpenseDialog dialogOpen={dialogOpen} handleClose={handleClose} />
      <Fab className={classes.fab} color="primary" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
