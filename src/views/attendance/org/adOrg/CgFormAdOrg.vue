
<template>
  <div :class="mobile || height==0 ? 'cg-form':'cg-form just-v-scroll'" :style="mobile || height==0?'':'height:'+height+'px'">
    <el-form ref="cgForm" v-loading="recordLoading" :model="record" v-cg-form-adjust
                          :class="className" :rules="rules" 
             :label-position="labelPosition" :label-width="labelWidth" :size="$store.state.app.size" 
             hide-required-asterisk >
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <cg-join v-model="orgCodeJoinVisible" readonly >
            <CgListOrg slot="popover" ref="orgCodeJoin" openID="orgcode-join" :height="500" :joinShow="orgCodeJoinVisible" :joinMultiple="false"
                       :originSelections="String(record.orgCode)" selectionKey="orgCode" joinMode @closeJoinList="(rows)=>{ getJoinFields('orgCode',rows)}"
                       @showJoinList="orgCodeJoinVisible=true" />
            <el-form-item class="cg-item-text" slot="reference" :label="$t('sysOrg.field.name')" prop="name" :size="$store.state.app.size" >
              <el-input v-model="record.name" name="name" 
                        type="text" 
                        :label="$t('sysOrg.field.name')" :placeholder="$t('system.message.unknown')" 
                        resize autofocus validate-event 
                        readonly :maxlength="32" show-word-limit clearable />
            </el-form-item>
          </cg-join>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-select cg-auto-focus" :label="$t('adOrg.field.shiftId')" prop="shiftId" :size="$store.state.app.size" >
            <cg-select v-model="record.shiftId" name="shiftId"
                       :dictionary="dictionary.dictShiftId" :readonly="isDetail" :filterable="false" :allow-create="false" numberic :placeholder="$t('system.message.unknown')" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <cg-join v-model="hrJoinVisible" :readonly="isDetail" >
            <CgListUserJoin slot="popover" ref="hrJoin" openID="hr-join" :height="500" :joinShow="hrJoinVisible" :joinMultiple="false"
                            :originSelections="String(record.hr)" selectionKey="id" joinMode @closeJoinList="(rows)=>{ getJoinFields('hr',rows)}"
                            @showJoinList="hrJoinVisible=true" />
            <el-form-item class="cg-item-text" slot="reference" :label="$t('adOrg.field.hr')" prop="hrName" :size="$store.state.app.size" >
              <el-input v-model="record.hrName" name="hrName" 
                        type="text" 
                        :label="$t('adOrg.field.hr')" :placeholder="$t('system.message.unknown')" 
                        resize autofocus validate-event 
                        readonly :maxlength="32" show-word-limit clearable />
            </el-form-item>
          </cg-join>
        </el-col>
        <el-col :span="12">
          <cg-join v-model="managerJoinVisible" :readonly="isDetail" >
            <CgListUserJoin slot="popover" ref="managerJoin" openID="manager-join" :height="500" :joinShow="managerJoinVisible" :joinMultiple="false"
                            :originSelections="String(record.manager)" selectionKey="id" joinMode @closeJoinList="(rows)=>{ getJoinFields('manager',rows)}"
                            @showJoinList="managerJoinVisible=true" />
            <el-form-item class="cg-item-text" slot="reference" :label="$t('adOrg.field.manager')" prop="managerName" :size="$store.state.app.size" >
              <el-input v-model="record.managerName" name="managerName" 
                        type="text" 
                        :label="$t('adOrg.field.manager')" :placeholder="$t('system.message.unknown')" 
                        resize autofocus validate-event 
                        readonly :maxlength="32" show-word-limit clearable />
            </el-form-item>
          </cg-join>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="8">
          <el-form-item class="cg-item-number" :label="$t('adOrg.field.manageLimit')" :title="$t('adOrg.field.manageLimitValid')" prop="manageLimit" :size="$store.state.app.size" >
            <cg-number-input v-model="record.manageLimit" name="manageLimit" 
                             :readonly="isDetail" 
                             :label="$t('adOrg.field.manageLimit')" :placeholder="$t('system.message.unknown')" clearable :precision="0" 
                             :min="0" :step="1" :title="$t('system.message.valueRange') + ': 0 - *'" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="cg-item-number" :label="$t('adOrg.field.deviation')" :title="$t('adOrg.field.deviationValid')" prop="deviation" :size="$store.state.app.size" >
            <cg-number-input v-model="record.deviation" name="deviation" 
                             :readonly="isDetail" 
                             :label="$t('adOrg.field.deviation')" :placeholder="$t('system.message.unknown')" clearable :precision="0" 
                             :min="0" :step="1" :title="$t('system.message.valueRange') + ': 0 - *'" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="cg-item-number" :label="$t('adOrg.field.floatLimit')" :title="$t('adOrg.field.floatLimitValid')" prop="floatLimit" :size="$store.state.app.size" >
            <cg-number-input v-model="record.floatLimit" name="floatLimit" 
                             :readonly="isDetail" 
                             :label="$t('adOrg.field.floatLimit')" :placeholder="$t('system.message.unknown')" clearable :precision="0" 
                             :min="0" :step="1" :title="$t('system.message.valueRange') + ': 0 - *'" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-number" :label="$t('adOrg.field.absentLimit')" :title="$t('adOrg.field.absentLimitValid')" prop="absentLimit" :size="$store.state.app.size" >
            <cg-number-input v-model="record.absentLimit" name="absentLimit" 
                             :readonly="isDetail" 
                             :label="$t('adOrg.field.absentLimit')" :placeholder="$t('system.message.unknown')" clearable :precision="0" 
                             :min="0" :step="1" :title="$t('system.message.valueRange') + ': 0 - *'" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-number" :label="$t('adOrg.field.freeWorkLimit')" prop="freeWorkLimit" :size="$store.state.app.size" >
            <cg-number-input v-model="record.freeWorkLimit" name="freeWorkLimit" 
                             :readonly="isDetail" 
                             :label="$t('adOrg.field.freeWorkLimit')" :placeholder="$t('system.message.unknown')" clearable :precision="0" 
                             :min="0" :step="1" :title="$t('system.message.valueRange') + ': 0 - *'" />
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
import CgListOrg from '@/views/framework/sysOrg/CgListOrg.vue'
import CgListUserJoin from '@/views/framework/sysUser/CgListUserJoin.vue'
import rulesObject from './rules.js'
import ParentForm from '@/views/common-views/components/form'
const Comp = {
  name: 'CgFormAdOrg',
  mixins: [ParentForm],
  props: {
    routeParams: {
      type: Object,
      default: null
    }
  },
  components: { CgListOrg, CgListUserJoin },
  data() {
    return {
      allowAddRecord: false,
      defaultLabelPosition: 'top',
      rulesObject,
      isDialogForm: true,
      path: 'record',
      idField: 'orgCode',
      orgCodeSaved: this.openParams().record && typeof this.openParams().record === 'object' ? this.openParams().record.orgCode : null,
      dictionary: {
        dictParent: [],
        dictShiftId: [],
        dictManagerOrgCode: []
      },
      needLoadDictionary: true,
      orgCodeJoinVisible: false,
      hrJoinVisible: false,
      managerJoinVisible: false,
      generatorName: 'adOrg',
      baseUrl: '/attendance/org/adOrg'
    }
  },
  computed: {
  },
  methods: {
    just4elInputNumberNullBug: function() {
      if (this.record.manageLimit === null) this.record.manageLimit = undefined
      if (this.record.deviation === null) this.record.deviation = undefined
      if (this.record.floatLimit === null) this.record.floatLimit = undefined
      if (this.record.absentLimit === null) this.record.absentLimit = undefined
      if (this.record.freeWorkLimit === null) this.record.freeWorkLimit = undefined
    },
    getJoinFields(field,rows) {
      const joinDefine = {
        orgCode: {
          valueField: 'orgCode',
          fields: 'sysOrgCode=orgCode,name=name,parent=parent'
        },
        hr: {
          valueField: 'id',
          fields: 'hrName=realName'
        },
        manager: {
          valueField: 'id',
          fields: 'managerName=realName,managerOrgCode=orgCode'
        },
      }
      this[field+'JoinVisible'] = false
      this.setJoinValues(this.record, field, joinDefine[field], rows)
    }
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgFormAdOrg-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
    mixins
}
</script>
