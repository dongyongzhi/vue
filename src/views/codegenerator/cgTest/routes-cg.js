import Layout from '@/layout'
export default {
  path: '/codegenerator/cgTest',
  name: 'cgTest',
  component: Layout,
  meta: {
    authorities: ['/codegenerator/cgTest'],
    title: 'cgTest.title.code',
    breadcrumb: false,
    tagView: false
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/codegenerator/cgTest/list'),
      name: 'TestList',
      meta: {
        title: 'cgTest.route.listTag',
        icon: 'svg-user',
        authorities: ['/codegenerator/cgTest/list'],
        breadcrumb: true,
        tagView: true,
        noCache: false
      }
    },
    {
      path: 'record',
      component: () => import('@/views/codegenerator/cgTest/record'),
      name: 'TestForm',
      meta: {
        title: 'cgTest.route.recordTag',
        icon: 'svg-user',
        authorities: ['/codegenerator/cgTest/record'],
        breadcrumb: false,
        tagView: false,
        noCache: true
      }
    }
  ]
}
