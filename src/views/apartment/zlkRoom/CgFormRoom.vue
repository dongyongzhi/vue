
<template>
  <div :class="mobile || height==0 ? 'cg-form':'cg-form just-v-scroll'" :style="mobile || height==0?'':'height:'+height+'px'">
    <el-form ref="cgForm" v-loading="recordLoading" :model="record" v-cg-form-adjust
                          :class="className" :rules="rules" 
             :label-position="labelPosition" :label-width="labelWidth" :size="$store.state.app.size" 
             hide-required-asterisk >
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-select cg-auto-focus" :label="$t('zlkRoom.field.addressId')" prop="addressId" :size="$store.state.app.size" >
            <cg-cascader v-model="record.addressId" name="addressId"
                         :readonly="isDetail" :filterable="false" numberic required 
                         :dictionary="dictionary.dictAddressId" :placeholder="$t('system.message.needValue')" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-text" :label="$t('zlkRoom.field.roomName')" prop="roomName" :size="$store.state.app.size" >
            <el-input v-model="record.roomName" name="roomName" 
                      type="text" 
                      :label="$t('zlkRoom.field.roomName')" :placeholder="$t('system.message.needValue')" 
                      resize autofocus validate-event 
                      :readonly="isDetail" :maxlength="32" show-word-limit />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <cg-join v-model="lockIdJoinVisible" :readonly="isDetail" >
            <CgListLockSelect slot="popover" ref="lockIdJoin" openID="lockid-join" :height="500" :joinShow="lockIdJoinVisible" :joinMultiple="false"
                              :originSelections="String(record.lockId)" selectionKey="id" joinMode @closeJoinList="(rows)=>{ getJoinFields('lockId',rows)}"
                              @showJoinList="lockIdJoinVisible=true" />
            <el-form-item class="cg-item-text" slot="reference" :label="$t('zlkRoom.field.lockId')" prop="lockName" :size="$store.state.app.size" >
              <el-input v-model="record.lockName" name="lockName" 
                        type="text" 
                        :label="$t('zlkRoom.field.lockId')" :placeholder="$t('system.message.unknown')" 
                        resize autofocus validate-event 
                        readonly :maxlength="32" show-word-limit clearable />
            </el-form-item>
          </cg-join>
        </el-col>
      </el-row>
    </el-form>
    <div v-if="!isDetail" class="cg-form-buttons">
      <el-divider />
      <el-button v-if="!mobile && hasAuthorityOf(myself,baseUrl,'add',record)" class="cg-button" type="default" plain icon="fa fa-plus"
                 @click.native="doAction('add')">
        {{ $t('system.action.new') }}
      </el-button>
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
import rulesObject from './rules.js'
import ParentForm from '@/views/common-views/components/form'
const Comp = {
  name: 'CgFormRoom',
  mixins: [ParentForm],
  props: {
    routeParams: {
      type: Object,
      default: null
    }
  },
  components: { CgListLockSelect },
  data() {
    return {
      defaultLabelPosition: 'top',
      rulesObject,
      isDialogForm: true,
      continueAdd: true,
      path: 'record',
      idField: 'id',
      idSaved: this.openParams().record && typeof this.openParams().record === 'object' ? this.openParams().record.id : null,
      dictionary: {
        dictAddressId: []
      },
      needLoadDictionary: true,
      lockIdJoinVisible: false,
      generatorName: 'zlkRoom',
      baseUrl: '/apartment/zlkRoom'
    }
  },
  computed: {
  },
  methods: {
    newRecord: function() {
        return {
            lockName: null,
        }
    },
    getJoinFields(field,rows) {
      const joinDefine = {
        lockId: {
          valueField: 'id',
          fields: 'lockName=lockName'
        },
      }
      this[field+'JoinVisible'] = false
      this.setJoinValues(this.record, field, joinDefine[field], rows)
    }
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgFormRoom-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
    mixins
}
</script>
