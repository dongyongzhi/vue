
<template>
  <div :class="mobile || height==0 ? 'cg-form':'cg-form just-v-scroll'" :style="mobile || height==0?'':'height:'+height+'px'">
    <el-form ref="cgForm" v-loading="recordLoading" :model="record" v-cg-form-adjust
                          :class="className" :rules="rules" 
             :label-position="labelPosition" :label-width="labelWidth" :size="$store.state.app.size" 
             hide-required-asterisk >
      <el-row :gutter="mobile?0:20">
        <el-col :span="8">
          <el-form-item class="cg-item-text" :label="$t('devPeople.field.userNo')" prop="userNo" :size="$store.state.app.size" >
            <el-input v-model="record.userNo" name="userNo" 
                      type="text" 
                      :label="$t('devPeople.field.userNo')" :placeholder="$t('system.message.needValue')" 
                      resize autofocus validate-event 
                      readonly :maxlength="15" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="cg-item-text" :label="$t('devPeople.field.realName')" prop="realName" :size="$store.state.app.size" >
            <el-input v-model="record.realName" name="realName" 
                      type="text" 
                      :label="$t('devPeople.field.realName')" :placeholder="$t('system.message.needValue')" 
                      resize autofocus validate-event 
                      readonly :maxlength="32" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="cg-item-number" :label="$t('devPeople.field.regFingers')" prop="regFingers" :size="$store.state.app.size" >
            <cg-number-input v-model="record.regFingers" name="regFingers" 
                             readonly 
                             :label="$t('devPeople.field.regFingers')" :placeholder="$t('system.message.unknown')" clearable :precision="0" 
                             :min="0" :step="1" :title="$t('system.message.valueRange') + ': 0 - *'" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item :label="$t('devPeople.field.fingerNo1')+(record.warning1?'('+$t('devPeople.field.warning')+')':'')" class="cg-item-select" prop="fingerNo1" :size="$store.state.app.size" >
            <cg-select v-model="record.fingerNo1" name="fingerNo1"
                       v-set-input.input="record.warning1 ? {style: 'append:color:red!important'} : {}"
                       :dictionary="dictionary.dictFingerType" readonly :filterable="false" :allow-create="false" :placeholder="$t('system.message.unknown')" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('devPeople.field.fingerNo2')+(record.warning2?'('+$t('devPeople.field.warning')+')':'')" class="cg-item-select" prop="fingerNo2" :size="$store.state.app.size" >
            <cg-select v-model="record.fingerNo2" name="fingerNo2"
                       v-set-input.input="record.warning2 ? {style: 'append:color:red!important'} : {}"
                       :dictionary="dictionary.dictFingerType" readonly :filterable="false" :allow-create="false" :placeholder="$t('system.message.unknown')" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-select cg-auto-focus" :label="$t('devPeople.field.fingerType')" prop="fingerType" :size="$store.state.app.size" >
            <cg-select v-model="record.fingerType" name="fingerType"
                       :dictionary="dictionary.dictFingerType" :readonly="isDetail" :filterable="false" :allow-create="false" :placeholder="$t('system.message.needValue')" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-boolean" :label="$t('devPeople.field.warning')" prop="warning" :size="$store.state.app.size" >
            <el-switch v-model="record.warning" name="warning" active-color="red" :active-text="mobile?'':$t('devPeople.field.warning')" inactive-text="" :disabled="isDetail"  />
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
        {{ $t('devPeople.action.'+btn.action) }}
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
  name: 'CgFormDevVeinSample',
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
      path: 'sample',
      idField: 'userNo',
      userNoSaved: this.openParams().record && typeof this.openParams().record === 'object' ? this.openParams().record.userNo : null,
      dictionary: {
        dictOrgCode: [],
        dictIdType: [],
        dictUserType: this.getDictionary('1,2','管理员,普通人员'),
        dictRegisterType: [],
        dictFingerType: this.getDictionary('1,2,3,4,5,6,11,12','右食指,右中指,右无名指,左食指,左中指,左无名指,自定义1,自定义2')
      },
      needLoadDictionary: true,
      generatorName: 'devPeople',
      baseUrl: '/reader/devPeople'
    }
  },
  computed: {
    addtionalActions() {
      return [
        {
          action: 'connectDevice',
          icon: 'fa fa-gg  fa-fw',
          title: 'devPeople.action.connectDevice',
          groupid: 10,
          confirm: '',
          rowProperty: 'sr',
          displayProperties: 'hm,ed',
          actionProperty: 'js',
          appendClass: 'this.connect(0)',
          needRefresh: false
        },
        {
          action: 'registerFinger',
          icon: 'fa fa-hand-pointer-o  fa-fw',
          title: 'devPeople.action.registerFinger',
          groupid: 10,
          confirm: '',
          rowProperty: 'sr',
          displayProperties: 'hm,ed',
          actionProperty: 'pg',
          appendClass: 'this.sample()',
          needRefresh: false
        },
        {
          action: 'verifyFinger',
          icon: 'fa fa-hand-o-left  fa-fw',
          title: 'devPeople.action.verifyFinger',
          groupid: 10,
          confirm: '',
          rowProperty: 'sr',
          displayProperties: 'hm,ed',
          actionProperty: 'pg',
          appendClass: 'this.auth()',
          needRefresh: false
        },
        {
          action: 'matchFinger',
          icon: 'fa fa-address-book-o',
          title: 'devPeople.action.matchFinger',
          groupid: 10,
          confirm: '',
          rowProperty: 'sr',
          displayProperties: 'hm,ed',
          actionProperty: 'pg',
          appendClass: 'this.match()',
          needRefresh: false
        },
        {
          action: 'removeFinger',
          icon: 'fa fa-hand-grab-o  fa-fw',
          title: 'devPeople.action.removeFinger',
          groupid: 10,
          confirm: 'devPeople.action.removeFingerConfirm',
          rowProperty: 'sr',
          displayProperties: 'hm,ed',
          actionProperty: 'pg',
          appendClass: 'this.removeFinger()',
          needRefresh: false
        },
        {
          action: 'resetDevice',
          icon: 'fa fa-flash  fa-fw',
          title: 'devPeople.action.resetDevice',
          groupid: 10,
          confirm: '',
          rowProperty: 'sr',
          displayProperties: 'hm,ed',
          actionProperty: 'js',
          appendClass: 'this.resetU53()',
          needRefresh: false
        }
      ]
    },
  },
  methods: {
    just4elInputNumberNullBug: function() {
      if (this.record.regFingers === null) this.record.regFingers = undefined
    },
    newRecord: function() {
        return {
            orgCode: 0,
            idType: 1,
            idNumber: '',
            userType: 2,
            registerType: 1,
            realName: '',
            regFingers: 0,
            fingerNo1: '1',
            fingerType: '1',
            warning: false,
        }
    },
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgFormDevVeinSample-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
    mixins
}
</script>
