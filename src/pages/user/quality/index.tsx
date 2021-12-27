import React from 'react';
import { Card, Empty } from 'antd-mobile';
import { AddCircleOutline } from 'antd-mobile-icons';
import UserHeader from '@/pages/user/components/userHeader';
import Auth from '@/wrappers/auth';
import { UserLevel } from '@/types';

const Quality: React.FC = () => {
  const onClick = () => {};

  return (
    <div>
      <UserHeader msg={'累计分数'} />
      <div>
        <Card
          title={
            <>
              <AddCircleOutline color="var(--adm-color-primary)" />
              <span style={{ marginLeft: '2px' }}>活动加分</span>
            </>
          }
          onClick={onClick}
          bodyStyle={
            {
              // border: '1px solid #000000',
            }
          }
        >
          <Empty />
        </Card>
        <Card
          title={
            <>
              <AddCircleOutline color="var(--adm-color-primary)" />
              <span style={{ marginLeft: '2px' }}>荣誉加分</span>
            </>
          }
          onClick={onClick}
          bodyStyle={
            {
              // border: '1px solid #000000',
            }
          }
        >
          <Empty />
          {/*23132132*/}
        </Card>
      </div>
      {/*<List>*/}
      {/*  <List.Item*/}
      {/*    extra='次要信息'*/}
      {/*    description='这里是描述信息'*/}
      {/*    clickable*/}
      {/*  >*/}
      {/*    这里是主信息*/}
      {/*  </List.Item>*/}
      {/*</List>*/}
    </div>
  );
};

const QualityPage = () => {
  return (
    <Auth level={UserLevel.Student}>
      <Quality />
    </Auth>
  );
};

export default QualityPage;
