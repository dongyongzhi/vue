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
      <CgFormDeleteSysUser2Room ref="cgForm"
                                :routeParams="routeParams"
                                :showInDialog="showDialog"
                                @closeDialog="handleClose"
                                @openModeChanged="openModeChanged" />
    </el-dialog>
  </div>
</template>

<script>
import ParentForm from '@/views/common-views/components/dialog'
import CgFormDeleteSysUser2Room from './CgFormDeleteSysUser2Room'
const Comp = {
  name: 'DeleteSysUser2RoomForm',
  components: { CgFormDeleteSysUser2Room },
  mixins: [ParentForm],
  data() {
    return {
      path: 'deleteForm',
      generatorName: 'zlkTenantRoomMapping',
      baseUrl: '/apartment/zlkTenantRoomMapping'
    }
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /deleteForm-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
  mixins
}
</script>
