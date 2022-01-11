import React, { useState } from 'react';
import styles from './index.less';
import { Form, Image, Input, List, Modal, Space, Toast } from 'antd-mobile';
import { EditSOutline, TextDeletionOutline } from 'antd-mobile-icons';
import { logout, updateAvatar } from '@/models/user';
import { useDispatch } from 'react-redux';
import { useHistory } from 'umi';
import { amendPassword, changeAvatar } from '@/services/user';
import Button from 'antd-mobile/es/components/button';
import { Code } from '@/types';
import { Upload } from 'antd';
import {
  PatriarchAmendPassword,
  PatriarchChangeAvatar,
} from '@/services/patriarch';
import useUser from '@/hooks/useUser';

const ProfileHeader: React.FC = () => {
  const user = useUser();
  const [visible, setVisible] = useState(false);
  const avatar = localStorage.getItem('avatar');
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState<string>(avatar || '');
  // const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    history.push('/home');
  };
  const handleSubmit = async (values: API.AmendPasswordParams) => {
    const res =
      user.authority === 1
        ? await PatriarchAmendPassword({ ...values })
        : await amendPassword({ ...values });
    if (res.status === Code.SuccessCode) {
      Toast.show({
        content: '修改密码成功！请重新登录！',
      });
      setVisible(false);
      dispatch(logout());
      history.push('/login');
    } else if (res.status === Code.NoMatchCode) {
      Toast.show({
        content: '旧密码错误，不匹配！',
      });
    } else {
      Toast.show({
        content: '修改密码失败',
      });
    }
  };
  const handleAmendPassword = async () => {
    setVisible(true);
  };
  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file: any) => {
    //控制上传图片格式
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      Toast.show({
        icon: 'fail',
        content: '您只能上传JPG/PNG 文件!',
      });
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Toast.show({
        icon: 'fail',
        content: '图片大小必须小于2MB!',
      });
      return;
    }
    return isJpgOrPng && isLt2M;
  };
  const handleSubmitFile = async (file: any) => {
    let res;
    if (user.authority === 1) {
      res = await PatriarchChangeAvatar({ file: file.file });
    } else {
      res = await changeAvatar({ file: file.file });
    }
    if (res.status === Code.SuccessCode) {
      setImageUrl(imageUrl);
      Toast.show({
        icon: 'success',
        content: '更换头像成功!',
      });
      getBase64(file.file, (imageUrl: any) => {
        // setLoading(false);
        setImageUrl(imageUrl);
        dispatch(updateAvatar(imageUrl));
      });
    } else {
      Toast.show({
        icon: 'fail',
        content: '出了点小问题!',
      });
    }
  };
  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      // setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setImageUrl(imageUrl);
        // setLoading(false);
      });
    }
  };
  return (
    <div className={styles.scoped}>
      <Space className="header_box">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          customRequest={handleSubmitFile}
          beforeUpload={beforeUpload}
          accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          onChange={handleChange}
        >
          {imageUrl ? (
            <Image src={imageUrl} alt="avatar" className="avatar" fit="cover" />
          ) : (
            avatar
          )}
        </Upload>
        <div>
          <div>{user.user_name}</div>
          <div>{user.stu_number}</div>
        </div>
      </Space>
      <List>
        <List.Item arrow={false} onClick={handleAmendPassword}>
          <EditSOutline color="var(--adm-color-primary)" className="icon" />
          修改密码
        </List.Item>
        <List.Item arrow={false} onClick={handleLogout}>
          <TextDeletionOutline
            color="var(--adm-color-primary)"
            className="icon"
          />
          退出登录
        </List.Item>
      </List>
      <Modal
        visible={visible}
        content={
          <div>
            <Form
              style={{}}
              mode="card"
              onFinish={handleSubmit}
              layout="horizontal"
              footer={
                <Button block type="submit" color="primary">
                  确认
                </Button>
              }
            >
              <Form.Item
                name="old_password"
                label="旧密码"
                rules={[
                  { required: true, message: '密码不能为空' },
                  {
                    pattern: /^\w{6,16}$/,
                    message: '密码在6-16位内！',
                  },
                ]}
              >
                <Input
                  className="pass_input"
                  type="password"
                  clearable
                  onChange={console.log}
                  placeholder="请输入旧密码"
                />
              </Form.Item>
              <Form.Item
                name="new_password"
                label="新密码"
                rules={[
                  { required: true, message: '新密码不能为空' },
                  {
                    pattern: /^\w{6,16}$/,
                    message: '密码在6-16位内！',
                  },
                ]}
              >
                <Input
                  type="password"
                  clearable
                  onChange={console.log}
                  placeholder="请输入新密码"
                />
              </Form.Item>
            </Form>
          </div>
        }
        closeOnMaskClick
        showCloseButton
        onClose={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
export default ProfileHeader;
