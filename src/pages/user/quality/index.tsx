import React from 'react';
import MyTabBar from '@/components/tabBar';
import { Card, Empty, Grid, List } from 'antd-mobile';
import { Toast, Button } from 'antd-mobile';
import { AntOutline, RightOutline, AddCircleOutline } from 'antd-mobile-icons';
import UserHeader from '@/pages/user/components/userHeader';

const Quality: React.FC = () => {
  const onClick = () => {
    // Toast.show('点击了卡片');
  };

  return (
    <div>
      <UserHeader msg={"累计分数"}/>
      <div>
        {/*<Grid columns={3} gap={8}>*/}
        {/*  <Grid.Item>*/}
        {/*    活动名称*/}
        {/*  </Grid.Item>*/}
        {/*  <Grid.Item>*/}
        {/*    类型*/}
        {/*  </Grid.Item>*/}
        {/*  <Grid.Item>*/}
        {/*    分数*/}
        {/*  </Grid.Item>*/}
        {/*</Grid>*/}
        <Card
          title={<><AddCircleOutline color='var(--adm-color-primary)'/><span
            style={{ marginLeft: '2px' }}>活动加分</span></>}
          onClick={onClick}
          bodyStyle={{
            // border: '1px solid #000000',
          }}>
          <Empty />
        </Card>
        <Card
          title={<><AddCircleOutline color='var(--adm-color-primary)'/><span
            style={{ marginLeft: '2px' }}>荣誉加分</span></>}
          onClick={onClick}
          bodyStyle={{
            // border: '1px solid #000000',
          }}>
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

export default Quality;
