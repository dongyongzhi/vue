<template>
  <div class="cg-list">
    <el-card shadow="hover">
      <div slot="header">
        <cg-header homeMenu icon="el-icon-s-operation" :hasMenu="hasMenu()"
                   :title="title" :content="content" @goBack="goBack" @menuAction="showActionSheet"
        />
      </div>
      <CgListCheckLog ref="cgList" :height="clientHeight" @detail="doShowDetail" :fixedQueryRecord="fixedQueryRecord"/>
    </el-card>
  </div>
</template>

<script>
import CgListCheckLog from './CgListCheckLog.vue'
import ParentList from '@/views/common-views/components/list'
const Comp = {
  name: 'CheckLogList',
  components: { CgListCheckLog },
  mixins: [ParentList],
  data() {
    return {
      fatherHeightPercent: 0,
      path: 'list',
      generatorName: 'zlkCheckLog',
      baseUrl: '/apartment/zlkCheckLog'
    }
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /list-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
  mixins
}
</script>
