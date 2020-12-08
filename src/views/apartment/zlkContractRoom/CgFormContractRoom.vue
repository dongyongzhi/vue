
<template>
  <div :class="mobile || height==0 ? 'cg-form':'cg-form just-v-scroll'" :style="mobile || height==0?'':'height:'+height+'px'">
    <el-form ref="cgForm" v-loading="recordLoading" :model="record" v-cg-form-adjust
                          :class="className" :rules="rules" 
             :label-position="labelPosition" :label-width="labelWidth" :size="$store.state.app.size" 
             hide-required-asterisk >
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <cg-join v-model="roomIdJoinVisible" :readonly="isDetail" >
            <CgListRoomView slot="popover" ref="roomIdJoin" openID="roomid-join" :height="500" :joinShow="roomIdJoinVisible" :joinMultiple="false"
                            :originSelections="String(record.roomId)" selectionKey="id" joinMode @closeJoinList="(rows)=>{ getJoinFields('roomId',rows)}"
                            @showJoinList="roomIdJoinVisible=true" />
            <el-form-item class="cg-item-text cg-auto-focus" slot="reference" :label="$t('zlkContractRoom.field.roomId')" prop="roomName" :size="$store.state.app.size" >
              <el-input v-model="record.roomName" name="roomName" 
                        type="text" 
                        :label="$t('zlkContractRoom.field.roomId')" :placeholder="$t('system.message.needValue')" 
                        resize autofocus validate-event 
                        readonly :maxlength="32" show-word-limit />
            </el-form-item>
          </cg-join>
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
import CgListRoomView from '@/views/apartment/zlkRoom/CgListRoomView.vue'
import rulesObject from './rules.js'
import ParentForm from '@/views/common-views/components/form'
const Comp = {
  name: 'CgFormContractRoom',
  mixins: [ParentForm],
  props: {
    routeParams: {
      type: Object,
      default: null
    }
  },
  components: { CgListRoomView },
  data() {
    return {
      defaultLabelPosition: 'top',
      rulesObject,
      isDialogForm: true,
      path: 'record',
      idField: 'id',
      idSaved: this.openParams().record && typeof this.openParams().record === 'object' ? this.openParams().record.id : null,
      roomIdJoinVisible: false,
      generatorName: 'zlkContractRoom',
      baseUrl: '/apartment/zlkContractRoom'
    }
  },
  computed: {
  },
  methods: {
    newRecord: function() {
        return {
            roomName: null,
            contractId: 0,
        }
    },
    getJoinFields(field,rows) {
      const joinDefine = {
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
const mixinContext = require.context('.', false, /CgFormContractRoom-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
    mixins
}
</script>
