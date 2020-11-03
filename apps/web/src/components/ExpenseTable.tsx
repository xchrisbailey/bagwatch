import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from '@material-ui/core';
import React from 'react';
import { useQuery } from 'react-query';
import { ExpenseRow } from './ExpenseRow';
import { Expense } from '@bagwatch/data';

export const ExpenseTable = () => {
  const { isLoading, error, data } = useQuery('data', () =>
    fetch('/api/expenses').then((res) => res.json())
  );

  if (error) return <p>error: {error}</p>;
  if (isLoading) return <p>loading...</p>;

  return (
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
  );
};
