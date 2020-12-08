
<template>
  <div :class="mobile || height==0 ? 'cg-form':'cg-form just-v-scroll'" :style="mobile || height==0?'':'height:'+height+'px'">
    <el-form ref="cgForm" v-loading="recordLoading" :model="record" v-cg-form-adjust
                          :class="className" :rules="rules"
             :label-position="labelPosition" :label-width="labelWidth" :size="$store.state.app.size"
             hide-required-asterisk >
      <el-tabs ref="tabs" v-model="tabSelected" @tab-click="autoFocus">
        <el-tab-pane :label="groupPaneTitle('zlkUserApply.title.groupUserApplyRealName')">
          <el-row :gutter="mobile?0:20">
            <el-col :span="12">
              <el-form-item class="cg-item-text cg-auto-focus" :label="$t('zlkUserApply.field.realName')" prop="realName" :size="$store.state.app.size" >
                <el-input v-model="record.realName" name="realName"
                          :readonly="!isNew"
                          type="text"
                          :label="$t('zlkUserApply.field.realName')" :placeholder="$t('system.message.unknown')"
                          resize autofocus validate-event
                          :maxlength="36" show-word-limit clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="cg-item-select" :label="$t('zlkUserApply.field.sex')" prop="sex" :size="$store.state.app.size" >
                <cg-select v-model="record.sex" name="sex"
                           :readonly="!isNew"
                           :dictionary="dictionary.dictSex" :filterable="false" :allow-create="false" numberic :placeholder="$t('system.message.unknown')" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="mobile?0:20">
            <el-col :span="12">
              <el-form-item class="cg-item-select" :label="$t('zlkUserApply.field.idType')" prop="idType" :size="$store.state.app.size" >
                <cg-select v-model="record.idType" name="idType"
                           :readonly="!isNew"
                           :dictionary="dictionary.dictIdType" :filterable="false" :allow-create="false" numberic :placeholder="$t('system.message.unknown')" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="cg-item-text" :label="$t('zlkUserApply.field.idNumber')" prop="idNumber" :size="$store.state.app.size" >
                <el-input v-model="record.idNumber" name="idNumber"
                          :readonly="!isNew"
                          type="text"
                          :label="$t('zlkUserApply.field.idNumber')" :placeholder="$t('system.message.unknown')"
                          resize autofocus validate-event
                          :maxlength="20" show-word-limit clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="mobile?0:20">
            <el-col :span="12">
              <el-form-item class="cg-item-select" :label="$t('zlkUserApply.field.userType')" prop="userType" :size="$store.state.app.size" >
                <cg-select v-model="record.userType" name="userType"
                           :readonly="!isNew"
                           :dictionary="dictionary.dictUserType" :filterable="false" :allow-create="false" numberic :placeholder="$t('system.message.unknown')" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="cg-item-text" :label="$t('zlkUserApply.field.phone')" prop="phone" :size="$store.state.app.size" >
                <el-input v-model="record.phone" name="phone"
                          :readonly="!isNew"
                          type="text"
                          :label="$t('zlkUserApply.field.phone')" :placeholder="$t('system.message.unknown')"
                          resize autofocus validate-event
                          :maxlength="16" show-word-limit clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="mobile?0:20">
            <el-col :span="12">
              <el-form-item class="cg-item-text" :label="$t('zlkUserApply.field.employee')" prop="employee" :size="$store.state.app.size" >
                <el-input v-model="record.employee" name="employee"
                          :readonly="!isNew"
                          type="text"
                          :label="$t('zlkUserApply.field.employee')" :placeholder="$t('system.message.unknown')"
                          resize autofocus validate-event
                          :maxlength="50" show-word-limit clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item class="cg-item-text" :label="$t('zlkUserApply.field.remark')" prop="remark" :size="$store.state.app.size" >
            <el-input v-model="record.remark" name="remark"
                      type="text"
                      :label="$t('zlkUserApply.field.remark')" :placeholder="$t('system.message.unknown')"
                      resize autofocus validate-event
                      :readonly="isDetail" :maxlength="255" show-word-limit clearable />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane :label="groupPaneTitle('zlkUserApply.title.groupUserApplyArea')">
          <el-row :gutter="mobile?0:20">
            <el-col :span="12">
              <el-form-item class="cg-item-select cg-auto-focus" :label="$t('zlkUserApply.field.area')" prop="area" :size="$store.state.app.size" >
                <cg-cascader v-model="record.area" name="area"
                             :readonly="flag||isNotSys"
                             :filterable="false" multiple collapse-tags clearable
                             :dictionary="dictionary.dictArea" :placeholder="$t('system.message.unknown')" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="cg-item-text" :label="$t('zlkUserApply.field.userPassword')" prop="userPassword" :size="$store.state.app.size" >
                <el-input v-model="record.userPassword" name="userPassword"
                          type="text"
                          :label="$t('zlkUserApply.field.userPassword')" :placeholder="$t('system.message.unknown')"
                          resize autofocus validate-event
                          :readonly="isNotSys" :maxlength="36" show-word-limit clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="mobile?0:20">
            <el-col :span="12">
              <el-form-item class="cg-item-datetime" :label="$t('zlkUserApply.field.vaildTime')" prop="vaildTime" :size="$store.state.app.size" >
                <span slot="label"><cg-icon icon="fa fa-calendar-plus-o" :size="14" :width="20"/>{{$t('zlkUserApply.field.vaildTime')}}</span>
                <cg-date-picker v-model="record.vaildTime" name="vaildTime"
                                :readonly="flag||isNotSys"
                                :align="mobile?'right':'center'" type="datetime" :title="$t('zlkUserApply.field.vaildTime')"
                                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="cg-item-datetime" :label="$t('zlkUserApply.field.expiredTime')" prop="expiredTime" :size="$store.state.app.size" >
                <span slot="label"><cg-icon icon="fa fa-calendar-plus-o" :size="14" :width="20"/>{{$t('zlkUserApply.field.expiredTime')}}</span>
                <cg-date-picker v-model="record.expiredTime" name="expiredTime"
                                :readonly="flag||isNotSys"
                                :align="mobile?'right':'center'" type="datetime" :title="$t('zlkUserApply.field.expiredTime')"
                                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item class="cg-item-textarea" :label="$t('zlkUserApply.field.msg')" prop="msg" :size="$store.state.app.size" >
            <el-input v-model="record.msg" name="msg"
                      type="textarea" :maxlength="255" show-word-limit
                      :label="$t('zlkUserApply.field.msg')" :placeholder="$t('system.message.unknown')" clearable
                      :readonly="isDetail" resize :autosize="{ minRows: 1, maxRows: 10 }" autofocus validate-event />
          </el-form-item>
          <el-row :gutter="mobile?0:20">
            <el-col :span="12">
              <el-form-item class="cg-item-radio" :label="$t('zlkUserApply.field.action')" prop="action" :size="$store.state.app.size" >
                <cg-radio v-model="record.action" name="action" :readonly="flag" :dictionary="dictionary.dictAction" numberic  />
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
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
  name: 'CgFormUserApply',
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
        dictSex: [],
        dictIdType: [],
        dictUserType: this.getDictionary('1,2,3','管理员,租户,安装人员'),
        dictArea: [],
        dictAction: this.getDictionary('1,2','同意,不同意')
      },
      needLoadDictionary: true,
      tabSelected: '0',
      generatorName: 'zlkUserApply',
      baseUrl: '/apartment/zlkUserApply'
    }
  },
  methods: {
    newRecord: function() {
        return {
        }
    },
    groupPaneTitle: function(defTitle) {
      return this.$t(defTitle)
    },
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgFormUserApply-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
    mixins
}
</script>
