import { extend } from 'umi-request';
import { history } from 'umi';
import { Toast } from 'antd-mobile';

const request = extend({
  timeout: 20000, // 设置超时时长
  prefix:
    process.env.NODE_ENV === 'development'
      ? '/apl'
      : 'http://139.9.196.99:3000',
});
// 当前正在请求的数量
let requestCount = 0;
function showLoading() {
  if (requestCount === 0) {
    var dom = document.createElement('div');
    dom.setAttribute('id', 'loading');
    document.body.appendChild(dom);
    Toast.show({
      icon: 'loading',
      content: '加载中…',
      duration: 0,
    }); // ReactDOM.render(<Spin tip="加载中..." size="large"/>, dom)
  }
  requestCount++;
}
// 隐藏loading
function hideLoading() {
  requestCount--;
  if (requestCount === 0) {
    Toast.clear();
  }
}

request.interceptors.response.use((res) => {
  hideLoading();
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
  showLoading();
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
