import {
  Container,
  Fab,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import useSWR from 'swr';

import { Header } from '../components/header';
import { ExpenseRow } from '../components/ExpenseRow';
import { Expense } from '@bagwatch/data';

const expenseUrl = '/api/expenses';
const getData = async () => {
  const res = await fetch(expenseUrl);
  return await res.json();
};

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export const App = () => {
  const { data } = useSWR(expenseUrl, getData);
  const classes = useStyles();
  return (
    <>
      <Header />
      <Container>
        <TableContainer>
          <Table>
            <TableHead>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
            </TableHead>
            <TableBody>
              {data ? (
                data.data.map((e: Expense) => (
                  <ExpenseRow
                    description={e.description}
                    amount={e.amount}
                    category={e.category}
                    key={e._id}
                  />
                ))
              ) : (
                <TableCell>loading...</TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Fab className={classes.fab} color="primary">
        <AddIcon />
      </Fab>
    </>
  );
};

export default App;
