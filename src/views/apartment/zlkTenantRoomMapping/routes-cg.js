import Layout from '@/layout'
export default {
  path: '/apartment/zlkTenantRoomMapping',
  name: 'zlkTenantRoomMapping',
  component: Layout,
  meta: {
    authorities: ['/apartment/zlkTenantRoomMapping'],
    title: 'zlkTenantRoomMapping.title.code',
    breadcrumb: false,
    tagView: false
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/apartment/zlkTenantRoomMapping/list'),
      name: 'TenantRoomMappingList',
      props: true,
      meta: {
        title: 'zlkTenantRoomMapping.route.listTag',
        authorities: ['/apartment/zlkTenantRoomMapping/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'deleteForm',
      component: () => import('@/views/apartment/zlkTenantRoomMapping/deleteForm'),
      name: 'DeleteSysUser2RoomForm',
      props: true,
      meta: {
        title: 'zlkTenantRoomMapping.route.deleteFormTag',
        dialog: true,
        authorities: ['/apartment/zlkTenantRoomMapping/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    },
    {
      path: 'deleteType',
      component: () => import('@/views/apartment/zlkTenantRoomMapping/deleteType'),
      name: 'DeleteTypeForm',
      props: true,
      meta: {
        title: 'zlkTenantRoomMapping.route.deleteTypeTag',
        dialog: true,
        authorities: ['/apartment/zlkTenantRoomMapping/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    },
    {
      path: 'downloadAllForm',
      component: () => import('@/views/apartment/zlkTenantRoomMapping/downloadAllForm'),
      name: 'DownloadAllSysUser2RoomForm',
      props: true,
      meta: {
        title: 'zlkTenantRoomMapping.route.downloadAllFormTag',
        dialog: true,
        authorities: ['/apartment/zlkTenantRoomMapping/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    },
    {
      path: 'downloadForm',
      component: () => import('@/views/apartment/zlkTenantRoomMapping/downloadForm'),
      name: 'DownloadSysUser2RoomForm',
      props: true,
      meta: {
        title: 'zlkTenantRoomMapping.route.downloadFormTag',
        dialog: true,
        authorities: ['/apartment/zlkTenantRoomMapping/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    },
    {
      path: 'frozen',
      component: () => import('@/views/apartment/zlkTenantRoomMapping/frozen'),
      name: 'FrozenLockForm',
      props: true,
      meta: {
        title: 'zlkTenantRoomMapping.route.frozenTag',
        dialog: true,
        authorities: ['/apartment/zlkTenantRoomMapping/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    },
    {
      path: 'record',
      component: () => import('@/views/apartment/zlkTenantRoomMapping/record'),
      name: 'TenantRoomMappingForm',
      props: true,
      meta: {
        title: 'zlkTenantRoomMapping.route.recordTag',
        dialog: true,
        authorities: ['/apartment/zlkTenantRoomMapping/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    }
  ]
}
