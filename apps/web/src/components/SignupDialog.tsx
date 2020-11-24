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

export const SignupDialog = ({ open, setOpen }: Props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const handleClose = () => {
    setOpen(false);
  };

  const signupRequest = async () => {
    try {
      const result = await axios.post('/api/signup', { name, email, password });
      window.localStorage.setItem('token', JSON.stringify(result.data.token));
      history.push('/dashboard');
    } catch (e) {
      history.push('/');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="signup-dialog">
      <DialogTitle>Create an Account</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
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
        <Button onClick={signupRequest} color="primary">
          Sign Up
        </Button>
      </DialogActions>
    </Dialog>
  );
};
