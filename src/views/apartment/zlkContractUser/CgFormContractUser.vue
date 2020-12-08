
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
            <el-form-item class="cg-item-text cg-auto-focus" slot="reference" :label="$t('zlkContractUser.field.userNo')" prop="realName" :size="$store.state.app.size" >
              <el-input v-model="record.realName" name="realName" 
                        type="text" 
                        :label="$t('zlkContractUser.field.userNo')" :placeholder="$t('system.message.needValue')" 
                        resize autofocus validate-event 
                        readonly :maxlength="36" show-word-limit />
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
import CgListTenantUser from '@/views/apartment/zlkUser/CgListTenantUser.vue'
import rulesObject from './rules.js'
import ParentForm from '@/views/common-views/components/form'
const Comp = {
  name: 'CgFormContractUser',
  mixins: [ParentForm],
  props: {
    routeParams: {
      type: Object,
      default: null
    }
  },
  components: { CgListTenantUser },
  data() {
    return {
      defaultLabelPosition: 'top',
      rulesObject,
      isDialogForm: true,
      path: 'record',
      idField: 'id',
      idSaved: this.openParams().record && typeof this.openParams().record === 'object' ? this.openParams().record.id : null,
      userNoJoinVisible: false,
      generatorName: 'zlkContractUser',
      baseUrl: '/apartment/zlkContractUser'
    }
  },
  computed: {
  },
  methods: {
    newRecord: function() {
        return {
            contractId: 0,
            realName: null,
        }
    },
    getJoinFields(field,rows) {
      const joinDefine = {
        userNo: {
          valueField: 'userNo',
          fields: 'realName=realName'
        },
      }
      this[field+'JoinVisible'] = false
      this.setJoinValues(this.record, field, joinDefine[field], rows)
    }
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgFormContractUser-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
    mixins
}
</script>
