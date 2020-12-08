import Layout from '@/layout'
export default {
  path: '/apartment/zlkRoom',
  name: 'zlkRoom',
  component: Layout,
  meta: {
    authorities: ['/apartment/zlkRoom'],
    title: 'zlkRoom.title.code',
    breadcrumb: false,
    tagView: false
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/apartment/zlkRoom/list'),
      name: 'RoomList',
      props: true,
      meta: {
        title: 'zlkRoom.route.listTag',
        authorities: ['/apartment/zlkRoom/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'roomView',
      component: () => import('@/views/apartment/zlkRoom/roomView'),
      name: 'RoomViewList',
      props: true,
      meta: {
        title: 'zlkRoom.route.roomViewTag',
        authorities: ['/apartment/zlkRoom/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'select',
      component: () => import('@/views/apartment/zlkRoom/select'),
      name: 'SelectRoomList',
      props: true,
      meta: {
        title: 'zlkRoom.route.selectTag',
        authorities: ['/apartment/zlkRoom/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'userSelect',
      component: () => import('@/views/apartment/zlkRoom/userSelect'),
      name: 'UserSelectRoomList',
      props: true,
      meta: {
        title: 'zlkRoom.route.userSelectTag',
        authorities: ['/apartment/zlkRoom/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'record',
      component: () => import('@/views/apartment/zlkRoom/record'),
      name: 'RoomForm',
      props: true,
      meta: {
        title: 'zlkRoom.route.recordTag',
        dialog: true,
        authorities: ['/apartment/zlkRoom/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    }
  ]
}
