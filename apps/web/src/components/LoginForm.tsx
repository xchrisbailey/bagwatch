import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const sendLoginRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axios.post('/api/login', { email, password });
      history.push('/dashboard');
      window.localStorage.setItem('token', JSON.stringify(result.data.token));
    } catch (e) {
      history.push('/');
    }
  };

  return (
    <form onSubmit={(e) => sendLoginRequest(e)}>
      <TextField
        id="emailField"
        label="Email"
        variant="outlined"
        margin="dense"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
      <TextField
        id="passwordField"
        label="Password"
        variant="outlined"
        margin="dense"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button>Submit</Button>
    </form>
  );
};
