import Layout from '@/layout'
export default {
  path: '/apartment/zlkUserCache',
  name: 'zlkUserCache',
  component: Layout,
  meta: {
    authorities: ['/apartment/zlkUserCache'],
    title: 'zlkUserCache.title.code',
    breadcrumb: false,
    tagView: false
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/apartment/zlkUserCache/list'),
      name: 'UserCacheList',
      props: true,
      meta: {
        title: 'zlkUserCache.route.listTag',
        authorities: ['/apartment/zlkUserCache/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'record',
      component: () => import('@/views/apartment/zlkUserCache/record'),
      name: 'UserCacheForm',
      props: true,
      meta: {
        title: 'zlkUserCache.route.recordTag',
        dialog: true,
        authorities: ['/apartment/zlkUserCache/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    }
  ]
}
