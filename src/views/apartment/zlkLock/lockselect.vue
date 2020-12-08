<template>
  <div class="cg-list">
    <el-card shadow="hover">
      <div slot="header">
        <cg-header homeMenu icon="el-icon-s-operation" :hasMenu="hasMenu()"
                   :title="title" :content="content" @goBack="goBack" @menuAction="showActionSheet"
        />
      </div>
      <CgListLockSelect ref="cgList" :height="clientHeight" @detail="doShowDetail" :fixedQueryRecord="fixedQueryRecord"/>
    </el-card>
  </div>
</template>

<script>
import CgListLockSelect from './CgListLockSelect.vue'
import ParentList from '@/views/common-views/components/list'
const Comp = {
  name: 'LockSelectList',
  components: { CgListLockSelect },
  mixins: [ParentList],
  data() {
    return {
      path: 'lockselect',
      generatorName: 'zlkLock',
      baseUrl: '/apartment/zlkLock'
    }
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /lockselect-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
  mixins
}
</script>
