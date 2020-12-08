
<template>
  <div :class="mobile || height==0 ? 'cg-form':'cg-form just-v-scroll'" :style="mobile || height==0?'':'height:'+height+'px'">
    <el-form ref="cgForm" v-loading="recordLoading" :model="record" v-cg-form-adjust
                          :class="className" :rules="rules" 
             :label-position="labelPosition" :label-width="labelWidth" :size="$store.state.app.size" 
             hide-required-asterisk >
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-text cg-auto-focus" :label="$t('zlkRecord.field.roomName')" prop="roomName" :size="$store.state.app.size" >
            <el-input v-model="record.roomName" name="roomName" 
                      type="text" 
                      :label="$t('zlkRecord.field.roomName')" :placeholder="$t('system.message.unknown')" 
                      resize autofocus validate-event 
                      :readonly="isDetail" :maxlength="32" show-word-limit clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-select" :label="$t('zlkRecord.field.eventType')" prop="eventType" :size="$store.state.app.size" >
            <cg-select v-model="record.eventType" name="eventType"
                       :dictionary="dictionary.dictEventType" :readonly="isDetail" :filterable="false" :allow-create="false" numberic :placeholder="$t('system.message.unknown')" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-select" :label="$t('zlkRecord.field.typeDetail')" prop="typeDetail" :size="$store.state.app.size" >
            <cg-select v-model="record.typeDetail" name="typeDetail"
                       :dictionary="dictionary.dictTypeDetail" :readonly="isDetail" :filterable="false" :allow-create="false" numberic :placeholder="$t('system.message.unknown')" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-text" :label="$t('zlkRecord.field.userNo')" prop="userNo" :size="$store.state.app.size" >
            <el-input v-model="record.userNo" name="userNo" 
                      type="text" 
                      :label="$t('zlkRecord.field.userNo')" :placeholder="$t('system.message.unknown')" 
                      resize autofocus validate-event 
                      :readonly="isDetail" :maxlength="16" show-word-limit clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-datetime" :label="$t('zlkRecord.field.reportTime')" prop="reportTime" :size="$store.state.app.size" >
            <span slot="label"><cg-icon icon="fa fa-calendar-plus-o" :size="14" :width="20"/>{{$t('zlkRecord.field.reportTime')}}</span>
            <cg-date-picker v-model="record.reportTime" name="reportTime" 
                            :align="mobile?'right':'center'" type="datetime" :title="$t('zlkRecord.field.reportTime')" :readonly="isDetail" 
                            format="yyyy-MM-dd HH:mm" clearable />
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
  name: 'CgFormRecord',
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
        dictEventType: [],
        dictTypeDetail: []
      },
      needLoadDictionary: true,
      generatorName: 'zlkRecord',
      baseUrl: '/apartment/zlkRecord'
    }
  },
  methods: {
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgFormRecord-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
    mixins
}
</script>
