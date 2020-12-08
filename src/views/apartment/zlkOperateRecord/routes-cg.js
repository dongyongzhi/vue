import Layout from '@/layout'
export default {
  path: '/apartment/zlkOperateRecord',
  name: 'zlkOperateRecord',
  component: Layout,
  meta: {
    authorities: ['/apartment/zlkOperateRecord'],
    title: 'zlkOperateRecord.title.code',
    breadcrumb: false,
    tagView: false
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/apartment/zlkOperateRecord/list'),
      name: 'OperateRecordList',
      props: true,
      meta: {
        title: 'zlkOperateRecord.route.listTag',
        authorities: ['/apartment/zlkOperateRecord/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'record',
      component: () => import('@/views/apartment/zlkOperateRecord/record'),
      name: 'OperateRecordForm',
      props: true,
      meta: {
        title: 'zlkOperateRecord.route.recordTag',
        dialog: true,
        authorities: ['/apartment/zlkOperateRecord/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    }
  ]
}
