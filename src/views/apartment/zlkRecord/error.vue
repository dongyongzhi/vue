<template>
  <div class="cg-list">
    <el-card shadow="hover">
      <div slot="header">
        <cg-header homeMenu icon="el-icon-s-operation" :hasMenu="hasMenu()"
                   :title="title" :content="content" @goBack="goBack" @menuAction="showActionSheet"
        />
      </div>
      <CgListError ref="cgList" :height="clientHeight" @detail="doShowDetail" :fixedQueryRecord="fixedQueryRecord"/>
    </el-card>
  </div>
</template>

<script>
import CgListError from './CgListError.vue'
import ParentList from '@/views/common-views/components/list'
const Comp = {
  name: 'ErrorList',
  components: { CgListError },
  mixins: [ParentList],
  data() {
    return {
      path: 'error',
      generatorName: 'zlkRecord',
      baseUrl: '/apartment/zlkRecord'
    }
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /error-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
  mixins
}
</script>
