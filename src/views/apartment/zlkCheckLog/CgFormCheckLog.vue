
<template>
  <div :class="mobile || height==0 ? 'cg-form':'cg-form just-v-scroll'" :style="mobile || height==0?'':'height:'+height+'px'">
    <el-form ref="cgForm" v-loading="recordLoading" :model="record" v-cg-form-adjust
                          :class="className" :rules="rules" 
             :label-position="labelPosition" :label-width="labelWidth" :size="$store.state.app.size" 
             hide-required-asterisk >
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-number cg-auto-focus" :label="$t('zlkCheckLog.field.id')" prop="id" :size="$store.state.app.size" >
            <cg-number-input v-model="record.id" name="id" 
                             :readonly="isDetail" 
                             :label="$t('zlkCheckLog.field.id')" :placeholder="$t('system.message.needValue')" 
                             />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-text" :label="$t('zlkCheckLog.field.phone')" prop="phone" :size="$store.state.app.size" >
            <el-input v-model="record.phone" name="phone" 
                      type="text" 
                      :label="$t('zlkCheckLog.field.phone')" :placeholder="$t('system.message.unknown')" 
                      resize autofocus validate-event 
                      :readonly="isDetail" :maxlength="16" show-word-limit clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-number" :label="$t('zlkCheckLog.field.status')" prop="status" :size="$store.state.app.size" >
            <cg-number-input v-model="record.status" name="status" 
                             :readonly="isDetail" 
                             :label="$t('zlkCheckLog.field.status')" :placeholder="$t('system.message.unknown')" clearable 
                             />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="cg-item-text" :label="$t('zlkCheckLog.field.type')" prop="type" :size="$store.state.app.size" >
        <el-input v-model="record.type" name="type" 
                  type="text" 
                  :label="$t('zlkCheckLog.field.type')" :placeholder="$t('system.message.unknown')" 
                  resize autofocus validate-event 
                  :readonly="isDetail" :maxlength="255" show-word-limit clearable />
      </el-form-item>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-datetime" :label="$t('zlkCheckLog.field.applyTime')" prop="applyTime" :size="$store.state.app.size" >
            <span slot="label"><cg-icon icon="fa fa-calendar-plus-o" :size="14" :width="20"/>{{$t('zlkCheckLog.field.applyTime')}}</span>
            <cg-date-picker v-model="record.applyTime" name="applyTime" 
                            :align="mobile?'right':'center'" type="datetime" :title="$t('zlkCheckLog.field.applyTime')" :readonly="isDetail" 
                            format="yyyy-MM-dd HH:mm" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-datetime" :label="$t('zlkCheckLog.field.checkTime')" prop="checkTime" :size="$store.state.app.size" >
            <span slot="label"><cg-icon icon="fa fa-calendar-plus-o" :size="14" :width="20"/>{{$t('zlkCheckLog.field.checkTime')}}</span>
            <cg-date-picker v-model="record.checkTime" name="checkTime" 
                            :align="mobile?'right':'center'" type="datetime" :title="$t('zlkCheckLog.field.checkTime')" :readonly="isDetail" 
                            format="yyyy-MM-dd HH:mm" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="cg-item-text" :label="$t('zlkCheckLog.field.checker')" prop="checker" :size="$store.state.app.size" >
        <el-input v-model="record.checker" name="checker" 
                  type="text" 
                  :label="$t('zlkCheckLog.field.checker')" :placeholder="$t('system.message.unknown')" 
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
  name: 'CgFormCheckLog',
  mixins: [ParentForm],
  props: {
  },
  data() {
    return {
      defaultLabelPosition: 'top',
      rulesObject,
      path: 'record',
      idField: 'id',
      idSaved: this.openParams().record && typeof this.openParams().record === 'object' ? this.openParams().record.id : null,
      generatorName: 'zlkCheckLog',
      baseUrl: '/apartment/zlkCheckLog'
    }
  },
  methods: {
    just4elInputNumberNullBug: function() {
      if (this.record.id === null) this.record.id = undefined
      if (this.record.status === null) this.record.status = undefined
    },
    newRecord: function() {
        return {
        }
    },
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgFormCheckLog-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
    mixins
}
</script>
