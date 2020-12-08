
<template>
  <div :class="mobile || height==0 ? 'cg-form':'cg-form just-v-scroll'" :style="mobile || height==0?'':'height:'+height+'px'">
    <el-form ref="cgForm" v-loading="recordLoading" :model="record" v-cg-form-adjust
                          :class="className" :rules="rules" 
             :label-position="labelPosition" :label-width="labelWidth" :size="$store.state.app.size" 
             hide-required-asterisk >
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-text cg-auto-focus" :label="$t('zlkUser.field.realName')" prop="realName" :size="$store.state.app.size" >
            <el-input v-model="record.realName" name="realName" 
                      type="text" 
                      :label="$t('zlkUser.field.realName')" :placeholder="$t('system.message.needValue')" 
                      resize autofocus validate-event 
                      :readonly="isDetail" :maxlength="36" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-radio" :label="$t('zlkUser.field.sex')" prop="sex" :size="$store.state.app.size" >
            <cg-radio v-model="record.sex" name="sex" :dictionary="dictionary.dictSex" :readonly="isDetail" numberic  />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-text" :label="$t('zlkUser.field.phone')" prop="phone" :size="$store.state.app.size" >
            <el-input v-model="record.phone" name="phone" 
                      type="text" 
                      :label="$t('zlkUser.field.phone')" :placeholder="$t('system.message.needValue')" 
                      resize autofocus validate-event 
                      :readonly="isDetail" :maxlength="15" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-select" :label="$t('zlkUser.field.userType')" prop="userType" :size="$store.state.app.size" >
            <cg-select v-model="record.userType" name="userType"
                       :dictionary="dictionary.dictUserType" :readonly="isDetail" :filterable="false" :allow-create="false" :placeholder="$t('system.message.unknown')" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-select" :label="$t('zlkUser.field.idType')" prop="idType" :size="$store.state.app.size" >
            <cg-select v-model="record.idType" name="idType"
                       :readonly="!isNew"
                       :dictionary="dictionary.dictIdType" :filterable="false" :allow-create="false" numberic :placeholder="$t('system.message.needValue')" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-text" :label="$t('zlkUser.field.idNumber')" prop="idNumber" :size="$store.state.app.size" >
            <el-input v-model="record.idNumber" name="idNumber" 
                      :readonly="!isNew"
                      type="text" 
                      :label="$t('zlkUser.field.idNumber')" :placeholder="$t('system.message.needValue')" 
                      resize autofocus validate-event 
                      :maxlength="32" show-word-limit />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-select" :label="$t('zlkUser.field.area')" prop="area" :size="$store.state.app.size" >
            <cg-cascader v-model="record.area" name="area"
                         :readonly="!apSM || isDetail"
                         :filterable="false" multiple collapse-tags required 
                         :dictionary="dictionary.dictArea" :placeholder="$t('system.message.needValue')" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-text" :label="$t('zlkUser.field.employeeNo')" prop="employeeNo" :size="$store.state.app.size" >
            <el-input v-model="record.employeeNo" name="employeeNo" 
                      :readonly="!isNew"
                      type="text" 
                      :label="$t('zlkUser.field.employeeNo')" :placeholder="$t('system.message.needValue')" 
                      resize autofocus validate-event 
                      :maxlength="32" show-word-limit />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-datetime" :label="$t('zlkUser.field.vaildTime')" prop="vaildTime" :size="$store.state.app.size" >
            <span slot="label"><cg-icon icon="fa fa-calendar-plus-o" :size="14" :width="20"/>{{$t('zlkUser.field.vaildTime')}}</span>
            <cg-date-picker v-model="record.vaildTime" name="vaildTime" 
                            :minValue="new Date()"
                            :align="mobile?'right':'center'" type="datetime" :title="$t('zlkUser.field.vaildTime')" :readonly="isDetail" 
                            format="yyyy-MM-dd HH:mm" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-datetime" :label="$t('zlkUser.field.expiredTime')" prop="expiredTime" :size="$store.state.app.size" >
            <span slot="label"><cg-icon icon="fa fa-calendar-plus-o" :size="14" :width="20"/>{{$t('zlkUser.field.expiredTime')}}</span>
            <cg-date-picker v-model="record.expiredTime" name="expiredTime" 
                            :minValue="new Date()"
                            :align="mobile?'right':'center'" type="datetime" :title="$t('zlkUser.field.expiredTime')" :readonly="isDetail" 
                            format="yyyy-MM-dd HH:mm" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-text" :label="$t('zlkUser.field.userPassword')" prop="userPassword" :size="$store.state.app.size" >
            <el-input v-model="record.userPassword" name="userPassword" 
                      type="text" 
                      :label="$t('zlkUser.field.userPassword')" :placeholder="$t('system.message.unknown')" 
                      resize autofocus validate-event 
                      :readonly="isDetail" :maxlength="255" show-word-limit clearable />
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
        {{ $t('zlkUser.action.'+btn.action) }}
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
  name: 'CgFormUser',
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
      idField: 'userNo',
      userNoSaved: this.openParams().record && typeof this.openParams().record === 'object' ? this.openParams().record.userNo : null,
      dictionary: {
        dictSex: this.getDictionary('0,1','女,男'),
        dictUserType: [],
        dictIdType: [],
        dictArea: []
      },
      needLoadDictionary: true,
      generatorName: 'zlkUser',
      baseUrl: '/apartment/zlkUser'
    }
  },
  computed: {
    addtionalActions() {
      return [
        {
          action: 'sample',
          icon: 'fa fa-eyedropper',
          title: 'zlkUser.action.sample',
          groupid: 10,
          confirm: '',
          rowProperty: 'sr',
          displayProperties: 'rw,ed,tb',
          actionProperty: 'go',
          appendClass: '{url:"/reader/devPeople/sample",openMode:"edit"}',
          needRefresh: false
        },
      ]
    },
  },
  methods: {
    newRecord: function() {
        return {
            realName: '',
            idType: 0,
            idNumber: '',
        }
    },
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgFormUser-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
    mixins
}
</script>
