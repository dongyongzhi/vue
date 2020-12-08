
<template>
  <div :class="mobile || height==0 ? 'cg-form':'cg-form just-v-scroll'" :style="mobile || height==0?'':'height:'+height+'px'">
    <el-form ref="cgForm" v-loading="recordLoading" :model="record" v-cg-form-adjust
                          :class="className" :rules="rules" 
             :label-position="labelPosition" :label-width="labelWidth" :size="$store.state.app.size" 
             hide-required-asterisk >
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-text cg-auto-focus" :label="$t('zlkOplog.field.roomName')" prop="roomName" :size="$store.state.app.size" >
            <el-input v-model="record.roomName" name="roomName" 
                      type="text" 
                      :label="$t('zlkOplog.field.roomName')" :placeholder="$t('system.message.unknown')" 
                      resize autofocus validate-event 
                      :readonly="isDetail" :maxlength="32" show-word-limit clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-select" :label="$t('zlkOplog.field.status')" prop="status" :size="$store.state.app.size" >
            <cg-select v-model="record.status" name="status"
                       :dictionary="dictionary.dictStatus" :readonly="isDetail" :filterable="false" :allow-create="false" numberic :placeholder="$t('system.message.unknown')" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="cg-item-text" :label="$t('zlkOplog.field.content')" prop="content" :size="$store.state.app.size" >
        <el-input v-model="record.content" name="content" 
                  type="text" 
                  :label="$t('zlkOplog.field.content')" :placeholder="$t('system.message.unknown')" 
                  resize autofocus validate-event 
                  :readonly="isDetail" :maxlength="500" show-word-limit clearable />
      </el-form-item>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-text" :label="$t('zlkOplog.field.commandName')" prop="commandName" :size="$store.state.app.size" >
            <el-input v-model="record.commandName" name="commandName" 
                      type="text" 
                      :label="$t('zlkOplog.field.commandName')" :placeholder="$t('system.message.unknown')" 
                      resize autofocus validate-event 
                      :readonly="isDetail" :maxlength="50" show-word-limit clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-text" :label="$t('zlkOplog.field.userNo')" prop="userNo" :size="$store.state.app.size" >
            <el-input v-model="record.userNo" name="userNo" 
                      type="text" 
                      :label="$t('zlkOplog.field.userNo')" :placeholder="$t('system.message.unknown')" 
                      resize autofocus validate-event 
                      :readonly="isDetail" :maxlength="16" show-word-limit clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-number" :label="$t('zlkOplog.field.devIndex')" prop="devIndex" :size="$store.state.app.size" >
            <cg-number-input v-model="record.devIndex" name="devIndex" 
                             :readonly="isDetail" 
                             :label="$t('zlkOplog.field.devIndex')" :placeholder="$t('system.message.unknown')" clearable 
                             />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div v-if="!isDetail" class="cg-form-buttons">
      <el-divider />
      <el-button v-if="hasAuthorityOf(myself,baseUrl,'edit',record)" class="cg-button" type="primary" plain :disabled="!recordChanged"
                 icon="el-icon-check" @click.native="submit()">
        {{ $t('system.action.save') }}
      </el-button>
      <el-button v-if="!mobile && showInDialog" class="cg-button" plain icon="el-icon-close"
                 @click.native="$emit('closeDialog')">
        {{ $t('system.action.close') }}
      </el-button>
    </div>
  </div>
</template>
<script>
import cgForm from '@/utils/cgForm'
import rulesObject from './rules.js'
import ParentForm from '@/views/common-views/components/form'
const Comp = {
  name: 'CgFormOplog',
  mixins: [ParentForm],
  props: {
    routeParams: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      allowEditRecord: false,
      allowAddRecord: false,
      defaultLabelPosition: 'top',
      rulesObject,
      isDialogForm: true,
      path: 'record',
      idField: 'id',
      idSaved: this.openParams().record && typeof this.openParams().record === 'object' ? this.openParams().record.id : null,
      dictionary: {
        dictStatus: []
      },
      needLoadDictionary: true,
      generatorName: 'zlkOplog',
      baseUrl: '/apartment/zlkOplog'
    }
  },
  methods: {
    just4elInputNumberNullBug: function() {
      if (this.record.devIndex === null) this.record.devIndex = undefined
    },
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgFormOplog-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
    mixins
}
</script>
