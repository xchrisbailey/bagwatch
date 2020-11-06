import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
import { queryCache, useMutation, useQueryCache } from 'react-query';
import axios from 'axios';

interface Props {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

interface IMutationProps {
  description: string;
  category: string;
  amount: number;
}

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(4),
  },
  formField: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  dialog: {},
}));

const expenseMutation = async ({
  description,
  category,
  amount,
}: IMutationProps) => {
  try {
    await axios.post('/api/expenses', { description, category, amount });
    await queryCache.refetchQueries();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const AddExpenseDialog = ({ dialogOpen, setDialogOpen }: Props) => {
  const cache = useQueryCache();
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [mutate] = useMutation(expenseMutation, {
    onSuccess: () => cache.refetchQueries('expenseQuery'),
  });
  const classes = useStyles();

  const handleSelectChange = (e: ChangeEvent<{ value: unknown }>) => {
    setCategory(e.target.value as string);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      await mutate({ description, amount, category });
      setCategory('');
      setDescription('');
      setAmount(0);
      setDialogOpen(false);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      fullWidth={true}
    >
      <DialogTitle id="form-dialog-title">Add Expense</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} noValidate={true}>
          <div>
            <FormControl required fullWidth>
              <TextField
                label="Description"
                className={classes.formField}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
                fullWidth
              />
            </FormControl>
          </div>
          <div>
            <FormControl required fullWidth>
              <Select
                value={category}
                onChange={handleSelectChange}
                className={classes.formField}
                required
                fullWidth
              >
                <MenuItem value="housing">Housing</MenuItem>
                <MenuItem value="transportation">Transportation</MenuItem>
                <MenuItem value="food">Food</MenuItem>
                <MenuItem value="utilities">Utilities</MenuItem>
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="medical">Medical</MenuItem>
                <MenuItem value="insurance">Insurance</MenuItem>
                <MenuItem value="household">Household</MenuItem>
                <MenuItem value="personal">Personal</MenuItem>
                <MenuItem value="debt">Debt</MenuItem>
                <MenuItem value="retirement">Retirement</MenuItem>
                <MenuItem value="education">Education</MenuItem>
                <MenuItem value="savings">Savings</MenuItem>
                <MenuItem value="gifts">Gifts</MenuItem>
                <MenuItem value="entertainment">Entertainment</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl required fullWidth>
              <TextField
                label="Amount"
                className={classes.formField}
                type="number"
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                value={amount || 0}
                required
                fullWidth
              />
            </FormControl>
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
