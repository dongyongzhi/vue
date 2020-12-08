import Layout from '@/layout'
export default {
  path: '/apartment/zlkLock',
  name: 'zlkLock',
  component: Layout,
  meta: {
    authorities: ['/apartment/zlkLock'],
    title: 'zlkLock.title.code',
    breadcrumb: false,
    tagView: false
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/apartment/zlkLock/list'),
      name: 'LockList',
      props: true,
      meta: {
        title: 'zlkLock.route.listTag',
        authorities: ['/apartment/zlkLock/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'lockselect',
      component: () => import('@/views/apartment/zlkLock/lockselect'),
      name: 'LockSelectList',
      props: true,
      meta: {
        title: 'zlkLock.route.lockselectTag',
        authorities: ['/apartment/zlkLock/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'import',
      component: () => import('@/views/apartment/zlkLock/import'),
      name: 'ImportLockForm',
      props: true,
      meta: {
        title: 'zlkLock.route.importTag',
        icon: 'fa fa-hand-o-up',
        dialog: true,
        authorities: ['/apartment/zlkLock/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    },
    {
      path: 'record',
      component: () => import('@/views/apartment/zlkLock/record'),
      name: 'LockForm',
      props: true,
      meta: {
        title: 'zlkLock.route.recordTag',
        dialog: true,
        authorities: ['/apartment/zlkLock/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    }
  ]
}
