import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/header';

const Landing = () => {
  return (
    <>
      <Header />
      <h1>bagwatch</h1>
      <Link to="/dashboard">db</Link>
    </>
  );
};

export default Landing;
