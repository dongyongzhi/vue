<template>
  <div class="cg-form" :class="dialogClass">
    <el-dialog ref="dialog" v-el-drag-dialog :visible.sync="showDialog" top="0px" :class="dialogClass" :close-on-click-modal="false"
               :append-to-body="true" :show-close="!mobile || isDetail" :before-close="beforeClose" @closed="close">
      <div slot="title" :class="titleColor">
        <cg-header :icon="icon" :content="content" :title="title"
                   :hasMenu="mobile && !isDetail" rightIcon = 'el-icon-check color-primary'
                   @menuAction="submit" @goBack="close"
        />
      </div>
      <CgFormLockRoomMapping ref="cgForm"
                             :routeParams="routeParams"
                             :showInDialog="showDialog"
                             @closeDialog="handleClose"
                             @openModeChanged="openModeChanged" />
    </el-dialog>
  </div>
</template>

<script>
import ParentForm from '@/views/common-views/components/dialog'
import CgFormLockRoomMapping from './CgFormLockRoomMapping'
const Comp = {
  name: 'LockRoomMappingForm',
  components: { CgFormLockRoomMapping },
  mixins: [ParentForm],
  data() {
    return {
      path: 'record',
      generatorName: 'zlkLockRoomMapping',
      baseUrl: '/apartment/zlkLockRoomMapping'
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
