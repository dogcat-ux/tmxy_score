const routes = [
  {
    path: '/',
    component: '@/layouts/index.tsx',
    routes: [
      {
        path: '/404',
        exact: true,
        name: '404',
        component: '@/pages/404.tsx',
      },
      {
        path: '/home',
        exact: true,
        name: '土木学院成绩查询',
        component: '@/pages/home/index.tsx',
      },
      {
        path: '/index.html',
        exact: true,
        name: '土木学院成绩查询',
        redirect: '/login',
        component: '@/pages/index.tsx',
      },
      {
        path: '/',
        exact: true,
        name: '土木学院成绩查询',
        redirect: '/login',
        component: '@/pages/index.tsx',
      },
      {
        path: '/login',
        exact: true,
        name: '登录',
        component: '@/pages/login/index.tsx',
        title: '登录',
      },
      {
        path: '/middle',
        exact: true,
        name: '中间件',
        component: '@/pages/middle/index.tsx',
      },
      {
        path: '/teacher/academic',
        exact: true,
        name: '学业成绩',
        component: '@/pages/teacher/academic/index.tsx',
        meta: {
          title: '学业成绩',
        },
      },
      {
        path: '/teacher/academic/:stu_number',
        exact: true,
        name: '学业成绩',
        component: '@/pages/teacher/academic/[stu_number].tsx',
      },
      {
        path: '/teacher/quality/:stu_number',
        exact: true,
        name: '素拓成绩',
        component: '@/pages/teacher/quality/[stu_number].tsx',
      },
      {
        path: '/teacher/profile',
        exact: true,
        name: '个人中心',
        component: '@/pages/teacher/profile/index.tsx',
      },
      {
        path: '/teacher/quality',
        exact: true,
        name: '素拓成绩',
        component: '@/pages/teacher/quality/index.tsx',
      },
      {
        path: '/user/academic',
        exact: true,
        name: '学业成绩',
        component: '@/pages/user/academic/index.tsx',
      },
      {
        path: '/user/profile',
        exact: true,
        name: '个人中心',
        component: '@/pages/user/profile/index.tsx',
      },
      {
        path: '/user/quality',
        exact: true,
        name: '素拓成绩',
        component: '@/pages/user/quality/index.tsx',
      },
    ],
  },
];

export default routes;
