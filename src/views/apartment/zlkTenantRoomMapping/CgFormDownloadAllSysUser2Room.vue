
<template>
  <div :class="mobile || height==0 ? 'cg-form':'cg-form just-v-scroll'" :style="mobile || height==0?'':'height:'+height+'px'">
    <el-form ref="cgForm" v-loading="recordLoading" :model="record" v-cg-form-adjust
                          :class="className" :rules="rules" 
             :label-position="labelPosition" :label-width="labelWidth" :size="$store.state.app.size" 
             hide-required-asterisk >
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-left_join cg-auto-focus" :label="$t('zlkTenantRoomMapping.field.userNo')" prop="userNo" :size="$store.state.app.size" >
            <el-input v-model="record.userNo" name="userNo" 
                      :readonly="true"
                      type="left_join" 
                      :label="$t('zlkTenantRoomMapping.field.userNo')" :placeholder="$t('system.message.needValue')" 
                      resize autofocus validate-event 
                      :maxlength="16" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-text" :label="$t('zlkTenantRoomMapping.field.password')" prop="password" :size="$store.state.app.size" >
            <el-input v-model="record.password" name="password" 
                      type="text" 
                      :label="$t('zlkTenantRoomMapping.field.password')" :placeholder="$t('system.message.unknown')" 
                      resize autofocus validate-event 
                      :readonly="isDetail" :maxlength="32" show-word-limit clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-datetime" :label="$t('zlkTenantRoomMapping.field.starttime')" prop="starttime" :size="$store.state.app.size" >
            <span slot="label"><cg-icon icon="fa fa-calendar-plus-o" :size="14" :width="20"/>{{$t('zlkTenantRoomMapping.field.starttime')}}</span>
            <cg-date-picker v-model="record.starttime" name="starttime" 
                            :align="mobile?'right':'center'" type="datetime" :title="$t('zlkTenantRoomMapping.field.starttime')" :readonly="isDetail" 
                            format="yyyy-MM-dd HH:mm" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-datetime" :label="$t('zlkTenantRoomMapping.field.endtime')" prop="endtime" :size="$store.state.app.size" >
            <span slot="label"><cg-icon icon="fa fa-calendar-plus-o" :size="14" :width="20"/>{{$t('zlkTenantRoomMapping.field.endtime')}}</span>
            <cg-date-picker v-model="record.endtime" name="endtime" 
                            :align="mobile?'right':'center'" type="datetime" :title="$t('zlkTenantRoomMapping.field.endtime')" :readonly="isDetail" 
                            format="yyyy-MM-dd HH:mm" clearable />
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
        {{ $t('zlkTenantRoomMapping.action.'+btn.action) }}
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
  name: 'CgFormDownloadAllSysUser2Room',
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
      path: 'downloadAllForm',
      idField: 'id',
      idSaved: this.openParams().record && typeof this.openParams().record === 'object' ? this.openParams().record.id : null,
      generatorName: 'zlkTenantRoomMapping',
      baseUrl: '/apartment/zlkTenantRoomMapping'
    }
  },
  computed: {
    addtionalActions() {
      return [
        {
          action: 'downloadAllSysUser2Room',
          icon: 'fa fa-cloud-download',
          title: 'zlkTenantRoomMapping.action.downloadAllSysUser2Room',
          groupid: 10,
          confirm: '',
          rowProperty: 'nr',
          displayProperties: 'ed',
          actionProperty: 'pg',
          appendClass: 'this.downloadAllSysUser2Room()',
          needRefresh: false
        }
      ]
    },
  },
  methods: {
    newRecord: function() {
        return {
            token: false,
            userNo: '',
        }
    },
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgFormDownloadAllSysUser2Room-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
    mixins
}
</script>
