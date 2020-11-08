import React, { MouseEvent } from 'react';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Expense } from '@bagwatch/data';
import axios from 'axios';
import { useMutation, useQueryCache } from 'react-query';
import { useHistory } from 'react-router-dom';

interface props {
  expense: Expense;
}

interface IDeleteMutation {
  id: string;
  token: string;
}

const deleteMutation = async ({
  id,
  token,
}: IDeleteMutation): Promise<void> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`/api/expenses/${id}`, config);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const ExpenseRow = ({ expense }: props) => {
  const history = useHistory();
  const cache = useQueryCache();
  const [mutate] = useMutation(deleteMutation, {
    onSuccess: async () => await cache.refetchQueries(),
  });
  const famount = `$${(expense.amount / 100).toFixed(2) || 0}`;
  const rdate = new Date(expense.createdAt).toLocaleDateString('en-CA');

  const handleDelete = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    const token: string = JSON.parse(localStorage.getItem('token') || '');
    const id: string = expense._id;

    if (token.length <= 0) history.push('/');
    try {
      await mutate({ id, token });
    } catch (e) {
      throw new Error(e.message);
    }
  };

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
          onClick={(e) => handleDelete(e)}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
