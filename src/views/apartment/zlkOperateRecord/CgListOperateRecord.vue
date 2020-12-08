
<template>
  <div :class="joinMode?'cg-join-list':'cg-list'">
    <el-backtop v-if="isTableMode()" ref="cgListBacktop" class="el-backtop" target=".cg-list-operaterecord .el-table__body-wrapper" :visibility-height="200">
      <i class="el-icon-caret-top" />
    </el-backtop>
    <el-table ref="cgList" v-if="isTableMode()" v-loading="listLoading" :data="rows" :class="className" row-key="id" :row-class-name="rowClassName" 
              style="width: 100%" :height="tableHeight()" :size="$store.state.app.size" 
              stripe :border="!mobile" highlight-current-row fit 
              @row-click="(row, column, event)=>cgList.list_rowClick(myself,{ row, column, event })" 
              @row-contextmenu="(row, column, event)=>cgList.list_rowContextmenu(myself,{ row, column, event })" 
              @header-click="(column, event)=>cgList.list_headClick(myself,{ column, event })" 
              @row-dblclick="(row, column, event)=>cgList.list_rowDblclick(myself,{ row, column, event })" 
              @cell-click="(row, column, cell, event)=>cgList.list_cellClick(myself,{ row, column, cell, event })" 
              @selection-change="(selection)=>cgList.list_selectionChange(myself, selection)" 
              @current-change="(selection)=>cgList.list_selectionChange(myself, selection)" 
    >
      <cg-icon slot="empty" icon="el-icon-minus" color="grey" />
      <el-table-column v-if="!mobile" type="index" width="50" align="center" class-name="drag-filter" label-class-name="pointer-cursor" header-align="center">
        <i slot="header" class="el-icon-menu"/>
      </el-table-column>
      <el-table-column v-if="multiple" type="selection" align="center" reserve-selection class-name="drag-filter" width="36" />
      <cg-table-column prop="loginUserId" :page="paginationCurrentPage" :label="$t('zlkOperateRecord.field.loginUserId')" sortable align="left" >
        <template slot-scope="scope">
          {{ scope.row.loginUserId }}
        </template>

      </cg-table-column>
      <cg-table-column prop="operateType" type="dict" :page="paginationCurrentPage" :label="$t('zlkOperateRecord.field.operateType')" sortable align="left" >
        <template slot-scope="scope">
          {{ dictValue(scope.row.operateType,dictionary.dictOperateType,false,true) }}
        </template>

      </cg-table-column>
      <cg-table-column prop="operateStatus" type="dict" :page="paginationCurrentPage" :label="$t('zlkOperateRecord.field.operateStatus')" sortable align="right" >
        <template slot-scope="scope">
          {{ dictValue(scope.row.operateStatus,dictionary.dictOperateStatus,false,true) }}
        </template>

      </cg-table-column>
      <cg-table-column prop="note" :page="paginationCurrentPage" :label="$t('zlkOperateRecord.field.note')" align="left" >
        <template slot-scope="scope">
          {{ scope.row.note }}
        </template>

      </cg-table-column>
      <cg-table-column prop="operateTime" type="datetime" :page="paginationCurrentPage" :label="$t('zlkOperateRecord.field.operateTime')" sortable align="left" >
        <template slot-scope="scope">
          {{ time2String(scope.row.operateTime,'yyyy-MM-dd HH:mm') }}
        </template>

      </cg-table-column>
      <cg-action v-model="showActionView" mode="2" :url="baseUrl" :actions="cgList.list_allActions(myself,'main')" @actionClick="doAction" />
    </el-table>
    <cg-card-list v-else ref="cgList" v-loading="listLoading" :render="rowRender" :data="rows" :mainClass="className" row-key="id" :multiple="false" :height="tableHeight()" 
                  :isLoading="listLoading" 
                  :isUnMore="paginationCurrentPage * paginationPageSize >= paginationTotalRecords" :cgList="myself"
                  @doAction="(a,row)=>doAction(a,{row})"
                  @loadMore="cgList.list_loadMore(myself)"
                  @refresh="doAction('refresh',{ isPullDownEvent : true})"
                  @row-click="(row, event)=>cgList.list_rowClick(myself,{ row, event })" 
                  @row-contextmenu="(row, event)=>cgList.list_rowContextmenu(myself,{ row, event })" 
                  @row-dblclick="(row, event)=>cgList.list_rowDblclick(myself,{ row, event })" 
                  @selection-change="(selection)=>cgList.list_selectionChange(myself, selection)" 
                  @current-change="(selection)=>cgList.list_selectionChange(myself, selection)" 
    >
      <template slot="append">
	      <cg-action v-model="showActionView" mode="2" :url="baseUrl" :actions="cgList.list_allActions(myself,'main')" @actionClick="doAction" />
      </template>
    </cg-card-list>
    <nut-scroller v-if="mobile && isTableMode()"
                  wrapperElement=".cg-list-operaterecord .el-table__body-wrapper"
                  :isLoading="listLoading"
                  :isUnMore="paginationCurrentPage * paginationPageSize >= paginationTotalRecords"
                  type="vertical"
                  :pulldownTxt="$t('system.message.pullDownRefresh')"
                  :loadMoreTxt="$t('system.message.pullUpLoad')"
                  :unloadMoreTxt="$t('system.message.noMoreData')"
                  @loadMore="cgList.list_loadMore(myself)"
                  @pulldown="doAction('refresh',{ isPullDownEvent : true})"
    />
    <el-pagination v-if="!mobile" @size-change="doAction('refresh')" @current-change="doAction('refresh')" :page-sizes="[10, 20, 30, 50, 100, 200]" layout="total, sizes, prev, pager, next, jumper"
      :current-page.sync="paginationCurrentPage" :page-size.sync="paginationPageSize" :total="paginationTotalRecords">
    </el-pagination>
    <cg-context-menu :show="contextMenu.visible" :actions="contextMenu.actions"
                     :top="contextMenu.top" :left="contextMenu.left" 
                     @hide="contextMenu.visible = false" @select="(a)=>doAction(a, {row: contextMenu.row, trElement: contextMenu.trElement})"
    />
    <cg-query-condition v-model="showQuery" ref="query" :modal="!joinMode" :queryRecord="queryRecord"
                        @refresh="doAction('refresh')" @reset="queryRecord=initialQueryRecord()">
      <el-form-item :label="$t('system.action.fuzzyQuery')" prop="search" :size="$store.state.app.size">
        <el-input v-model="queryRecord.search" type="text" name="search" clearable resize autofocus
                  prefix-icon="el-icon-search" :placeholder="$t('system.message.fuzzyQueryTip')" @keyup.enter.native="doAction('refresh')" />
      </el-form-item>
      <el-form-item v-show="queryRecord.search" :label="$t('system.action.field')" prop="searchFields" :size="$store.state.app.size">
        <cg-select v-model="queryRecord.searchFields" dictionary="loginUserId|zlkOperateRecord.field.loginUserId,operateType|zlkOperateRecord.field.operateType,operateStatus|zlkOperateRecord.field.operateStatus,operateTime|zlkOperateRecord.field.operateTime," multiple/>
      </el-form-item>
      <el-divider />
      <div v-show="!queryRecord.search">
        <el-form-item :label="$t('zlkOperateRecord.field.loginUserId')" prop="loginUserId" :size="$store.state.app.size">
          <el-input v-model="queryRecord.loginUserId" type="text" name="loginUserId"
                    :readonly="fixedQueryRecord.loginUserId?true:false" :label="$t('zlkOperateRecord.field.loginUserId')" clearable resize autofocus/>
        </el-form-item>
        <el-form-item :label="$t('zlkOperateRecord.field.operateType')" prop="operateType" :size="$store.state.app.size">
          <cg-select v-model="queryRecord.operateType" :dictionary="dictionary.dictOperateType"
                     :disabled="fixedQueryRecord.operateType?true:false"  :allow-create="!mobile" multiple clearable />
        </el-form-item>
        <el-form-item :label="$t('zlkOperateRecord.field.operateStatus')" prop="operateStatus" :size="$store.state.app.size">
          <cg-select v-model="queryRecord.operateStatus" :dictionary="filterQueryDictionary.operateStatus"
                     :disabled="fixedQueryRecord.operateStatus?true:false" allow-create multiple clearable />
        </el-form-item>
        <el-form-item :label="$t('zlkOperateRecord.field.operateTime')" prop="operateTime" :size="$store.state.app.size">
          <cg-date-picker v-model="queryRecord.operateTime" :title="$t('zlkOperateRecord.field.operateTime')" name="operateTime" :align="mobile?'right':'center'" type="datetimerange" :picker-options="datePickerOptions()"
                          :readonly="fixedQueryRecord.operateTime?true:false" format="yyyy-MM-dd HH:mm" clearable />
        </el-form-item>
      </div>
    </cg-query-condition>
  </div>
