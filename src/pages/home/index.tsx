import { UserLevel } from '@/types';
import Auth from '@/wrappers/auth';
import React, { useEffect } from 'react';
import Login from '@/pages/login';

const Home = () => {
  useEffect(() => {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (!isWeixin) {
      window.location.href =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=888';
    }
  }, []);
  return (
    <Auth level={UserLevel.NotLogin}>
      <Login />
    </Auth>
  );
};

export default Home;
