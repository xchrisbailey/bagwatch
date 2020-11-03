import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import { ExpenseTable } from '../components/ExpenseTable';

import { Header } from '../components/header';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(4),
  },
  formField: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  dialog: {},
}));

export const App = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [category, setCategory] = React.useState('');
  const classes = useStyles();

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(e.target.value as string);
  };

  return (
    <>
      <Header />
      <Container>
        <ExpenseTable />
      </Container>
      <Dialog open={dialogOpen} onClose={handleClose} fullWidth={true}>
        <DialogTitle id="form-dialog-title">Add Expense</DialogTitle>
        <DialogContent>
          <form>
            <div>
              <FormControl required>
                <TextField label="Description" className={classes.formField} />
              </FormControl>
            </div>
            <div>
              <FormControl required>
                <Select
                  value={category}
                  onChange={handleSelectChange}
                  className={classes.formField}
                >
                  <MenuItem value="Noms">Noms</MenuItem>
                  <MenuItem value="Pooch">Pooch</MenuItem>
                  <MenuItem value="Billz">Billz</MenuItem>
                  <MenuItem value="Swoll">Swoll</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl required>
                <TextField label="Amount" className={classes.formField} />
              </FormControl>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Fab className={classes.fab} color="primary" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default App;
