import React, { useState } from 'react';
import useUser from '@/hooks/useUser';
import styles from './index.less';
import {
  ActionSheet,
  Card,
  Form,
  Image,
  ImageUploader,
  Input,
  List,
  Modal,
  Picker,
  Space,
  Tag,
  Toast,
} from 'antd-mobile';
import { EditSOutline, TextDeletionOutline } from 'antd-mobile-icons';
import { logout, save } from '@/models/user';
import { useDispatch } from 'react-redux';
import { useHistory } from 'umi';
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';
import { amendPassword, changeAvatar } from '@/services/user';
import Button from 'antd-mobile/es/components/button';
import * as LoginServices from '@/services/user';
import { Code } from '@/types';
import type {
  Action,
  ActionSheetRef,
} from 'antd-mobile/es/components/action-sheet';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const ProfileHeader: React.FC = () => {
  const user = useUser();
  const [visible, setVisible] = useState(false);
  const avatar = localStorage.getItem('avatar');
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState<string>(avatar || '');
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    history.push('/home');
  };
  const handleSubmit = async (values: API.AmendPasswordParams) => {
    const res = await amendPassword({ ...values });
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
  const checkPassword = (_: any, value: string) => {
    console.log(value);
    if (value.length < 5 || value.length > 16) {
      return Promise.reject(new Error('密码长度应大于5小于16'));
    }
    return Promise.resolve();
  };
  const handleAmendPassword = async () => {
    setVisible(true);
  };

  const handleSubmitFile = async (file: any) => {
    console.log('handleSubmitFile', file);
    const res = await changeAvatar({ file: file.file });
    if (res.status === Code.SuccessCode) {
      setImageUrl(imageUrl);
    }
  };
  const getBase64=(img:any, callback:any)=>{
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  const handleChange = (info:any) => {
    // if (info.file.status === 'uploading') {
    //   return;
    // }
    // if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl:any) =>
        {
          console.log(imageUrl);
        }
        // this.setState({
        //   imageUrl,
        //   loading: false,
        // }),
      );
    // }
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
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }}/> : avatar}
        </Upload>
        <div>
          <div>
            {user.user_name}
          </div>
          <div>
            {user.stu_number}
          </div>
        </div>
      </Space>
      <List>
        <List.Item
          arrow={false}
          onClick={handleAmendPassword}><EditSOutline color='var(--adm-color-primary)'
                                                      className="icon"/>修改密码</List.Item>
        <List.Item
          arrow={false}
          onClick={handleLogout}><TextDeletionOutline color='var(--adm-color-primary)'
                                                      className="icon"/>退出登录</List.Item>
      </List>
      <Modal
        visible={visible}
        content={
          <div>
            <Form
              style={{}}
              mode="card"
              onFinish={handleSubmit}
              layout='horizontal'
              footer={
                <Button block type='submit' color='primary'>
                  确认
                </Button>
              }
            >
              <Form.Item name='old_password' label='旧密码'
                         rules={[{ required: true, message: '密码不能为空' },
                           { validator: checkPassword },
                         ]}
              >
                <Input className="pass_input" type="password" clearable onChange={console.log} placeholder='请输入旧密码'/>
              </Form.Item>
              <Form.Item name='new_password' label='新密码'
                         rules={[{ required: true, message: '新密码不能为空' },
                           { validator: checkPassword },
                         ]}
              >
                <Input type="password" clearable onChange={console.log} placeholder='请输入新密码'/>
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
