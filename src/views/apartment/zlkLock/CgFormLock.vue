
<template>
  <div :class="mobile || height==0 ? 'cg-form':'cg-form just-v-scroll'" :style="mobile || height==0?'':'height:'+height+'px'">
    <el-form ref="cgForm" v-loading="recordLoading" :model="record" v-cg-form-adjust
                          :class="className" :rules="rules" 
             :label-position="labelPosition" :label-width="labelWidth" :size="$store.state.app.size" 
             hide-required-asterisk >
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-text cg-auto-focus" :label="$t('zlkLock.field.lockSn')" prop="lockSn" :size="$store.state.app.size" >
            <el-input v-model="record.lockSn" name="lockSn" 
                      :readonly="!isNew"
                      type="text" 
                      :label="$t('zlkLock.field.lockSn')" :placeholder="$t('system.message.needValue')" 
                      resize autofocus validate-event 
                      :maxlength="32" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-text" :label="$t('zlkLock.field.lockImei')" prop="lockImei" :size="$store.state.app.size" >
            <el-input v-model="record.lockImei" name="lockImei" 
                      :readonly="!isNew"
                      type="text" 
                      :label="$t('zlkLock.field.lockImei')" :placeholder="$t('system.message.needValue')" 
                      resize autofocus validate-event 
                      :maxlength="32" show-word-limit />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-text" :label="$t('zlkLock.field.lockName')" prop="lockName" :size="$store.state.app.size" >
            <el-input v-model="record.lockName" name="lockName" 
                      type="text" 
                      :label="$t('zlkLock.field.lockName')" :placeholder="$t('system.message.needValue')" 
                      resize autofocus validate-event 
                      :readonly="isDetail" :maxlength="32" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-select" :label="$t('zlkLock.field.modelComm')" prop="modelComm" :size="$store.state.app.size" >
            <cg-select v-model="record.modelComm" name="modelComm"
                       :readonly="!isNew"
                       :dictionary="dictionary.dictModelComm" :filterable="false" :allow-create="false" numberic :placeholder="$t('system.message.needValue')" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div v-if="!isDetail" class="cg-form-buttons">
      <el-divider />
      <el-button-group v-for = "(btn,index) in addtionalActions" :key="btn.action" style="margin-right:5px">
        <el-button v-if="hasAuthorityOf(myself,baseUrl,btn,record)" :class="'cg-button'+''+(btn.appendClass?' '+btn.appendClass:'')"
                   type="default" plain :icon="btn.icon" :disabled="hasOwnProperty('disabledAction') ? disabledAction(btn) : false"
                   @click.native="doAction(btn.action)" >
        {{ $t('zlkLock.action.'+btn.action) }}
        </el-button>
      </el-button-group>
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
  name: 'CgFormLock',
  mixins: [ParentForm],
  props: {
    routeParams: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      defaultLabelPosition: 'top',
      rulesObject,
      isDialogForm: true,
      path: 'record',
      idField: 'id',
      idSaved: this.openParams().record && typeof this.openParams().record === 'object' ? this.openParams().record.id : null,
      dictionary: {
        dictOnlineStatus: [],
        dictModelComm: []
      },
      needLoadDictionary: true,
      generatorName: 'zlkLock',
      baseUrl: '/apartment/zlkLock'
    }
  },
  computed: {
    addtionalActions() {
      return [
        {
          action: 'updateLock',
          icon: 'el-icon-circle-check',
          title: 'zlkLock.action.updateLock',
          groupid: 10,
          confirm: '',
          rowProperty: 'nr',
          displayProperties: 'ed',
          actionProperty: 'pg',
          appendClass: '',
          needRefresh: false
        },
        {
          action: 'addLock',
          icon: 'fa fa-hand-o-up',
          title: 'zlkLock.action.addLock',
          groupid: 10,
          confirm: '',
          rowProperty: 'nr',
          displayProperties: 'ed',
          actionProperty: 'pg',
          appendClass: '',
          needRefresh: false
        }
      ]
    },
  },
  methods: {
    newRecord: function() {
        return {
            onlineStatus: 2,
            modelComm: 1,
        }
    },
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgFormLock-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
    mixins
}
</script>
