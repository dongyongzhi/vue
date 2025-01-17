import Layout from '@/layout'
export default {
  path: '/framework/sysTask',
  name: 'sysTask',
  component: Layout,
  meta: {
    authorities: ['/framework/sysTask'],
    title: 'sysTask.title.code',
    breadcrumb: false,
    tagView: false
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/framework/sysTask/list'),
      name: 'TaskList',
      props: true,
      meta: {
        title: 'sysTask.route.listTag',
        authorities: ['/framework/sysTask/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'record',
      component: () => import('@/views/framework/sysTask/record'),
      name: 'TaskForm',
      props: true,
      meta: {
        title: 'sysTask.route.recordTag',
        dialog: true,
        authorities: ['/framework/sysTask/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    }
  ]
}
