import React, { useState } from 'react';
import styles from './index.less';
import delay from 'delay';
import Button from 'antd-mobile/es/components/button';
import { Card, Toast, Form, Input, TextArea } from 'antd-mobile';
import { AntOutline, RightOutline } from 'antd-mobile-icons';
import 'antd-mobile/es/global';
import * as LoginServices from '../../services/user';
import { Redirect, useHistory } from 'umi';
import { useDispatch } from 'react-redux';
import { save } from '@/models/user';
import { Code, UserLevel } from '@/types';
import _ from 'lodash';
import useUser from '@/hooks/useUser';

const Entry = () => {
  const user = useUser();
  return <>{user.authority === -1 ? <Login /> : (user.authority === 2? <Redirect to="/teacher/academic" />:<Redirect to="/user/academic" /> )}</>;
};

interface LoginParamsProps {
  stu_number: string;
  password: string;
}

const Login: React.FC = () => {
  // const submit = async (obj: object) => {
  // };
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const checkStuNum=(_: any,value:string)=>{
    if (value.length<3){
      return Promise.reject(new Error('输入的正确的账号'))
    }
    return Promise.resolve()
  }
  const checkPassword=(_: any,value:string)=>{
    if (value.length<5||value.length>16){
      return Promise.reject(new Error('请输入小于16位大于5位的密码'));
    }
    return Promise.resolve()
  }
  const handleSubmit = async (values: LoginParamsProps) => {
    const res = await LoginServices.login({ ...values });
    if (res.status === Code.SuccessCode) {
      console.log("login",res);
      console.log("token",res.data.token);
      dispatch(save({...res.data.user,token:res.data.token}));
      setLoading(true);
      Toast.show({
        content: '登录成功',
      });
      if(res.data.user.authority==0||res.data.user.authority==1){
        history.push('/user/academic');
      }else if(res.data.user.authority==2){
        history.push('/teacher/academic');
      }
    }else{
      setLoading(false);
      Toast.show({
        content: "账号名或密码错误"
      });
    }
  // _.hasIn(userInfo, 'a');?
};
//   const handleSubmit = (values: any) => {
//   console.log(JSON.stringify(values));
//   submit(values);
//
// };

return (
  // <div>
  <div className={styles.container}>
    <h1>土木学院素质拓展平台</h1>
    <Card
      bodyClassName={styles.customBody}>
      <Form
        onFinish={handleSubmit}
        layout='horizontal'
        footer={
          <Button block type='submit' color='primary'>
            确认
          </Button>
        }
      >
        <Form.Item
          name='stu_number'
          label='账号'
          rules={[
            { required: true, message: '账号不能为空' },
            { validator: checkStuNum }
          ]}
        >
          <Input onChange={console.log} clearable placeholder='请输入账号'/>
        </Form.Item>
        <Form.Item name='password' label='密码'
                   rules={[{ required: true, message: '密码不能为空' },
                     { validator: checkPassword}
                   ]}
        >
          <Input type="password" clearable onChange={console.log} placeholder='请输入密码'/>
        </Form.Item>
      </Form>
    </Card>
  </div>
);
}
;

export default Entry;
