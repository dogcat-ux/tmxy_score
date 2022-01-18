/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    // '/api/': {
    //   // 要代理的地址
    //   target: 'https://preview.pro.ant.design',
    //   // 配置了这个可以从 http 代理到 https
    //   // 依赖 origin 的功能可能需要这个，比如 cookie
    //   changeOrigin: true,
    // },
    '/apl/': {
      // target: 'https://c13f8236-8d1c-4f30-ab01-03bcdc181797.mock.pstmn.io',
      target: 'http://1.12.252.83:3000',
      // target: 'http://139.9.196.99:3000/',
      changeOrigin: true,
      pathRewrite: { '^/apl/': '' },
    },
  },
  test: {
    // '/api/': {
    //   target: 'https://proapi.azurewebsites.net',
    //   changeOrigin: true,
    //   pathRewrite: { '^': '' },
    // },
  },
  pre: {
    // '/apl/': {
    //   target: 'http://8.141.56.170:8009',
    //   changeOrigin: true,
    //   pathRewrite: { '^': '' },
    // },
  },
};
