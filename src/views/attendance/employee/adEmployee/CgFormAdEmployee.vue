
<template>
  <div :class="mobile || height==0 ? 'cg-form':'cg-form just-v-scroll'" :style="mobile || height==0?'':'height:'+height+'px'">
    <el-form ref="cgForm" v-loading="recordLoading" :model="record" v-cg-form-adjust
                          :class="className" :rules="rules" 
             :label-position="labelPosition" :label-width="labelWidth" :size="$store.state.app.size" 
             hide-required-asterisk >
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <cg-join v-model="idJoinVisible" readonly >
            <CgListUserJoin slot="popover" ref="idJoin" openID="id-join" :height="500" :joinShow="idJoinVisible" :joinMultiple="false"
                            :originSelections="String(record.id)" selectionKey="id" joinMode @closeJoinList="(rows)=>{ getJoinFields('id',rows)}"
                            @showJoinList="idJoinVisible=true" />
            <el-form-item class="cg-item-text" slot="reference" :label="$t('adEmployee.field.id')" prop="realName" :size="$store.state.app.size" >
              <el-input v-model="record.realName" name="realName" 
                        type="text" 
                        :label="$t('adEmployee.field.id')" :placeholder="$t('system.message.needValue')" 
                        resize autofocus validate-event 
                        readonly :maxlength="32" show-word-limit />
            </el-form-item>
          </cg-join>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-select" :label="$t('sysUser.field.orgCode')" prop="orgCode" :size="$store.state.app.size" >
            <cg-cascader v-model="record.orgCode" name="orgCode"
                         readonly :filterable="false" numberic clearable 
                         :dictionary="dictionary.dictOrgCode" show-all-levels :placeholder="$t('system.message.unknown')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-text cg-auto-focus" :label="$t('adEmployee.field.employeeNo')" :title="$t('adEmployee.field.employeeNoValid')" prop="employeeNo" :size="$store.state.app.size" >
            <el-input v-model="record.employeeNo" name="employeeNo" 
                      type="text" 
                      :label="$t('adEmployee.field.employeeNo')" :placeholder="$t('system.message.needValue')" 
                      resize autofocus validate-event 
                      :readonly="isDetail" :maxlength="32" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-number" :label="$t('adEmployee.field.emLevel')" :title="$t('adEmployee.field.emLevelValid')" prop="emLevel" :size="$store.state.app.size" >
            <cg-number-input v-model="record.emLevel" name="emLevel" 
                             :readonly="isDetail" 
                             :label="$t('adEmployee.field.emLevel')" :placeholder="$t('system.message.unknown')" clearable :precision="0" 
                             :min="0" :step="1" :title="$t('system.message.valueRange') + ': 0 - *'" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-boolean" :label="$t('adEmployee.field.isAttendance')" prop="isAttendance" :size="$store.state.app.size" >
            <el-switch v-model="record.isAttendance" name="isAttendance" :active-text="mobile?'':$t('adEmployee.field.isAttendance')" inactive-text="" :disabled="isDetail"  />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-date" :label="$t('adEmployee.field.enterDate')" prop="enterDate" :size="$store.state.app.size" >
            <span slot="label"><cg-icon icon="fa fa-calendar" :size="14" :width="20"/>{{$t('adEmployee.field.enterDate')}}</span>
            <cg-date-picker v-model="record.enterDate" name="enterDate" 
                            :align="mobile?'right':'center'" type="date" :title="$t('adEmployee.field.enterDate')" :readonly="isDetail" 
                            clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-date" :label="$t('adEmployee.field.leaveDate')" prop="leaveDate" :size="$store.state.app.size" >
            <span slot="label"><cg-icon icon="fa fa-calendar" :size="14" :width="20"/>{{$t('adEmployee.field.leaveDate')}}</span>
            <cg-date-picker v-model="record.leaveDate" name="leaveDate" 
                            :align="mobile?'right':'center'" type="date" :title="$t('adEmployee.field.leaveDate')" :readonly="isDetail" 
                            clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-select" :label="$t('adEmployee.field.shiftId')" prop="shiftId" :size="$store.state.app.size" >
            <cg-select v-model="record.shiftId" name="shiftId"
                       :dictionary="dictionary.dictShiftId" :readonly="isDetail" :filterable="false" :allow-create="false" numberic :placeholder="$t('system.message.unknown')" clearable />
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
import CgListUserJoin from '@/views/framework/sysUser/CgListUserJoin.vue'
import rulesObject from './rules.js'
import ParentForm from '@/views/common-views/components/form'
const Comp = {
  name: 'CgFormAdEmployee',
  mixins: [ParentForm],
  props: {
  },
  components: { CgListUserJoin },
  data() {
    return {
      allowAddRecord: false,
      defaultLabelPosition: 'top',
      rulesObject,
      path: 'record',
      idField: 'id',
      idSaved: this.openParams().record && typeof this.openParams().record === 'object' ? this.openParams().record.id : null,
      dictionary: {
        dictOrgCode: [],
        dictShiftId: []
      },
      needLoadDictionary: true,
      idJoinVisible: false,
      generatorName: 'adEmployee',
      baseUrl: '/attendance/employee/adEmployee'
    }
  },
  computed: {
  },
  methods: {
    just4elInputNumberNullBug: function() {
      if (this.record.emLevel === null) this.record.emLevel = undefined
    },
    getJoinFields(field,rows) {
      const joinDefine = {
        id: {
          valueField: 'id',
          fields: 'realName=realName,sex=sex,orgCode=orgCode,birthDate=birthDate'
        },
      }
      this[field+'JoinVisible'] = false
      this.setJoinValues(this.record, field, joinDefine[field], rows)
    }
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgFormAdEmployee-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
    mixins
}
</script>
