
<template>
  <div :class="mobile || height==0 ? 'cg-form':'cg-form just-v-scroll'" :style="mobile || height==0?'':'height:'+height+'px'">
    <el-form ref="cgForm" v-loading="recordLoading" :model="record" v-cg-form-adjust
                          :class="className" :rules="rules" 
             :label-position="labelPosition" :label-width="labelWidth" :size="$store.state.app.size" 
             hide-required-asterisk >
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <cg-join v-model="lockIdJoinVisible" :readonly="isDetail" >
            <CgListLockSelect slot="popover" ref="lockIdJoin" openID="lockid-join" :height="500" :joinShow="lockIdJoinVisible" :joinMultiple="false"
                              :originSelections="String(record.lockId)" selectionKey="id" joinMode @closeJoinList="(rows)=>{ getJoinFields('lockId',rows)}"
                              @showJoinList="lockIdJoinVisible=true" />
            <el-form-item class="cg-item-text cg-auto-focus" slot="reference" :label="$t('zlkLockRoomMapping.field.lockId')" prop="lockName" :size="$store.state.app.size" >
              <el-input v-model="record.lockName" name="lockName" 
                        type="text" 
                        :label="$t('zlkLockRoomMapping.field.lockId')" :placeholder="$t('system.message.needValue')" 
                        resize autofocus validate-event 
                        readonly :maxlength="32" show-word-limit />
            </el-form-item>
          </cg-join>
        </el-col>
        <el-col :span="12">
          <cg-join v-model="roomIdJoinVisible" :readonly="isDetail" >
            <CgListSelectRoom slot="popover" ref="roomIdJoin" openID="roomid-join" :height="500" :joinShow="roomIdJoinVisible" :joinMultiple="false"
                              :originSelections="String(record.roomId)" selectionKey="id" joinMode @closeJoinList="(rows)=>{ getJoinFields('roomId',rows)}"
                              @showJoinList="roomIdJoinVisible=true" />
            <el-form-item class="cg-item-text" slot="reference" :label="$t('zlkLockRoomMapping.field.roomId')" prop="roomName" :size="$store.state.app.size" >
              <el-input v-model="record.roomName" name="roomName" 
                        type="text" 
                        :label="$t('zlkLockRoomMapping.field.roomId')" :placeholder="$t('system.message.needValue')" 
                        resize autofocus validate-event 
                        readonly :maxlength="32" show-word-limit />
            </el-form-item>
          </cg-join>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-datetime" :label="$t('zlkLockRoomMapping.field.bindTime')" prop="bindTime" :size="$store.state.app.size" >
            <span slot="label"><cg-icon icon="fa fa-calendar-plus-o" :size="14" :width="20"/>{{$t('zlkLockRoomMapping.field.bindTime')}}</span>
            <cg-date-picker v-model="record.bindTime" name="bindTime" 
                            :align="mobile?'right':'center'" type="datetime" :title="$t('zlkLockRoomMapping.field.bindTime')" readonly 
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
import CgListLockSelect from '@/views/apartment/zlkLock/CgListLockSelect.vue'
import CgListSelectRoom from '@/views/apartment/zlkRoom/CgListSelectRoom.vue'
import rulesObject from './rules.js'
import ParentForm from '@/views/common-views/components/form'
const Comp = {
  name: 'CgFormLockRoomMapping',
  mixins: [ParentForm],
  props: {
    routeParams: {
      type: Object,
      default: null
    }
  },
  components: { CgListLockSelect, CgListSelectRoom },
  data() {
    return {
      defaultLabelPosition: 'top',
      rulesObject,
      isDialogForm: true,
      path: 'record',
      idField: 'id',
      idSaved: this.openParams().record && typeof this.openParams().record === 'object' ? this.openParams().record.id : null,
      lockIdJoinVisible: false,
      roomIdJoinVisible: false,
      generatorName: 'zlkLockRoomMapping',
      baseUrl: '/apartment/zlkLockRoomMapping'
    }
  },
  computed: {
  },
  methods: {
    newRecord: function() {
        return {
            lockName: null,
            roomName: null,
            bindTime: new Date(),
        }
    },
    getJoinFields(field,rows) {
      const joinDefine = {
        lockId: {
          valueField: 'id',
          fields: 'lockName=lockName'
        },
        roomId: {
          valueField: 'id',
          fields: 'roomName=roomName'
        },
      }
      this[field+'JoinVisible'] = false
      this.setJoinValues(this.record, field, joinDefine[field], rows)
    }
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgFormLockRoomMapping-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
    mixins
}
</script>
