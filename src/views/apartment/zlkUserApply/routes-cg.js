import Layout from '@/layout'
export default {
  path: '/apartment/zlkUserApply',
  name: 'zlkUserApply',
  component: Layout,
  meta: {
    authorities: ['/apartment/zlkUserApply'],
    title: 'zlkUserApply.title.code',
    breadcrumb: false,
    tagView: false
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/apartment/zlkUserApply/list'),
      name: 'UserApplyList',
      props: true,
      meta: {
        title: 'zlkUserApply.route.listTag',
        authorities: ['/apartment/zlkUserApply/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'record',
      component: () => import('@/views/apartment/zlkUserApply/record'),
      name: 'UserApplyForm',
      props: true,
      meta: {
        title: 'zlkUserApply.route.recordTag',
        dialog: true,
        authorities: ['/apartment/zlkUserApply/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    }
  ]
}
