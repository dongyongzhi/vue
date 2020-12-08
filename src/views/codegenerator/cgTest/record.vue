<template>
  <div class="cg-form">
    <el-dialog v-el-drag-dialog :visible.sync="showDialog" :top="mobile? '0px':'100px'" :close-on-click-modal="false"
               destroy-on-close :append-to-body="true" :show-close="!mobile || isDetail" @closed="close">
      <div slot="title" :class="titleColor">
        <cg-header icon="svg-user"
                   :content="$t('cgTest.title.record')" :title="(isNew?$t('system.action.new'):(isDetail?$t('system.action.view'):$t('system.action.edit')))"
                   :hasMenu="mobile && !isDetail" rightIcon = 'el-icon-check color-primary'
                   @menuAction="submit" @goBack="close"
        />
      </div>
      <CgFormTest ref="cgForm"
                  :showInDialog="showDialog"
                  @closeDialog="showDialog = false"
                  @openModeChanged="openModeChanged" />
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog'
import CgFormTest from './CgFormTest'
const mixins = []
const mixinContext = require.context('.', false, /record-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default {
  name: 'TestForm',
  directives: { elDragDialog },
  components: { CgFormTest },
  mixins,
  data() {
    return {
      path: 'record',
      openMode: this.$route.query.openMode ? this.$route.query.openMode : null,
      showDialog: true,
      generatorName: 'cgTest',
      baseUrl: '/codegenerator/cgTest'
    }
  },
  computed: {
    mobile() {
      return this.$store.state.app.device === 'mobile'
    },
    isDetail() {
      return this.openMode === 'detail' || this.openMode === 'view'
    },
    isNew() {
      return !this.openMode || this.openMode === 'new' || this.openMode === 'add'
    },
    isEdit() {
      return this.openMode === 'edit' || this.openMode === 'modify'
    },
    titleColor() {
      if (this.isNew) return 'color-danger'
      else if (this.isEdit) return 'color-warning'
      else return 'color-info'
    }
  },
  methods: {
    close() {
      this.showDialog = false
      this.$store.dispatch('tagsView/activeLastAfterRemove', this.$route)
    },
    submit() {
      this.$refs.cgForm.submit()
    },
    openModeChanged(v) {
      this.openMode = v
    }
  }
}
</script>
