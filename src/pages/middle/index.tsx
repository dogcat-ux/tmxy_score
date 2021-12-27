import { useDispatch } from 'react-redux';
import { logout } from '@/models/user';
import { useEffect } from 'react';
import { history } from 'umi';

const Middle = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
    history.push('/login');
  }, []);

  return <></>;
};

export default Middle;
