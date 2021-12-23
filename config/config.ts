// https://umijs.org/config/
import { defineConfig } from 'umi';

import defaultSettings from './defaultSettings';
import proxy from './proxy';
// import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  dva: {
    hmr: true,
  },
  targets: {
    chrome: 49,
    ios: 10,
  },
  antd: { mobile: false },
  // layout: {
  //   // https://umijs.org/zh-CN/plugins/plugin-layout
  //   // siderWidth: 208,
  //   ...defaultSettings,
  // },
  theme: {
    'primary-color': defaultSettings.primaryColor,
    'root-entry-name': 'default',
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy['dev' || REACT_APP_ENV],
  manifest: {
    basePath: '/',
  },
  // base: process.env.NODE_ENV === 'production' ? '/admin/' : '/',
  // base: process.env.NODE_ENV === 'production' ? '/' : '/',
  // publicPath: process.env.NODE_ENV === 'production' ? '/admin/' : '/',
  // publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // Fast Refresh 热更新
  fastRefresh: {},
  nodeModulesTransform: { type: 'none' },
  webpack5: {},
  exportStatic: {},
  extraPostCSSPlugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-px-to-viewport')({
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是375
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: [], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // 允许在媒体查询中转换`px`
    }),
  ],
});
