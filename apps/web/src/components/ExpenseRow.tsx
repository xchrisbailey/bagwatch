import React, { FormEvent } from 'react';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Expense } from '@bagwatch/data';
import axios from 'axios';
import { queryCache, useMutation, useQueryCache } from 'react-query';

interface props {
  expense: Expense;
}

const deleteMutation = async (id: string): Promise<void> => {
  try {
    await axios.delete(`/api/expenses/${id}`);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const ExpenseRow = ({ expense }: props) => {
  const cache = useQueryCache();
  const [deleteMutate] = useMutation(deleteMutation, {
    onSuccess: async () => await cache.refetchQueries(),
  });
  const famount = `$${(expense.amount / 100).toFixed(2) || 0}`;
  const rdate = new Date(expense.createdAt).toLocaleDateString('en-CA');

  return (
    <TableRow>
      <TableCell>{rdate}</TableCell>
      <TableCell>{expense.description}</TableCell>
      <TableCell>{expense.category}</TableCell>
      <TableCell>{famount}</TableCell>
      <TableCell align="right">
        <IconButton
          aria-label="Delete"
          color="secondary"
          onClick={async () => await deleteMutate(expense._id)}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
