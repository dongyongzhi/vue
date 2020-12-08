import Layout from '@/layout'
export default {
  path: '/apartment/zlkUser',
  name: 'zlkUser',
  component: Layout,
  meta: {
    authorities: ['/apartment/zlkUser'],
    title: 'zlkUser.title.code',
    breadcrumb: false,
    tagView: false
  },
  children: [
    {
      path: 'download',
      component: () => import('@/views/apartment/zlkUser/download'),
      name: 'DownloadUserList',
      props: true,
      meta: {
        title: 'zlkUser.route.downloadTag',
        authorities: ['/apartment/zlkUser/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'installList',
      component: () => import('@/views/apartment/zlkUser/installList'),
      name: 'InstallUserList',
      props: true,
      meta: {
        title: 'zlkUser.route.installListTag',
        authorities: ['/apartment/zlkUser/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'select',
      component: () => import('@/views/apartment/zlkUser/select'),
      name: 'TenantUserList',
      props: true,
      meta: {
        title: 'zlkUser.route.selectTag',
        authorities: ['/apartment/zlkUser/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'list',
      component: () => import('@/views/apartment/zlkUser/list'),
      name: 'UserList',
      props: true,
      meta: {
        title: 'zlkUser.route.listTag',
        authorities: ['/apartment/zlkUser/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'installForm',
      component: () => import('@/views/apartment/zlkUser/installForm'),
      name: 'InstallUserForm',
      props: true,
      meta: {
        title: 'zlkUser.route.installFormTag',
        dialog: true,
        authorities: ['/apartment/zlkUser/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    },
    {
      path: 'recordSelect',
      component: () => import('@/views/apartment/zlkUser/recordSelect'),
      name: 'TenantUserForm',
      props: true,
      meta: {
        title: 'zlkUser.route.recordSelectTag',
        dialog: true,
        authorities: ['/apartment/zlkUser/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    },
    {
      path: 'record',
      component: () => import('@/views/apartment/zlkUser/record'),
      name: 'UserForm',
      props: true,
      meta: {
        title: 'zlkUser.route.recordTag',
        dialog: true,
        authorities: ['/apartment/zlkUser/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    }
  ]
}
