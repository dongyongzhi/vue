
<template>
  <div :class="mobile || height==0 ? 'cg-form':'cg-form just-v-scroll'" :style="mobile || height==0?'':'height:'+height+'px'">
    <el-form ref="cgForm" v-loading="recordLoading" :model="record" v-cg-form-adjust
                          :class="className" :rules="rules" 
             :label-position="labelPosition" :label-width="labelWidth" :size="$store.state.app.size" 
             hide-required-asterisk >
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-text cg-auto-focus" :label="$t('zlkOperateRecord.field.loginUserId')" prop="loginUserId" :size="$store.state.app.size" >
            <el-input v-model="record.loginUserId" name="loginUserId" 
                      type="text" 
                      :label="$t('zlkOperateRecord.field.loginUserId')" :placeholder="$t('system.message.unknown')" 
                      resize autofocus validate-event 
                      :readonly="isDetail" :maxlength="32" show-word-limit clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-datetime" :label="$t('zlkOperateRecord.field.operateTime')" prop="operateTime" :size="$store.state.app.size" >
            <span slot="label"><cg-icon icon="fa fa-calendar-plus-o" :size="14" :width="20"/>{{$t('zlkOperateRecord.field.operateTime')}}</span>
            <cg-date-picker v-model="record.operateTime" name="operateTime" 
                            :align="mobile?'right':'center'" type="datetime" :title="$t('zlkOperateRecord.field.operateTime')" :readonly="isDetail" 
                            format="yyyy-MM-dd HH:mm" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-select" :label="$t('zlkOperateRecord.field.operateStatus')" prop="operateStatus" :size="$store.state.app.size" >
            <cg-select v-model="record.operateStatus" name="operateStatus"
                       :dictionary="dictionary.dictOperateStatus" :readonly="isDetail" :filterable="false" :allow-create="false" numberic :placeholder="$t('system.message.unknown')" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="cg-item-text" :label="$t('zlkOperateRecord.field.note')" prop="note" :size="$store.state.app.size" >
        <el-input v-model="record.note" name="note" 
                  type="text" 
                  :label="$t('zlkOperateRecord.field.note')" :placeholder="$t('system.message.unknown')" 
                  resize autofocus validate-event 
                  :readonly="isDetail" :maxlength="255" show-word-limit clearable />
      </el-form-item>
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
  name: 'CgFormOperateRecord',
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
        dictOperateStatus: this.getDictionary('0,1','失败,成功')
      },
      generatorName: 'zlkOperateRecord',
      baseUrl: '/apartment/zlkOperateRecord'
    }
  },
  methods: {
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgFormOperateRecord-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
    mixins
}
</script>
