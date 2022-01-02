import React, { useState } from 'react';
import styles from './index.less';
import { Card, Toast, Form, Input, Button, Picker, Space } from 'antd-mobile';
import 'antd-mobile/es/global';
import * as LoginServices from '../../services/user';
import { Redirect, useHistory } from 'umi';
import { useDispatch } from 'react-redux';
import { save } from '@/models/user';
import { Code, UserLevel } from '@/types';
import useUser from '@/hooks/useUser';
import { DownFill } from 'antd-mobile-icons';
import style from '../index.less';
import { PatriarchLogin } from '@/services/patriarch';
import { Typography } from 'antd';
const { Title, Text } = Typography;
const Entry = () => {
  const user = useUser();
  return (
    <>
      {user.authority === -1 ? (
        <Login />
      ) : user.authority === 2 ? (
        <Redirect to="/teacher/academic" />
      ) : (
        <Redirect to="/user/academic" />
      )}
    </>
  );
};

interface LoginParamsProps {
  stu_number: string;
  password: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isRoleActive, setIsRoleActive] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [role, setRole] = useState<string>('学生');
  const checkStuNum = (_: any, value: string) => {
    if (value.length < 3) {
      return Promise.reject(new Error('输入的正确的账号'));
    }
    return Promise.resolve();
  };
  const checkPassword = (_: any, value: string) => {
    if (value.length < 5 || value.length > 16) {
      return Promise.reject(new Error('请输入小于16位大于5位的密码'));
    }
    return Promise.resolve();
  };
  const handleSubmit = async (values: LoginParamsProps) => {
    let res;
    let authority = role === '家长' ? 1 : role === '学生' ? 0 : 2;
    if (role === '家长') {
      res = await PatriarchLogin({
        account: values.stu_number,
        password: values.password,
      });
    } else {
      res = await LoginServices.login({ ...values });
    }
    if (res.status === Code.SuccessCode) {
      if (res.data.user.authority !== authority) {
        res.data.user.authority === 0
          ? Toast.show({ content: `请切换至学生身份登录` })
          : Toast.show({ content: `请切换至老师身份登录` });
      } else {
        dispatch(save({ ...res.data.user, token: res.data.token }));
        setLoading(true);
        Toast.show({
          content: '登录成功',
        });
        if (res.data.user.authority == 0 || res.data.user.authority == 1) {
          history.push('/user/academic');
        } else if (res.data.user.authority == 2) {
          history.push('/teacher/academic');
        }
      }
    } else {
      setLoading(false);
      Toast.show({
        content: '账号名/密码/身份错误',
      });
    }
  };
  const basicColumns = [
    [
      { label: '学生', value: '学生' },
      { label: '老师', value: '老师' },
      { label: '家长', value: '家长' },
    ],
  ];
  const handleRoleDropClick = async () => {
    setIsRoleActive(true);
    const value = await Picker.prompt({
      columns: basicColumns,
    });
    if (value && value[0]) {
      setRole(value[0]);
    }
    setIsRoleActive(false);
  };
  return (
    // <div>
    <div className={styles.container}>
      {/*<h2>土木学院素质拓展平台</h2>*/}
      <Title level={2}>土木学院素质拓展平台</Title>
      <Text type="secondary">学生账号为学号,所有账号将由学院统一分发</Text>
      <div className={styles.customBody}>
        <Form
          className={styles.form}
          onFinish={handleSubmit}
          layout="horizontal"
          footer={
            <Button block type="submit" color="primary">
              确认
            </Button>
          }
        >
          <Form.Item
            className={styles.form}
            name="role"
            label="身份"
            initialValue={role}
            rules={[{ required: true, message: '身份不能为空' }]}
          >
            <Space className={style.scoped}>
              <div className="my-adm-dropdown">
                <div className="my-adm-dropdown-nav">
                  <div
                    className={
                      isRoleActive
                        ? 'my-adm-dropdown-item my-adm-dropdown-item-active'
                        : 'my-adm-dropdown-item'
                    }
                    onClick={handleRoleDropClick}
                  >
                    <div
                      className={
                        isRoleActive
                          ? 'my-adm-dropdown-item-title my-adm-dropdown-item-highlight'
                          : 'my-adm-dropdown-item-title'
                      }
                    >
                      <span className="my-adm-dropdown-item-title-text">
                        {role}
                      </span>
                      <span
                        className={
                          isRoleActive
                            ? 'my-adm-dropdown-item-title-arrow my-adm-dropdown-item-title-arrow-active'
                            : 'my-adm-dropdown-item-title-arrow'
                        }
                      >
                        <DownFill fontSize={8} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Space>
          </Form.Item>
          <Form.Item
            className={styles.form}
            name="stu_number"
            label="账号"
            rules={[
              { required: true, message: '账号不能为空' },
              { validator: checkStuNum },
            ]}
          >
            <Input onChange={console.log} clearable placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
            className={styles.form}
            name="password"
            label="密码"
            rules={[
              { required: true, message: '密码不能为空' },
              { validator: checkPassword },
            ]}
          >
            <Input
              type="password"
              clearable
              onChange={console.log}
              placeholder="请输入密码"
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Entry;