</template>

<script>
import {hasAuthority} from '@/utils/cg'
import ParentTable from '@/views/common-views/components/table'
const Comp = {
  name: 'CgListOperateRecord',
  mixins: [ParentTable],
  props: {
    selectionKey: {
      type: String,
      default: 'id'
    }
  },
  data() {
    return {
      path: 'list',
      defaultOrder: 'id desc',
      queryRecordFields: ['loginUserId','operateType','operateStatus','operateTime'],
      formPath: '/apartment/zlkOperateRecord/record',
      idField: 'id',
      dictionary: {
        dictOperateType: this.getDictionary('人员信息,房间信息,合同信息,锁信息,地址信息','人员信息,房间信息,合同信息,锁信息,地址信息'),
        dictOperateStatus: this.getDictionary('0,1','失败,成功')
      },
      filterQueryDictionary: {
        operateStatus: [],
      },
      paginationCurrentPage: 1,
      paginationPageSize: this.$store.state.app.device === 'mobile' ? 10 : 30,
      paginationTotalRecords: 0,
      listName: 'operateRecord',
      generatorName: 'zlkOperateRecord',
      baseUrl: '/apartment/zlkOperateRecord'
    }
  },
  computed: {
    allActions() {
      if (this.joinMode) return 'refresh,query'
      else return 'query,,list,add,view,edit,delete,batdel,import,export,'
    }
  },
  mounted() {
    this.cgList.list_tableInit(this)
  },
  methods: {
    initialQueryRecord() {
      return Object.assign({
        loginUserId: null,
        operateType: null,
        operateStatus: null,
        note: null,
        operateTime: null,
      }, this.fixedQueryRecord)
    },
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgListOperateRecord-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
  mixins
}
</script>
