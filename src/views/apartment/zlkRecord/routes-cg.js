import Layout from '@/layout'
export default {
  path: '/apartment/zlkRecord',
  name: 'zlkRecord',
  component: Layout,
  meta: {
    authorities: ['/apartment/zlkRecord'],
    title: 'zlkRecord.title.code',
    breadcrumb: false,
    tagView: false
  },
  children: [
    {
      path: 'error',
      component: () => import('@/views/apartment/zlkRecord/error'),
      name: 'ErrorList',
      props: true,
      meta: {
        title: 'zlkRecord.route.errorTag',
        authorities: ['/apartment/zlkRecord/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'lockStart',
      component: () => import('@/views/apartment/zlkRecord/lockStart'),
      name: 'LockStartList',
      props: true,
      meta: {
        title: 'zlkRecord.route.lockStartTag',
        authorities: ['/apartment/zlkRecord/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'list',
      component: () => import('@/views/apartment/zlkRecord/list'),
      name: 'RecordList',
      props: true,
      meta: {
        title: 'zlkRecord.route.listTag',
        authorities: ['/apartment/zlkRecord/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'record',
      component: () => import('@/views/apartment/zlkRecord/record'),
      name: 'RecordForm',
      props: true,
      meta: {
        title: 'zlkRecord.route.recordTag',
        dialog: true,
        authorities: ['/apartment/zlkRecord/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    }
  ]
}
