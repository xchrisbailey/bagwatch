import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';

interface Props {
  description: string;
  amount: number;
  category: string;
}

export const ExpenseRow = ({ description, amount, category }: Props) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {description}
      </TableCell>
      <TableCell>{category}</TableCell>
      <TableCell>{amount}</TableCell>
    </TableRow>
  );
};
