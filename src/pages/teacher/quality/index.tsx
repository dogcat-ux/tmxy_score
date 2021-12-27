import React from 'react';
import { List } from 'antd-mobile';
import TeacherHeader from '@/pages/teacher/components/teacherHeader';
import Auth from '@/wrappers/auth';
import { UserLevel } from '@/types';

const Quality: React.FC = () => {
  const handleCancel = () => {};
  const handleChange = () => {};
  const handleSearch = () => {};
  return (
    <div>
      {/*// @ts-ignore*/}
      <TeacherHeader
        handleCancel={handleCancel}
        handleChange={handleChange}
        handleSearch={handleSearch}
      />
      <List>
        <List.Item extra="次要信息" description="这里是描述信息" clickable>
          这里是主信息
        </List.Item>
      </List>
    </div>
  );
};

const QualityPage = () => {
  return (
    <Auth level={UserLevel.Teacher}>
      <Quality />
    </Auth>
  );
};

export default QualityPage;
