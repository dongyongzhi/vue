import Layout from '@/layout'
export default {
  path: '/framework/sysLog',
  name: 'sysLog',
  component: Layout,
  meta: {
    authorities: ['/framework/sysLog'],
    title: 'sysLog.title.code',
    breadcrumb: false,
    tagView: false
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/framework/sysLog/list'),
      name: 'SysLogList',
      props: true,
      meta: {
        title: 'sysLog.route.listTag',
        authorities: ['/framework/sysLog/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    }
  ]
}
