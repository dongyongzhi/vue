<template>
  <div class="cg-list">
    <el-card shadow="hover">
      <div slot="header">
        <cg-header homeMenu icon="el-icon-s-operation" :hasMenu="hasMenu()"
                   :title="title" :content="content" @goBack="goBack" @menuAction="showActionSheet"
        />
      </div>
      <CgListRoomView ref="cgList" :height="clientHeight" @detail="doShowDetail" :fixedQueryRecord="fixedQueryRecord"/>
    </el-card>
  </div>
</template>

<script>
import CgListRoomView from './CgListRoomView.vue'
import ParentList from '@/views/common-views/components/list'
const Comp = {
  name: 'RoomViewList',
  components: { CgListRoomView },
  mixins: [ParentList],
  data() {
    return {
      path: 'roomView',
      generatorName: 'zlkRoom',
      baseUrl: '/apartment/zlkRoom'
    }
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /roomView-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
  mixins
}
</script>
