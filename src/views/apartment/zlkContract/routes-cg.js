import Layout from '@/layout'
export default {
  path: '/apartment/zlkContract',
  name: 'zlkContract',
  component: Layout,
  meta: {
    authorities: ['/apartment/zlkContract'],
    title: 'zlkContract.title.code',
    breadcrumb: false,
    tagView: false
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/apartment/zlkContract/list'),
      name: 'ContractList',
      props: true,
      meta: {
        title: 'zlkContract.route.listTag',
        authorities: ['/apartment/zlkContract/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'record',
      component: () => import('@/views/apartment/zlkContract/record'),
      name: 'ContractForm',
      props: true,
      meta: {
        title: 'zlkContract.route.recordTag',
        icon: 'el-icon-remove',
        dialog: true,
        authorities: ['/apartment/zlkContract/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    }
  ]
}
