import Layout from '@/layout'
export default {
  path: '/apartment/zlkUserTemp',
  name: 'zlkUserTemp',
  component: Layout,
  meta: {
    authorities: ['/apartment/zlkUserTemp'],
    title: 'zlkUserTemp.title.code',
    breadcrumb: false,
    tagView: false
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/apartment/zlkUserTemp/list'),
      name: 'UserTempList',
      props: true,
      meta: {
        title: 'zlkUserTemp.route.listTag',
        authorities: ['/apartment/zlkUserTemp/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    }
  ]
}
