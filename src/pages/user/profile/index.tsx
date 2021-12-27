import React from 'react';
import MyTabBar from '@/components/tabBar';
import { List } from 'antd-mobile';
import { Image, Space } from 'antd-mobile';
import styles from './index.less';
import useUser from '@/hooks/useUser';
import ProfileHeader from '@/components/profileHeader';
import Auth from '@/wrappers/auth';
import { UserLevel } from '@/types';

const Profile: React.FC = () => {
  const user = useUser();
  return (
    <Auth level={UserLevel.Student}>
      <div className={styles.scoped}>
        <ProfileHeader />
      </div>
    </Auth>
  );
};

export default Profile;
