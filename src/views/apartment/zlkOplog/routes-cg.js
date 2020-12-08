import Layout from '@/layout'
export default {
  path: '/apartment/zlkOplog',
  name: 'zlkOplog',
  component: Layout,
  meta: {
    authorities: ['/apartment/zlkOplog'],
    title: 'zlkOplog.title.code',
    breadcrumb: false,
    tagView: false
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/apartment/zlkOplog/list'),
      name: 'OplogList',
      props: true,
      meta: {
        title: 'zlkOplog.route.listTag',
        authorities: ['/apartment/zlkOplog/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'record',
      component: () => import('@/views/apartment/zlkOplog/record'),
      name: 'OplogForm',
      props: true,
      meta: {
        title: 'zlkOplog.route.recordTag',
        dialog: true,
        authorities: ['/apartment/zlkOplog/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    }
  ]
}
