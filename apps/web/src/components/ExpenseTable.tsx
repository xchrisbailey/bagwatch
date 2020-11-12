import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import axios from 'axios';
import { isError, useQuery } from 'react-query';
import { ExpenseRow } from './ExpenseRow';
import { Expense } from '@bagwatch/data';
import { useHistory } from 'react-router-dom';

export const ExpenseTable = () => {
  const history = useHistory();

  const getToken = (): string | void => {
    if (localStorage.getItem('token')) {
      return JSON.parse(localStorage.getItem('token') || '');
    }

    history.push('/');
  };

  const { isLoading, error, data } = useQuery(
    'expenseQuery',
    async () =>
      await axios.get('/api/expenses', {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
  );

  if (error && isError(error)) return <p>{error.message}</p>;

  if (isLoading) return <p>loading...</p>;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data?.result ? (
            data.data.result.map((e: Expense) => (
              <ExpenseRow expense={e} key={e._id} />
            ))
          ) : (
            <p>error</p>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
