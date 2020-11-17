import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import { ExpenseRow } from './ExpenseRow';
import { Expense } from '@bagwatch/data';

interface IExpenseTableProps {
  result: Expense[];
}

export const ExpenseTable = ({ result }: IExpenseTableProps) => {
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
          {result ? (
            result.map((e: Expense) => <ExpenseRow expense={e} key={e._id} />)
          ) : (
            <p>error</p>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
