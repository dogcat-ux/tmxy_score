import { UserLevel } from '@/types';
import Auth from '@/wrappers/auth';
import React from 'react';
import Login from '@/pages/login';

const Home = () => {
  return (
    <Auth level={UserLevel.NotLogin}>
      <Login />
    </Auth>
  );
};

export default Home;
