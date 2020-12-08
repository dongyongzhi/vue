<template>
  <div class="cg-list">
    <el-card shadow="hover">
      <div slot="header">
        <cg-header homeMenu icon="el-icon-s-operation" :hasMenu="hasMenu()"
                   :title="title" :content="content" @goBack="goBack" @menuAction="showActionSheet"
        />
      </div>
      <CgListDownloadUser ref="cgList" :height="clientHeight" @detail="doShowDetail" :fixedQueryRecord="fixedQueryRecord"/>
    </el-card>
  </div>
</template>

<script>
import CgListDownloadUser from './CgListDownloadUser.vue'
import ParentList from '@/views/common-views/components/list'
const Comp = {
  name: 'DownloadUserList',
  components: { CgListDownloadUser },
  mixins: [ParentList],
  data() {
    return {
      path: 'download',
      generatorName: 'zlkUser',
      baseUrl: '/apartment/zlkUser'
    }
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /download-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
  mixins
}
</script>
