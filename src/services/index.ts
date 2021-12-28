import { extend } from 'umi-request';
import { history } from 'umi';
import { Toast } from 'antd-mobile';

const request = extend({
  prefix:
    process.env.NODE_ENV === 'development'
      ? '/apl'
      : 'http://139.9.196.99:3000',
});
request.interceptors.response.use((res) => {
  const codeMaps: Record<string, { msg: string; url?: string }> = {
    '401': {
      msg: 'Token Expired',
      url: '/login',
    },
    '500': {
      msg: 'Server Error',
    },
    '504': {
      msg: 'Gateway Timeout',
    },
  };
  if (res.status !== 200) {
    try {
      const { msg, url } = codeMaps[res.status];
      Toast.show({
        icon: 'fail',
        content: msg,
      });
      url && history.push('/middle');
    } catch (e) {
      Toast.show({
        icon: 'fail',
        content: res.statusText,
      });
    }
  }
  return res;
});

request.interceptors.request.use((url, options) => {
  return {
    url,
    options: {
      ...options,
      headers: {
        Authorization: localStorage.getItem('token') || '',
      },
    },
  };
});

export default request;
