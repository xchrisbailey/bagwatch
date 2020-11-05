import React, { Dispatch, SetStateAction } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogTitle';
import { Button, DialogActions, TextField } from '@material-ui/core';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const LoginDialog = ({ open, setOpen }: Props) => {
  const handleClose = () => {
    setOpen(false);
  };

  const loginRequest = () => {
    console.log('login');
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="login-dialog">
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="email address"
          type="email"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="password"
          type="password"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={loginRequest} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};
