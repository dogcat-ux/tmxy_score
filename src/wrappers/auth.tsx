import useUser from '@/hooks/useUser';
import { UserLevel } from '@/types';
import { Result, Button } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'umi';

interface AuthProps {
  children: React.ReactNode;
  level: UserLevel;
}
const Auth: FC<AuthProps> = ({ children, level }) => {
  const history = useHistory();
  const location = history.location;
  const user = useUser();
  const [isForbidden, setIsForbidden] = useState(false);
  // const store = createStore(reducer, initialState);
  const handleClick = () => {
    history.push('/home');
  };
  useEffect(() => {
    document.title = '土木工程学院';
  }, []);
  useEffect(() => {
    console.log('location', location);
    if (user && user.authority >= level) {
      setIsForbidden(false);
    } else {
      setIsForbidden(true);
    }
  }, [user]);
  return (
    <>
      {user.authority === -1 && <Redirect to="/login" />}
      {isForbidden ? (
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Button type="primary" onClick={handleClick}>
              Back Home
            </Button>
          }
        />
      ) : (
        children
      )}
    </>
  );
};
export default Auth;
