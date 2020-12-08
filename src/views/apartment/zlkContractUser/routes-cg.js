import Layout from '@/layout'
export default {
  path: '/apartment/zlkContractUser',
  name: 'zlkContractUser',
  component: Layout,
  meta: {
    authorities: ['/apartment/zlkContractUser'],
    title: 'zlkContractUser.title.code',
    breadcrumb: false,
    tagView: false
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/apartment/zlkContractUser/list'),
      name: 'ContractUserList',
      props: true,
      meta: {
        title: 'zlkContractUser.route.listTag',
        authorities: ['/apartment/zlkContractUser/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    }
  ]
}
