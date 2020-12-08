import Layout from '@/layout'
export default {
  path: '/apartment/zlkLockRoomMapping',
  name: 'zlkLockRoomMapping',
  component: Layout,
  meta: {
    authorities: ['/apartment/zlkLockRoomMapping'],
    title: 'zlkLockRoomMapping.title.code',
    breadcrumb: false,
    tagView: false
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/apartment/zlkLockRoomMapping/list'),
      name: 'LockRoomMappingList',
      props: true,
      meta: {
        title: 'zlkLockRoomMapping.route.listTag',
        authorities: ['/apartment/zlkLockRoomMapping/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'record',
      component: () => import('@/views/apartment/zlkLockRoomMapping/record'),
      name: 'LockRoomMappingForm',
      props: true,
      meta: {
        title: 'zlkLockRoomMapping.route.recordTag',
        dialog: true,
        authorities: ['/apartment/zlkLockRoomMapping/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    }
  ]
}
