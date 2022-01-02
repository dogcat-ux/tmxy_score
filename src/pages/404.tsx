import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';
import { logout } from '@/models/user';
import { useDispatch } from 'react-redux';

const NoFoundPage: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          type="primary"
          onClick={() => {
            dispatch(logout());
            history.push('/');
          }}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default NoFoundPage;
