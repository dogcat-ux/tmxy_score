import React from 'react';
import MyTabBar from '@/components/tabBar';
import { List } from 'antd-mobile';
import TeacherHeader from '@/pages/teacher/components/teacherHeader';

const Quality: React.FC = () => {
  return (
    <div>
      <TeacherHeader/>
      <List>
        <List.Item
          extra='次要信息'
          description='这里是描述信息'
          clickable
        >
          这里是主信息
        </List.Item>
      </List>
    </div>
  );
};

export default Quality;
