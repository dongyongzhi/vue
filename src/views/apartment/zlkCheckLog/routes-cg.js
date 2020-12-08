import Layout from '@/layout'
export default {
  path: '/apartment/zlkCheckLog',
  name: 'zlkCheckLog',
  component: Layout,
  meta: {
    authorities: ['/apartment/zlkCheckLog'],
    title: 'zlkCheckLog.title.code',
    breadcrumb: false,
    tagView: false
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/apartment/zlkCheckLog/list'),
      name: 'CheckLogList',
      props: true,
      meta: {
        title: 'zlkCheckLog.route.listTag',
        authorities: ['/apartment/zlkCheckLog/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'record',
      component: () => import('@/views/apartment/zlkCheckLog/record'),
      name: 'CheckLogForm',
      props: true,
      meta: {
        title: 'zlkCheckLog.route.recordTag',
        authorities: ['/apartment/zlkCheckLog/record'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    }
  ]
}
