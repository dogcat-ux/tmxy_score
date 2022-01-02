import React, { useEffect, useState } from 'react';
import { TabBar } from 'antd-mobile';
import {
  AppOutline,
  ContentOutline,
  UserContactOutline,
} from 'antd-mobile-icons';
import { useHistory } from 'umi';
import useUser from '@/hooks/useUser';

const MyTabBar: React.FC = () => {
  const history = useHistory();
  const user = useUser();
  const tabs = [
    {
      key: 'academic',
      title: '学业成绩',
      icon: <ContentOutline />,
    },
    {
      key: 'quality',
      title: '素拓成绩',
      icon: <AppOutline />,
    },
    {
      key: 'profile',
      title: '个人中心',
      icon: <UserContactOutline />,
    },
  ];
  const [activeKey, setActiveKey] = useState('academic');
  const handleChange = (key: string) => {
    if (user.authority === 2) {
      history.push(`/teacher/${key}`);
    } else {
      history.push(`/user/${key}`);
    }
  };
  return (
    <>
      <TabBar onChange={handleChange} style={{ background: '#ffffff' }}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </>
  );
};
export default MyTabBar;
