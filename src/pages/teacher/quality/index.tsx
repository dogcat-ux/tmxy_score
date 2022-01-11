import React from 'react';
import { Empty } from 'antd-mobile';
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
      <div
        style={{
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Empty
          style={{ padding: '64px 0' }}
          imageStyle={{ width: 128 }}
          description="暂无数据"
        />
      </div>
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
