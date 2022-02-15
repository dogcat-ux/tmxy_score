import { Modal } from 'antd';
import { Toast } from 'antd-mobile';
import { Code } from '@/types';

const feedBack = (res: any, sucMsg: string, failMsg: string) => {
  if (res?.status === Code.SuccessCode) {
    // Toast.show(sucMsg);
    Toast.show({
      content: sucMsg,
      icon: 'success',
    });
    return true;
  } else {
    // Toast.show(res?.msg + res?.data || failMsg);
    Toast.show({
      content: res?.msg + res?.data || failMsg,
      icon: 'fail',
    });
    return false;
    // Modal.error({
    //   content: res?.msg + res?.data || failMsg,
    // });
  }
};
export const feedBackCall = (res: any, failMsg: string, callback: Function) => {
  if (res?.status === Code.SuccessCode) {
    callback();
    return true;
  } else {
    Toast.show({
      content: res?.msg + res?.data || failMsg,
      icon: 'fail',
    });
    return false;
  }
};
export default feedBack;
