import React, { Dispatch, SetStateAction, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogTitle';
import { Button, DialogActions, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const LoginDialog = ({ open, setOpen }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const handleClose = () => {
    setOpen(false);
  };

  const loginRequest = async () => {
    try {
      const result = await axios.post('/api/login', { email, password });
      window.localStorage.setItem('token', JSON.stringify(result.data.token));
      history.push('/dashboard');
    } catch (e) {
      history.push('/');
    }
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
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
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
