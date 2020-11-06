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
import { useQuery } from 'react-query';
import { ExpenseRow } from './ExpenseRow';
import { Expense } from '@bagwatch/data';

export const ExpenseTable = () => {
  const { isLoading, error, data } = useQuery(
    'expenseQuery',
    async () => await axios.get('/api/expenses')
  );

  if (error) return <p>error: {error}</p>;
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
