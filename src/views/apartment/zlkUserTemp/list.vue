<template>
  <div class="cg-list">
    <el-card shadow="hover">
      <div slot="header">
        <cg-header homeMenu icon="el-icon-s-operation" :hasMenu="hasMenu()"
                   :title="title" :content="content" @goBack="goBack" @menuAction="showActionSheet"
        />
      </div>
      <CgListUserTemp ref="cgList" :height="clientHeight" @detail="doShowDetail" :fixedQueryRecord="fixedQueryRecord"/>
    </el-card>
  </div>
</template>

<script>
import CgListUserTemp from './CgListUserTemp.vue'
import ParentList from '@/views/common-views/components/list'
const Comp = {
  name: 'UserTempList',
  components: { CgListUserTemp },
  mixins: [ParentList],
  data() {
    return {
      fatherHeightPercent: 0,
      path: 'list',
      generatorName: 'zlkUserTemp',
      baseUrl: '/apartment/zlkUserTemp'
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
