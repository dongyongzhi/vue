
<template>
  <div :class="mobile || height==0 ? 'cg-form':'cg-form just-v-scroll'" :style="mobile || height==0?'':'height:'+height+'px'">
    <el-form ref="cgForm" v-loading="recordLoading" :model="record" v-cg-form-adjust
                          :class="className" :rules="rules" 
             :label-position="labelPosition" :label-width="labelWidth" :size="$store.state.app.size" 
             hide-required-asterisk >
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <cg-join v-model="userNoJoinVisible" :readonly="isDetail" >
            <CgListTenantUser slot="popover" ref="userNoJoin" openID="userno-join" :height="500" :joinShow="userNoJoinVisible" :joinMultiple="false"
                              :originSelections="String(record.userNo)" selectionKey="userNo" joinMode @closeJoinList="(rows)=>{ getJoinFields('userNo',rows)}"
                              @showJoinList="userNoJoinVisible=true" />
            <el-form-item class="cg-item-text cg-auto-focus" slot="reference" :label="$t('zlkTenantRoomMapping.field.userNo')" prop="realName" :size="$store.state.app.size" >
              <el-input v-model="record.realName" name="realName" 
                        type="text" 
                        :label="$t('zlkTenantRoomMapping.field.userNo')" :placeholder="$t('system.message.needValue')" 
                        resize autofocus validate-event 
                        readonly :maxlength="36" show-word-limit />
            </el-form-item>
          </cg-join>
        </el-col>
        <el-col :span="12">
          <cg-join v-model="roomIdJoinVisible" :readonly="isDetail" >
            <CgListRoomView slot="popover" ref="roomIdJoin" openID="roomid-join" :height="500" :joinShow="roomIdJoinVisible" :joinMultiple="true"
                            :originSelections="String(record.roomId)" selectionKey="id" joinMode @closeJoinList="(rows)=>{ getJoinFields('roomId',rows)}"
                            @showJoinList="roomIdJoinVisible=true" />
            <el-form-item class="cg-item-text" slot="reference" :label="$t('zlkTenantRoomMapping.field.roomId')" prop="roomName" :size="$store.state.app.size" >
              <el-input v-model="record.roomName" name="roomName" 
                        type="text" 
                        :label="$t('zlkTenantRoomMapping.field.roomId')" :placeholder="$t('system.message.needValue')" 
                        resize autofocus validate-event 
                         clearable @clear="clearJoinValues(myself,'roomIdJoin')"/>
            </el-form-item>
          </cg-join>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-text" :label="$t('zlkTenantRoomMapping.field.password')" prop="password" :size="$store.state.app.size" >
            <el-input v-model="record.password" name="password" 
                      type="text" 
                      :label="$t('zlkTenantRoomMapping.field.password')" :placeholder="$t('system.message.unknown')" 
                      resize autofocus validate-event 
                       clearable @clear="clearJoinValues(myself,'roomIdJoin')"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <cg-join v-model="contractIdJoinVisible" :readonly="isDetail" >
            <CgListContract slot="popover" ref="contractIdJoin" openID="contractid-join" :height="500" :joinShow="contractIdJoinVisible" :joinMultiple="false"
                            :originSelections="String(record.contractId)" selectionKey="id" joinMode @closeJoinList="(rows)=>{ getJoinFields('contractId',rows)}"
                            @showJoinList="contractIdJoinVisible=true" />
            <el-form-item class="cg-item-text" slot="reference" :label="$t('zlkTenantRoomMapping.field.contractId')" prop="name" :size="$store.state.app.size" >
              <el-input v-model="record.name" name="name" 
                        type="text" 
                        :label="$t('zlkTenantRoomMapping.field.contractId')" :placeholder="$t('system.message.unknown')" 
                        resize autofocus validate-event 
                         clearable @clear="clearJoinValues(myself,'roomIdJoin')"/>
            </el-form-item>
          </cg-join>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-datetime" :label="$t('zlkTenantRoomMapping.field.starttime')" prop="starttime" :size="$store.state.app.size" >
            <span slot="label"><cg-icon icon="fa fa-calendar-plus-o" :size="14" :width="20"/>{{$t('zlkTenantRoomMapping.field.starttime')}}</span>
            <cg-date-picker v-model="record.starttime" name="starttime" 
                            :align="mobile?'right':'center'" type="datetime" :title="$t('zlkTenantRoomMapping.field.starttime')" :readonly="isDetail" 
                            format="yyyy-MM-dd HH:mm" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-datetime" :label="$t('zlkTenantRoomMapping.field.endtime')" prop="endtime" :size="$store.state.app.size" >
            <span slot="label"><cg-icon icon="fa fa-calendar-plus-o" :size="14" :width="20"/>{{$t('zlkTenantRoomMapping.field.endtime')}}</span>
            <cg-date-picker v-model="record.endtime" name="endtime" 
                            :minValue="new Date()"
                            :align="mobile?'right':'center'" type="datetime" :title="$t('zlkTenantRoomMapping.field.endtime')" :readonly="isDetail" 
                            format="yyyy-MM-dd HH:mm" />
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
import CgListTenantUser from '@/views/apartment/zlkUser/CgListTenantUser.vue'
import CgListRoomView from '@/views/apartment/zlkRoom/CgListRoomView.vue'
import CgListContract from '@/views/apartment/zlkContract/CgListContract.vue'
import rulesObject from './rules.js'
import ParentForm from '@/views/common-views/components/form'
const Comp = {
  name: 'CgFormTenantRoomMapping',
  mixins: [ParentForm],
  props: {
    routeParams: {
      type: Object,
      default: null
    }
  },
  components: { CgListTenantUser, CgListRoomView, CgListContract },
  data() {
    return {
      defaultLabelPosition: 'top',
      rulesObject,
      isDialogForm: true,
      path: 'record',
      idField: 'id',
      fastMultiJoinField: 'roomId',
      idSaved: this.openParams().record && typeof this.openParams().record === 'object' ? this.openParams().record.id : null,
      userNoJoinVisible: false,
      roomIdJoinVisible: false,
      contractIdJoinVisible: false,
      generatorName: 'zlkTenantRoomMapping',
      baseUrl: '/apartment/zlkTenantRoomMapping'
    }
  },
  computed: {
  },
  methods: {
    newRecord: function() {
        return {
            token: false,
            realName: null,
            roomName: null,
            name: null,
        }
    },
    getJoinFields(field,rows) {
      const joinDefine = {
        userNo: {
          valueField: 'userNo',
          fields: 'realName=realName'
        },
        roomId: {
          valueField: 'id',
          fields: 'roomName=roomName'
        },
        contractId: {
          valueField: 'id',
          fields: 'name=name'
        },
      }
      this[field+'JoinVisible'] = false
      this.setJoinValues(this.record, field, joinDefine[field], rows)
    }
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgFormTenantRoomMapping-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
    mixins
}
</script>
