import React from 'react';
import MyTabBar from '@/components/tabBar';
import { List } from 'antd-mobile';
import { Image, Space } from 'antd-mobile';
import styles from './index.less'
import useUser from '@/hooks/useUser';
import ProfileHeader from '@/components/profileHeader';

const Profile: React.FC = () => {
  const user = useUser();
  return (
    <div className={styles.scoped}>
      <ProfileHeader/>
      {/*<Space>*/}
      {/*  <Image*/}
      {/*    src={''}*/}
      {/*    width={64}*/}
      {/*    height={64}*/}
      {/*    fit='cover'*/}
      {/*    style={{ borderRadius: 8 }}*/}
      {/*  />*/}
      {/*  <div>*/}
      {/*    132123*/}
      {/*  </div>*/}
      {/*</Space>*/}
      {/*<List>*/}
      {/*  <List.Item>修改密码</List.Item>*/}
      {/*</List>*/}
    </div>
  );
};

export default Profile;
