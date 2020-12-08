
<template>
  <div :class="mobile || height==0 ? 'cg-form':'cg-form just-v-scroll'" :style="mobile || height==0?'':'height:'+height+'px'">
    <el-form ref="cgForm" v-loading="recordLoading" :model="record" v-cg-form-adjust
                          :class="className" :rules="rules" 
             :label-position="labelPosition" :label-width="labelWidth" :size="$store.state.app.size" 
             hide-required-asterisk enctype="multipart/form-data" >
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-file cg-auto-focus" :label="$t('zlkLock.field.LockFile')" prop="LockFile" :size="$store.state.app.size" >
            <cg-file v-model="blobRecord.LockFile" name="LockFile" :id="record.id" :baseUrl="baseUrl" field="LockFile" 
                     accept=".xls,.xlsx" :readonly="isDetail" 
                     @input="recordChanged=true"  />
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
  name: 'CgFormImportLock',
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
      path: 'import',
      idField: 'id',
      idSaved: this.openParams().record && typeof this.openParams().record === 'object' ? this.openParams().record.id : null,
      blobRecord:
      {
        LockFile: {
          name: this.openParams().record && typeof this.openParams().record === 'object' ? this.openParams().record.LockFile : null,
          blob: null
        },
      },
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
          action: 'importLockFile',
          icon: 'fa fa-hand-o-up',
          title: 'zlkLock.action.importLockFile',
          groupid: 10,
          confirm: '',
          rowProperty: 'nr',
          displayProperties: 'ed',
          actionProperty: 'pg',
          appendClass: '',
          needRefresh: false
        },
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
const mixinContext = require.context('.', false, /CgFormImportLock-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
    mixins
}
</script>
