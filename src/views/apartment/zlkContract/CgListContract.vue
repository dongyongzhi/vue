
<template>
  <div :class="joinMode?'cg-join-list':'cg-list'">
    <el-backtop v-if="isTableMode()" ref="cgListBacktop" class="el-backtop" target=".cg-list-contract .el-table__body-wrapper" :visibility-height="200">
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
      <cg-table-column prop="name" :page="paginationCurrentPage" :label="$t('zlkContract.field.name')" sortable align="left" >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>

      </cg-table-column>
      <cg-table-column prop="contractNumber" :page="paginationCurrentPage" :label="$t('zlkContract.field.contractNumber')" sortable align="left" >
        <template slot-scope="scope">
          {{ scope.row.contractNumber }}
        </template>

      </cg-table-column>
      <cg-table-column prop="applyIdType" type="dict" :page="paginationCurrentPage" :label="$t('zlkContract.field.applyIdType')" align="left" >
        <template slot-scope="scope">
          {{ dictValue(scope.row.applyIdType,dictionary.dictApplyIdType,false,true) }}
        </template>

      </cg-table-column>
      <cg-table-column prop="applyIdNumber" :page="paginationCurrentPage" :label="$t('zlkContract.field.applyIdNumber')" sortable align="left" >
        <template slot-scope="scope">
          {{ scope.row.applyIdNumber }}
        </template>

      </cg-table-column>
      <cg-table-column prop="isChange" :page="paginationCurrentPage" :label="$t('zlkContract.field.isChange')" align="left" >
        <template slot-scope="scope">
          <cg-icon :color="scope.row.isChange?'#46a6ff':'grey'" :icon="scope.row.isChange?'fa fa-check-circle':'fa fa-circle-o'"/>
        </template>

      </cg-table-column>
      <el-table-column prop="roomIds" type="dict" :show-overflow-tooltip="true" width="250" :label="$t('zlkContract.field.roomIds')" align="left" >
        <template slot-scope="scope">
          {{ dictValue(scope.row.roomIds,dictionary.dictRoomIds,false,true) }}
        </template>

      </el-table-column>
      <el-table-column prop="userNo" type="dict" :show-overflow-tooltip="true" width="250" :label="$t('zlkContract.field.userNo')" align="left" >
        <template slot-scope="scope">
          {{ dictValue(scope.row.userNo,dictionary.dictUserNo,false,true) }}
        </template>

      </el-table-column>
      <cg-table-column prop="startTime" type="datetime" :page="paginationCurrentPage" :label="$t('zlkContract.field.startTime')" align="left" >
        <template slot-scope="scope">
          {{ time2String(scope.row.startTime,'yyyy-MM-dd HH:mm') }}
        </template>

      </cg-table-column>
      <cg-table-column prop="endTime" type="datetime" :page="paginationCurrentPage" :label="$t('zlkContract.field.endTime')" align="left" >
        <template slot-scope="scope">
          {{ time2String(scope.row.endTime,'yyyy-MM-dd HH:mm') }}
        </template>

      </cg-table-column>
      <cg-table-column prop="contractStatus" :page="paginationCurrentPage" :label="$t('zlkContract.field.contractStatus')" sortable align="left" >
        <template slot-scope="scope">
          <cg-icon :color="scope.row.contractStatus?'#46a6ff':'grey'" :icon="scope.row.contractStatus?'fa fa-check-circle':'fa fa-circle-o'"/>
        </template>

      </cg-table-column>
      <cg-table-column prop="creator" :page="paginationCurrentPage" :label="$t('zlkContract.field.creator')" sortable align="left" >
        <template slot-scope="scope">
          {{ scope.row.creator }}
        </template>

      </cg-table-column>
      <cg-table-column prop="createTime" type="datetime" :page="paginationCurrentPage" :label="$t('zlkContract.field.createTime')" align="left" >
        <template slot-scope="scope">
          {{ time2String(scope.row.createTime,'yyyy-MM-dd HH:mm') }}
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
                  wrapperElement=".cg-list-contract .el-table__body-wrapper"
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
        <cg-select v-model="queryRecord.searchFields" dictionary="name|zlkContract.field.name,contractNumber|zlkContract.field.contractNumber,applyIdNumber|zlkContract.field.applyIdNumber,contractStatus|zlkContract.field.contractStatus,creator|zlkContract.field.creator," multiple/>
      </el-form-item>
      <el-divider />
      <div v-show="!queryRecord.search">
        <el-form-item :label="$t('zlkContract.field.name')" prop="name" :size="$store.state.app.size">
          <el-input v-model="queryRecord.name" type="text" name="name"
                    :readonly="fixedQueryRecord.name?true:false" :label="$t('zlkContract.field.name')" clearable resize autofocus/>
        </el-form-item>
        <el-form-item :label="$t('zlkContract.field.contractNumber')" prop="contractNumber" :size="$store.state.app.size">
          <el-input v-model="queryRecord.contractNumber" type="text" name="contractNumber"
                    :readonly="fixedQueryRecord.contractNumber?true:false" :label="$t('zlkContract.field.contractNumber')" clearable resize autofocus/>
        </el-form-item>
        <el-form-item :label="$t('zlkContract.field.applyIdNumber')" prop="applyIdNumber" :size="$store.state.app.size">
          <el-input v-model="queryRecord.applyIdNumber" type="text" name="applyIdNumber"
                    :readonly="fixedQueryRecord.applyIdNumber?true:false" :label="$t('zlkContract.field.applyIdNumber')" clearable resize autofocus/>
        </el-form-item>
        <el-form-item :label="$t('zlkContract.field.contractStatus')" prop="contractStatus" :size="$store.state.app.size">
          <el-checkbox-group v-model="queryRecord.contractStatus" :max="1">
            <el-checkbox name="contractStatus" :label="true" :disabled="fixedQueryRecord.contractStatus?true:false">{{ $t('system.action.yes') }}</el-checkbox>
            <el-checkbox name="contractStatus" :label="false" :disabled="fixedQueryRecord.contractStatus?true:false">{{ $t('system.action.no') }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :label="$t('zlkContract.field.creator')" prop="creator" :size="$store.state.app.size">
          <el-input v-model="queryRecord.creator" type="text" name="creator"
                    :readonly="fixedQueryRecord.creator?true:false" :label="$t('zlkContract.field.creator')" clearable resize autofocus/>
        </el-form-item>
      </div>
    </cg-query-condition>
  </div>
</template>

<script>
import {hasAuthority} from '@/utils/cg'
import ParentTable from '@/views/common-views/components/table'
const Comp = {
  name: 'CgListContract',
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
      defaultOrder: 'contract_status desc',
      queryRecordFields: ['name','contractNumber','applyIdNumber','contractStatus','creator'],
      formPath: '/apartment/zlkContract/record',
      idField: 'id',
      dictionary: {
        dictApplyIdType: this.getDictionary('身份证,手机号','身份证,手机号'),
        dictRoomIds: [],
        dictUserNo: []
      },
      needLoadDictionary: true,
      paginationCurrentPage: 1,
      paginationPageSize: this.$store.state.app.device === 'mobile' ? 10 : 30,
      paginationTotalRecords: 0,
      hasSonTables: true,
      listName: 'contract',
      multipleSelection: true,
      generatorName: 'zlkContract',
      baseUrl: '/apartment/zlkContract'
    }
  },
  computed: {
    additionalActions() {
      if (this.joinMode) return []
      else return [
        {
          action: 'downloadUser',
          icon: 'fa fa-arrow-circle-o-down',
          title: 'zlkContract.action.downloadUser',
          groupid: 10,
          confirm: 'zlkContract.action.downloadUserConfirm',
          rowProperty: 'mr',
          actionProperty: 'aj',
          displayProperties: 'tb,rw',
          appendClass: '',
          needRefresh: false
        },
        {
          action: 'cancel',
          icon: 'el-icon-remove',
          title: 'zlkContract.action.cancel',
          groupid: 10,
          confirm: 'zlkContract.action.cancelConfirm',
          rowProperty: 'sr',
          actionProperty: 'pg',
          displayProperties: 'rw,tb',
          appendClass: 'this.cancel()',
          needRefresh: false
        }
      ]
    },
    allActions() {
      if (this.joinMode) return 'refresh,query'
      else return 'query,,list,add,view,edit,downloadUser,cancel,'
    }
  },
  mounted() {
    this.cgList.list_tableInit(this)
  },
  methods: {
    initialQueryRecord() {
      return Object.assign({
        contractId: null,
        name: null,
        contractNumber: null,
        applyIdType: null,
        applyIdNumber: null,
        isChange: null,
        roomIds: null,
        userNo: null,
        startTime: null,
        endTime: null,
        contractStatus: [],
        creator: null,
        createTime: null,
      }, this.fixedQueryRecord)
    },
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgListContract-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
  mixins
}
</script>
