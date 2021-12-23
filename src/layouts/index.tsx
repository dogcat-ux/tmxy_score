import React, { FC, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '@/models';
import styles from './index.less';
import MyTabBar from '@/components/tabBar';
import useUser from '@/hooks/useUser';
import { PullToRefresh } from 'antd-mobile';
import { sleep } from 'antd-mobile/es/utils/sleep';

const Entry: FC<any> = ({ children }) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <MyLayout>{children}</MyLayout>
      </Provider>
    </React.StrictMode>
  );
};

const MyLayout: React.FC<any> = ({ children }) => {
  const user = useUser();

  return (
    <>
      {user.authority === -1 ? (
        children
      ) : (
        <div className={styles.layoutBox}>
          <section>{children}</section>
          <footer>
            <MyTabBar />
          </footer>
        </div>
      )}
    </>
  );
};

export default Entry;
