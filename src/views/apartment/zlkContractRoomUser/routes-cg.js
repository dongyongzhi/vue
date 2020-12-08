import Layout from '@/layout'
export default {
  path: '/apartment/zlkContractRoomUser',
  name: 'zlkContractRoomUser',
  component: Layout,
  meta: {
    authorities: ['/apartment/zlkContractRoomUser'],
    title: 'zlkContractRoomUser.title.code',
    breadcrumb: false,
    tagView: false
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/apartment/zlkContractRoomUser/list'),
      name: 'ContractRoomUserList',
      props: true,
      meta: {
        title: 'zlkContractRoomUser.route.listTag',
        authorities: ['/apartment/zlkContractRoomUser/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'record',
      component: () => import('@/views/apartment/zlkContractRoomUser/record'),
      name: 'ContractRoomUserForm',
      props: true,
      meta: {
        title: 'zlkContractRoomUser.route.recordTag',
        dialog: true,
        authorities: ['/apartment/zlkContractRoomUser/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    }
  ]
}
