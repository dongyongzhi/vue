
<template>
  <div :class="joinMode?'cg-join-list':'cg-list'">
    <el-backtop v-if="isTableMode()" ref="cgListBacktop" class="el-backtop" target=".cg-list-test .el-table__body-wrapper" :visibility-height="200">
      <i class="el-icon-caret-top" />
    </el-backtop>
    <el-table ref="cgList" v-if="isTableMode()" v-loading="listLoading" :data="rows" :class="className" row-key="id" :row-class-name="rowClassName" 
              style="width: 100%" :height="tableHeight()" :size="$store.state.app.size" 
              v-set-input:no-tab-index="{tabIndex: -1}" v-table-enter-tab stripe highlight-current-row fit 
              @row-click="(row, column, event)=>list_rowClick(myself,{ row, column, event })" 
              @row-contextmenu="(row, column, event)=>list_rowContextmenu(myself,{ row, column, event })" 
              @header-click="(column, event)=>list_headClick(myself,{ column, event })" 
              @row-dblclick="(row, column, event)=>list_rowDblclick(myself,{ row, column, event })" 
              @cell-click="(row, column, cell, event)=>list_cellClick(myself,{ row, column, cell, event })" 
              @selection-change="(selection)=>list_selectionChange(myself, selection)" 
              @current-change="(selection)=>list_selectionChange(myself, selection)" 
    >
      <cg-icon slot="empty" icon="el-icon-minus" color="grey" />
      <el-table-column v-if="!mobile" type="index" width="50" align="center" class-name="drag-filter" header-align="center">
        <i slot="header" class="el-icon-menu"/>
      </el-table-column>
      <el-table-column v-if="multiple" type="selection" align="center" reserve-selection class-name="drag-filter no-tab-index" width="36" />
      <cg-table-column prop="d" type="date" :page="1" :label="$t('cgTest.field.d')" sortable align="left" >
        <template slot-scope="scope">
          {{ time2String(scope.row.d,'YYYY-MM-DD') }}
        </template>

      </cg-table-column>
      <cg-table-column prop="t" type="time" :page="1" :label="$t('cgTest.field.t')" sortable align="left" >
        <template slot-scope="scope">
          {{ time2String(scope.row.t,'HH:mm') }}
        </template>

      </cg-table-column>
      <cg-table-column prop="dt" type="datetime" :page="1" :label="$t('cgTest.field.dt')" sortable align="left" >
        <template slot-scope="scope">
          {{ time2String(scope.row.dt,'YYYY-MM-DD HH:mm') }}
        </template>

      </cg-table-column>
      <cg-table-column prop="note" :page="1" :label="$t('cgTest.field.note')" sortable align="left" >
        <template slot-scope="scope">
          {{ scope.row.note }}
        </template>

      </cg-table-column>
      <cg-action v-model="showActionView" mode="2" :url="baseUrl" :actions="list_allActions(myself,'main')" @actionClick="doAction" />
    </el-table>
    <cg-card-list v-else ref="cgList" v-loading="listLoading" :render="rowRender" :data="rows" :mainClass="className" row-key="id" :multiple="false" :height="tableHeight()" 
                  :isLoading="listLoading" 
                  :isUnMore="true" :cgList="myself"
                  @doAction="(a,row)=>doAction(a,{row})"
                  @loadMore="list_loadMore(myself)"
                  @refresh="doAction('refresh',{ isPullDownEvent : true})"
                  @row-click="(row, event)=>list_rowClick(myself,{ row, event })" 
                  @row-contextmenu="(row, event)=>list_rowContextmenu(myself,{ row, event })" 
                  @row-dblclick="(row, event)=>list_rowDblclick(myself,{ row, event })" 
                  @selection-change="(selection)=>list_selectionChange(myself, selection)" 
                  @current-change="(selection)=>list_selectionChange(myself, selection)" 
    >
      <template slot="append">
	      <cg-action v-model="showActionView" mode="2" :url="baseUrl" :actions="list_allActions(myself,'main')" @actionClick="doAction" />
      </template>
    </cg-card-list>
    <cg-context-menu :show="contextMenu.visible" :actions="contextMenu.actions"
                     :top="contextMenu.top" :left="contextMenu.left" 
                     @hide="contextMenu.visible = false" @select="(a)=>doAction(a, {row: contextMenu.row, trElement: contextMenu.trElement})"
    />
    <el-drawer :title="$t('system.action.queryCondition')" :visible.sync="showQuery" :modal="!joinMode" direction="ltr" append-to-body :size="mobile?(isLandscape()?'50%':'100%'):'500px'" >
      <div class="query-form">
        <el-form ref="cgQuery" :model="queryRecord" :label-position="mobile?'left':'right'" label-width="120px" v-cg-form-adjust :size="$store.state.app.size" :class="(mobile?'cg-form-cell ':'')+'cg-no-border'">
          <el-form-item :label="$t('system.action.fuzzyQuery')" prop="search" :size="$store.state.app.size">
            <el-input v-model="queryRecord.search" type="text" name="search" clearable resize autofocus tabindex="0" prefix-icon="el-icon-search"
                      :placeholder="$t('system.message.fuzzyQueryTip')" @keyup.enter.native="doAction('refresh')" />
          </el-form-item>
          <el-form-item v-show="queryRecord.search" :label="$t('system.action.field')" prop="searchFields" :size="$store.state.app.size">
            <cg-select v-model="queryRecord.searchFields" dictionary="d|cgTest.field.d,t|cgTest.field.t,dt|cgTest.field.dt,note|cgTest.field.note," multiple/>
          </el-form-item>
          <el-divider />
          <div v-show="!queryRecord.search">
            <el-form-item :label="$t('cgTest.field.d')" prop="d" :size="$store.state.app.size">
              <cg-date-picker v-model="queryRecord.d" :title="$t('cgTest.field.d')" name="d" :align="mobile?'right':'center'" type="daterange" :picker-options="datePickerOptions()"
                              :readonly="fixedQueryRecord.d?true:false"  clearable />
            </el-form-item>
            <el-form-item :label="$t('cgTest.field.t')" prop="t" :size="$store.state.app.size">
              <cg-date-picker v-model="queryRecord.t" :title="$t('cgTest.field.t')" name="t" :align="mobile?'right':'center'" type="timerange"
                              :readonly="fixedQueryRecord.t?true:false" format="HH:mm" clearable />
            </el-form-item>
            <el-form-item :label="$t('cgTest.field.dt')" prop="dt" :size="$store.state.app.size">
              <cg-date-picker v-model="queryRecord.dt" :title="$t('cgTest.field.dt')" name="dt" :align="mobile?'right':'center'" type="datetimerange" :picker-options="datePickerOptions()"
                              :readonly="fixedQueryRecord.dt?true:false"  clearable />
            </el-form-item>
            <el-form-item :label="$t('cgTest.field.note')" prop="note" :size="$store.state.app.size">
              <el-input v-model="queryRecord.note" type="text" name="note"
                        :readonly="fixedQueryRecord.note?true:false" :label="$t('cgTest.field.note')" clearable resize autofocus tabindex="4" />
            </el-form-item>
          </div>
        </el-form>
        <el-divider />
        <el-button class="cg-button" type="primary" plain @click.native="doAction('refresh')" icon="el-icon-search">
          {{ $t('system.action.query') }}
        </el-button>
        <el-button class="cg-button" plain icon="el-icon-circle-close" @click.native="queryRecord=initialQueryRecord()">
          {{ $t('system.action.reset') }}
        </el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import cgList from '@/utils/cgList'
