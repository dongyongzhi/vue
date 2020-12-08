
<template>
  <div :class="mobile || height==0 ? 'cg-form':'cg-form just-v-scroll'" :style="mobile || height==0?'':'height:'+height+'px'">
    <el-form ref="cgForm" v-loading="recordLoading" :model="record" v-cg-form-adjust
                          :class="className" :rules="rules" 
             :label-position="labelPosition" :label-width="labelWidth" :size="$store.state.app.size" 
             hide-required-asterisk >
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-text cg-auto-focus" :label="$t('zlkContract.field.name')" prop="name" :size="$store.state.app.size" >
            <el-input v-model="record.name" name="name" 
                      :readonly="!isNew"
                      type="text" 
                      :label="$t('zlkContract.field.name')" :placeholder="$t('system.message.needValue')" 
                      resize autofocus validate-event 
                      :maxlength="255" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-text" :label="$t('zlkContract.field.contractNumber')" prop="contractNumber" :size="$store.state.app.size" >
            <el-input v-model="record.contractNumber" name="contractNumber" 
                      :readonly="!isNew"
                      type="text" 
                      :label="$t('zlkContract.field.contractNumber')" :placeholder="$t('system.message.unknown')" 
                      resize autofocus validate-event 
                      :maxlength="32" show-word-limit clearable />
          </el-form-item>
        </el-col>
      </el-row>
     <el-row :gutter="mobile?0:20" v-for="(item, index) in contracts.detail">
        <el-col :span="10">
          <el-form-item class="cg-item-select" :label="$t('zlkContract.field.roomIds')" prop="roomIds" :size="$store.state.app.size" >
            <el-select v-model="contracts.detail[index].roomId"  @change="onChangeProgram" :disabled="!isNew" filterable>
                    <el-option v-for="(subItem,idx) in isNew?dictionary.dictRoomIds1:dictionary.dictRoomIds2" :key="subItem.value" :data-index='idx'
                      v-show="contracts.detail[index].roomId == subItem.value || !selectIdsArr.includes(subItem.value)"
                      :value="subItem.value" :label="subItem.text.local()">
                      {{subItem.text}}
                    </el-option>
                 </el-select>
                  <!-- <v-selectpage key-field="value" show-field="text" :disabled="!isNew"
                  :data="isNew?dictionary.dictRoomIds1:dictionary.dictRoomIds2"
                   v-model="item.roomId"
                   @values="singleValues"
                   :placeholder="$t('system.message.needValue')"
                  /> -->
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item class="cg-item-select" :label="$t('zlkContract.field.userNo')" prop="userNo" :size="$store.state.app.size" >
           <cg-select v-model="contracts.detail[index].userNo" name="userNo"
                       :readonly="!isNew" :dictionary="isNew?dictionary.dictUserNo1:dictionary.dictUserNo2"
                       :filterable="true" :allow-create="false" multiple :placeholder="$t('system.message.needValue')" />
                       <!-- <v-selectpage key-field="value" show-field="text" :disabled="!isNew"
                       :data="isNew?dictionary.dictUserNo1:dictionary.dictUserNo2"
                        v-model="item.userNo"
                        :multiple="true"
                        :max-select-limit="6"
                        :placeholder="$t('system.message.needValue')"
                       /> -->
          </el-form-item>
        </el-col>
        <el-button v-if="isNew&&index!=0" style="margin-left: 5px;margin-top: 30px;" icon="el-icon-delete" @click="delRoom(index)" circle></el-button>
        <el-button v-if="isNew&&index == 0&&contracts.detail.length<5" style="margin-left: 5px;margin-top: 30px;" icon="el-icon-circle-plus-outline" @click="addRoom()" circle></el-button>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item v-show="isNew" class="cg-item-select" :label="$t('zlkContract.field.applyIdType')" prop="applyIdType" :size="$store.state.app.size" >
            <cg-select v-model="record.applyIdType" name="applyIdType"
                       :dictionary="dictionary.dictApplyIdType" :readonly="isDetail" :filterable="false" :allow-create="false" :placeholder="$t('system.message.needValue')" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="isNew" class="cg-item-text" :label="$t('zlkContract.field.applyIdNumber')" prop="applyIdNumber" :size="$store.state.app.size" >
            <el-input v-model="record.applyIdNumber" name="applyIdNumber" 
                      type="text" 
                      :label="$t('zlkContract.field.applyIdNumber')" :placeholder="$t('system.message.needValue')" 
                      resize autofocus validate-event 
                      :readonly="isDetail" :maxlength="20" show-word-limit />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-text" :label="$t('zlkContract.field.password')" prop="password" :size="$store.state.app.size" >
            <el-input v-model="record.password" name="password" 
                      type="text" 
                      :label="$t('zlkContract.field.password')" :placeholder="$t('system.message.unknown')" 
                      resize autofocus validate-event 
                      :readonly="isDetail" :maxlength="255" show-word-limit clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-datetime" :label="$t('zlkContract.field.startTime')" prop="startTime" :size="$store.state.app.size" >
            <span slot="label"><cg-icon icon="fa fa-calendar-plus-o" :size="14" :width="20"/>{{$t('zlkContract.field.startTime')}}</span>
            <cg-date-picker v-model="record.startTime" name="startTime" 
                            :align="mobile?'right':'center'" type="datetime" :title="$t('zlkContract.field.startTime')" :readonly="isDetail" 
                            format="yyyy-MM-dd HH:mm" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-datetime" :label="$t('zlkContract.field.endTime')" prop="endTime" :size="$store.state.app.size" >
            <span slot="label"><cg-icon icon="fa fa-calendar-plus-o" :size="14" :width="20"/>{{$t('zlkContract.field.endTime')}}</span>
            <cg-date-picker v-model="record.endTime" name="endTime" 
                            :minValue="new Date()"
                            :align="mobile?'right':'center'" type="datetime" :title="$t('zlkContract.field.endTime')" :readonly="isDetail" 
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
  name: 'CgFormContract',
  mixins: [ParentForm],
  props: {
    routeParams: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      contracts: {
              detail: [{
      	}],
      },
      selectIdsArr:[],
      defaultLabelPosition: 'top',
      rulesObject,
      isDialogForm: true,
      path: 'record',
      idField: 'id',
      idSaved: this.openParams().record && typeof this.openParams().record === 'object' ? this.openParams().record.id : null,
      dictionary: {
        dictRoomIds: [],
        dictUserNo: [],
        dictApplyIdType: this.getDictionary('身份证,手机号','身份证,手机号')
      },
      needLoadDictionary: true,
      generatorName: 'zlkContract',
      baseUrl: '/apartment/zlkContract'
    }
  },
  methods: {
    newRecord: function() {
        return {
            roomIds: '',
            userNo: '',
            applyIdType: '',
        }
    },
        addRoom() {
          this.contracts.detail.push({})
        },
        delRoom(index) {
          this.contracts.detail.splice(index, 1)
          this.selectIdsArr.splice(index, 1)
        },
        onChangeProgram() {
          this.selectIdsArr = []
          for (const item of this.contracts.detail) {
            if (item.roomId) {
              this.selectIdsArr.push(item.roomId)
            }
          }
        }
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgFormContract-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
    mixins
}
</script>
