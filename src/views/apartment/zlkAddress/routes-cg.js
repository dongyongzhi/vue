import Layout from '@/layout'
export default {
  path: '/apartment/zlkAddress',
  name: 'zlkAddress',
  component: Layout,
  meta: {
    authorities: ['/apartment/zlkAddress'],
    title: 'zlkAddress.title.code',
    breadcrumb: false,
    tagView: false
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/apartment/zlkAddress/list'),
      name: 'AddressList',
      props: true,
      meta: {
        title: 'zlkAddress.route.listTag',
        authorities: ['/apartment/zlkAddress/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'record',
      component: () => import('@/views/apartment/zlkAddress/record'),
      name: 'AddressForm',
      props: true,
      meta: {
        title: 'zlkAddress.route.recordTag',
        dialog: true,
        authorities: ['/apartment/zlkAddress/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    },
    {
      path: 'import',
      component: () => import('@/views/apartment/zlkAddress/import'),
      name: 'ImportRoomForm',
      props: true,
      meta: {
        title: 'zlkAddress.route.importTag',
        icon: 'fa fa-hand-o-up',
        dialog: true,
        authorities: ['/apartment/zlkAddress/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    }
  ]
}
