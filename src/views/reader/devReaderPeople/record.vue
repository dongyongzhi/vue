<template>
  <div class="cg-form">
    <el-card shadow="hover">
      <div slot="header" :class="titleColor">
        <cg-header hoemMenu :icon="icon" :content="content" :title="title"
                   :hasMenu="mobile && !isDetail" rightIcon = 'el-icon-check color-primary'
                   @menuAction="submit" @goBack="goBack"
        />
      </div>
      <CgFormDevReaderPeople ref="cgForm"
                             :routeParams="routeParams"
                             @openModeChanged="openModeChanged" />
    </el-card>
  </div>
</template>

<script>
import ParentForm from '@/views/common-views/components/record'
import CgFormDevReaderPeople from './CgFormDevReaderPeople'
const Comp = {
  name: 'DevReaderPeopleForm',
  components: { CgFormDevReaderPeople },
  mixins: [ParentForm],
  data() {
    return {
      path: 'record',
      generatorName: 'devReaderPeople',
      baseUrl: '/reader/devReaderPeople'
    }
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /record-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
  mixins
}
</script>
