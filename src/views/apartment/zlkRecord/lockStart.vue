<template>
  <div class="cg-list">
    <el-card shadow="hover">
      <div slot="header">
        <cg-header homeMenu icon="el-icon-s-operation" :hasMenu="hasMenu()"
                   :title="title" :content="content" @goBack="goBack" @menuAction="showActionSheet"
        />
      </div>
      <CgListLockStart ref="cgList" :height="clientHeight" @detail="doShowDetail" :fixedQueryRecord="fixedQueryRecord"/>
    </el-card>
  </div>
</template>

<script>
import CgListLockStart from './CgListLockStart.vue'
import ParentList from '@/views/common-views/components/list'
const Comp = {
  name: 'LockStartList',
  components: { CgListLockStart },
  mixins: [ParentList],
  data() {
    return {
      path: 'lockStart',
      generatorName: 'zlkRecord',
      baseUrl: '/apartment/zlkRecord'
    }
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /lockStart-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
  mixins
}
</script>
