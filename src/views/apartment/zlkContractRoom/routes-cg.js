import Layout from '@/layout'
export default {
  path: '/apartment/zlkContractRoom',
  name: 'zlkContractRoom',
  component: Layout,
  meta: {
    authorities: ['/apartment/zlkContractRoom'],
    title: 'zlkContractRoom.title.code',
    breadcrumb: false,
    tagView: false
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/apartment/zlkContractRoom/list'),
      name: 'ContractRoomList',
      props: true,
      meta: {
        title: 'zlkContractRoom.route.listTag',
        authorities: ['/apartment/zlkContractRoom/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    }
  ]
}
