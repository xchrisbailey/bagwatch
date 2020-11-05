import React from 'react';
import { Header } from '../components/header';
import { LoginDialog } from '../components/LoginDialog';

const Landing = () => {
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false);
  return (
    <>
      <Header openLogin={setLoginDialogOpen} />
      <h1>bagwatch</h1>
      <LoginDialog open={loginDialogOpen} setOpen={setLoginDialogOpen} />
    </>
  );
};

export default Landing;
