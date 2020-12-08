
<template>
  <div :class="mobile || height==0 ? 'cg-form':'cg-form just-v-scroll'" :style="mobile || height==0?'':'height:'+height+'px'">
    <el-form ref="cgForm" v-loading="recordLoading" :model="record" v-cg-form-adjust
                          :class="className" :rules="rules" 
             :label-position="labelPosition" :label-width="labelWidth" :size="$store.state.app.size" 
             hide-required-asterisk >
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-date" :label="$t('cgTest.field.d')" prop="d" :size="$store.state.app.size" >
            <span slot="label"><cg-icon icon="fa fa-calendar" :size="14" :width="20"/>{{$t('cgTest.field.d')}}</span>
            <cg-date-picker v-model="record.d" name="d" 
                            :align="mobile?'right':'center'" type="date" :title="$t('cgTest.field.d')" :readonly="isDetail" 
                            clearable tabindex="0" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-time" :label="$t('cgTest.field.t')" prop="t" :size="$store.state.app.size" >
            <span slot="label"><cg-icon icon="fa fa-clock-o" :size="14" :width="20"/>{{$t('cgTest.field.t')}}</span>
            <cg-date-picker v-model="record.t" name="t" 
                            :align="mobile?'right':'center'" type="time" :title="$t('cgTest.field.t')" :readonly="isDetail" 
                            format="HH:mm" clearable tabindex="1" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="mobile?0:20">
        <el-col :span="12">
          <el-form-item class="cg-item-datetime" :label="$t('cgTest.field.dt')" prop="dt" :size="$store.state.app.size" >
            <span slot="label"><cg-icon icon="fa fa-calendar-plus-o" :size="14" :width="20"/>{{$t('cgTest.field.dt')}}</span>
            <cg-date-picker v-model="record.dt" name="dt" 
                            :align="mobile?'right':'center'" type="datetime" :title="$t('cgTest.field.dt')" :readonly="isDetail" 
                            tabindex="2" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="cg-item-text" :label="$t('cgTest.field.note')" prop="note" :size="$store.state.app.size" >
            <el-input v-model="record.note" name="note" 
                      type="text" :maxlength="500" show-word-limit 
                      :label="$t('cgTest.field.note')" :placeholder="$t('system.message.unknown')" clearable 
                      :readonly="isDetail" resize autofocus validate-event tabindex="3" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div v-if="!isDetail" class="cg-form-buttons">
      <el-divider />
      <el-button v-if="!mobile && hasAuthorityOf(myself,baseUrl,'add',record)" class="cg-button" type="default" plain icon="fa fa-plus"
                 @click.native="doAction('add')" tabindex="14">
        {{ $t('system.action.new') }}
      </el-button>
      <el-button v-if="hasAuthorityOf(myself,baseUrl,'edit',record)" class="cg-button" type="primary" plain :disabled="!recordChanged"
                 icon="el-icon-check" tabindex="15" @click.native="submit()">
        {{ $t('system.action.save') }}
      </el-button>
      <el-button v-if="!mobile && showInDialog" class="cg-button" plain icon="el-icon-close"
                 tabindex="16" @click.native="$emit('closeDialog')">
        {{ $t('system.action.close') }}
      </el-button>
    </div>
  </div>
</template>
<script>
import cg from '@/utils/cg'
import cgForm from '@/utils/cgForm'
const mixins = []
const mixinContext = require.context('.', false, /CgFormTest-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default {
  name: 'CgFormTest',
  mixins,
  props: {
    showInDialog: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 0
    },
    queryById: [Number, String]
  },
  data() {
    return {
      myself: this,
      path: 'record',
      title: this.$t('cgTest.title.record'),
      rules: {
        dt:[
          { required: true, message: this.$t('system.message.needValue') + ':' + this.$t('cgTest.field.dt'), trigger: 'blur' }
        ],
      },
      idField: 'id',
      idSaved: this.$route.query.record && typeof this.$route.query.record === 'object' ? this.$route.query.record.id : null,
      onChange: typeof this.$route.query.onChange === 'function' ? this.$route.query.onChange : null,
      recordChanged: false,
      recordLoading: false,
      fixedFields: typeof this.$route.query.fixedFields === 'object' ? this.$route.query.fixedFields : {},
      openMode: this.$route.query.openMode ? this.$route.query.openMode : null,
      record: this.$route.query.record && typeof this.$route.query.record === 'object' ? this.$route.query.record : {},
      needDefaultFromServer: false,
      generatorName: 'cgTest',
      baseUrl: '/codegenerator/cgTest'
    }
  },
  computed: {
    mobile() {
      return this.$store.state.app.device === 'mobile'
    },
    hasMenu() {
      return false
    },
    className() {
      return (this.mobile?'cg-form-cell ':'')+'cg-no-border cg-form-test'
    },
    labelWidth() {
      return this.className.indexOf('cg-form-cell')>=0? '100px' : undefined
    },
    labelPosition() {
      return this.className.indexOf('cg-form-cell')>=0? 'left':'top'
    },
    isDetail() {
      return this.openMode === 'view'
    },
    isNew() {
      return !this.openMode || this.openMode === 'add'
    },
    isEdit() {
      return this.openMode === 'edit'
    }
  },
  watch: {
    record: {
      handler() {
        this.recordChanged = true
      },
      deep: true
    },
    queryById: {
      handler(n, o) {
        if (n) this.doAction('refresh', {id: n})
      },
      immediate: true
    }
  },
  created() {
    if (this.queryById) {
      cgForm.form_getRecordFromServer(this,this.queryById)
      this.queryRefreshId = this.queryById
    } else if (this.isNew) cgForm.form_createNewRecord(this)
    else if ((this.isEdit || this.isDetail) && this.$route.query.id && typeof this.$route.query.record !== 'object') {
      cgForm.form_getRecordFromServer(this,this.$route.query.id)
      this.queryRefreshId = this.$route.query.id
    }
  },
  activated() {
    cgForm.form_activedRefresh(this)
  },
  methods: {
    newRecord: function() {
        return {
            d: '1996-08-02',
            t: '12:00:00.000000',
            dt: '',
        }
    },
    submit: function() {
      if (this.recordChanged) cgForm.form_submit(this, 'save')
    },
    doAction(action, options) {
      cgForm.form_doAction(this, action, options)
    },
    ...cg
  }
}
</script>
