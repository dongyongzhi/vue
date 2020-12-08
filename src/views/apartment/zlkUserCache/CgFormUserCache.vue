
<template>
  <div :class="mobile || height==0 ? 'cg-form':'cg-form just-v-scroll'" :style="mobile || height==0?'':'height:'+height+'px'">
    <el-form ref="cgForm" v-loading="recordLoading" :model="record" v-cg-form-adjust
                          :class="className" :rules="rules" 
             :label-position="labelPosition" :label-width="labelWidth" :size="$store.state.app.size" 
             hide-required-asterisk >
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-text cg-auto-focus" :label="$t('zlkUserCache.field.userNo')" prop="userNo" :size="$store.state.app.size" >
            <el-input v-model="record.userNo" name="userNo" 
                      :readonly="!isNew"
                      type="text" 
                      :label="$t('zlkUserCache.field.userNo')" :placeholder="$t('system.message.needValue')" 
                      resize autofocus validate-event 
                      :maxlength="16" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-text" :label="$t('zlkUserCache.field.name')" prop="name" :size="$store.state.app.size" >
            <el-input v-model="record.name" name="name" 
                      :readonly="!isNew"
                      type="text" 
                      :label="$t('zlkUserCache.field.name')" :placeholder="$t('system.message.unknown')" 
                      resize autofocus validate-event 
                      :maxlength="36" show-word-limit clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-text" :label="$t('zlkUserCache.field.password')" prop="password" :size="$store.state.app.size" >
            <el-input v-model="record.password" name="password" 
                      type="text" 
                      :label="$t('zlkUserCache.field.password')" :placeholder="$t('system.message.unknown')" 
                      resize autofocus validate-event 
                      :readonly="isDetail" :maxlength="255" show-word-limit clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-select" :label="$t('zlkUserCache.field.userType')" prop="userType" :size="$store.state.app.size" >
            <cg-select v-model="record.userType" name="userType"
                       :readonly="!isNew"
                       :dictionary="dictionary.dictUserType" :filterable="false" :allow-create="false" numberic :placeholder="$t('system.message.unknown')" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-datetime" :label="$t('zlkUserCache.field.startTime')" prop="startTime" :size="$store.state.app.size" >
            <span slot="label"><cg-icon icon="fa fa-calendar-plus-o" :size="14" :width="20"/>{{$t('zlkUserCache.field.startTime')}}</span>
            <cg-date-picker v-model="record.startTime" name="startTime" 
                            :align="mobile?'right':'center'" type="datetime" :title="$t('zlkUserCache.field.startTime')" :readonly="isDetail" 
                            format="yyyy-MM-dd HH:mm" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-datetime" :label="$t('zlkUserCache.field.endTime')" prop="endTime" :size="$store.state.app.size" >
            <span slot="label"><cg-icon icon="fa fa-calendar-plus-o" :size="14" :width="20"/>{{$t('zlkUserCache.field.endTime')}}</span>
            <cg-date-picker v-model="record.endTime" name="endTime" 
                            :align="mobile?'right':'center'" type="datetime" :title="$t('zlkUserCache.field.endTime')" :readonly="isDetail" 
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
  name: 'CgFormUserCache',
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
        dictUserType: []
      },
      needLoadDictionary: true,
      generatorName: 'zlkUserCache',
      baseUrl: '/apartment/zlkUserCache'
    }
  },
  methods: {
    newRecord: function() {
        return {
            userNo: '',
        }
    },
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgFormUserCache-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
    mixins
}
</script>