import cg from '@/utils/cg'
import {hasAuthority} from '@/utils/cg'
import time from '@/utils/time'
const mixins = []
const mixinContext = require.context('.', false, /CgListTest-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default {
  name: 'CgListTest',
  mixins,
  props: {
    joinMode: {
      type: Boolean,
      default: false
    },
    joinMultiple: {
      type: Boolean,
      default: false
    },
    joinShow: {
      type: Boolean,
      default: true
    },
    openID: {
      type: String,
      default: ''
    },
    originSelections: {
      type: String,
      default: ''
    },
    selectionKey: {
      type: String,
      default: 'id'
    },
    height: {
      type: Number,
      default: 0
    },
    fixedQueryRecord: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {
      cgList,
      myself: this,
      path: 'list',
      title: this.$t('cgTest.title.list'),
      showQuery: false,
      showActionView: false,
      defaultOrder: 'id desc',
      queryRecord: this.initialQueryRecord(),
      formPath: '/codegenerator/cgTest/record',
      listLoading: false,
      rows: [],
      selections: this.originSelections,
      parentField: null,
      idField: 'id',
      paginationPageSize: 0,
      sortableFields: [],
      sortableFieldsOrder: [],
      editInlineFields: null,
      contextMenu: { top: 0, left: 0, visible: false, row: null, actions: [], trElement: null },
      generatorName: 'cgTest',
      baseUrl: '/codegenerator/cgTest'
    }
  },
  computed: {
    mobile() {
      return this.$store.state.app.device === 'mobile'
    },
    multiple() {
      return this.joinMode ? this.joinMultiple : false
    },
    className() {
      return this.openID ? 'cg-list-test cg-list-test' + '-'+this.openID : 'cg-list-test'
    },
    allActions() {
      if (this.joinMode) return 'refresh,query'
      else return 'query,add,view,edit,delete,list'
    }
  },
  watch: {
    fixedQueryRecord: {
      handler(n, o) {
        if (n && Object.keys(n).length > 0) this.doAction('refresh')
      },
      deep: true,
      immediate: true
    },
    joinShow(newValue, oldValue) {
      if (oldValue && !newValue && this.joinMode) {
        this.$emit('closeJoinList', this.multiple ? this.$refs.cgList.store.states.selection : [this.$refs.cgList.store.states.currentRow])
      }
    }
  },
  created() {
    this.doAction('refresh')
  },
  mounted() {
    cgList.list_tableInit(this)
  },
  activated() {
    cgList.list_activedRefresh(this)
  },
  destroyed() {
    cgList.list_destroyScroll(this)
  },
  methods: {
    rowClassName({row, rowIndex}){
      return ''
    },
    defaultEditMode(row) {
      if (this.hasAuthorityOf(this,this.baseUrl,'edit',row)) return 'edit'
      else if (this.hasAuthorityOf(this,this.baseUrl,'view',row)) return 'view'
      else return ''
    },
    isTableMode() {
      return this.joinMode || !this.mobile || this.isLandscape() || typeof this.rowRender !== 'function'
    },
    hasMenu() {
      return this.mobile
    },
    isLandscape() {
      return window.orientation == 90 || window.orientation == -90
    },
    showActionSheet(hidden){
      this.showActionView = !hidden
    },
    tableHeight() {
      if (this.height > 0) return this.height
      else return 1
    },
    initialQueryRecord() {
      return Object.assign({
        d: '',
        t: '',
        dt: '',
        note: '',
      }, this.fixedQueryRecord)
    },
    doAction(action, options) {
      this.queryRecord = Object.assign(this.queryRecord, this.fixedQueryRecord)
      cgList.list_doAction(this, action, options)
    },
    ...cg,
    ...cgList,
    time2String: time.toString
  }
}
</script>
