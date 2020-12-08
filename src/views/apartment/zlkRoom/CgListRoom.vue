
<template>
  <div :class="joinMode?'cg-join-list':'cg-list'">
    <el-backtop v-if="isTableMode()" ref="cgListBacktop" class="el-backtop" target=".cg-list-room .el-table__body-wrapper" :visibility-height="200">
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
      <el-table-column prop="roomName" width="400" :label="$t('zlkRoom.field.roomName')" sortable align="left" >
        <template slot-scope="scope">
          {{ scope.row.roomName }}
        </template>

      </el-table-column>
      <el-table-column prop="regTime" type="datetime" width="200" :label="$t('zlkRoom.field.regTime')" align="left" >
        <template slot-scope="scope">
          {{ time2String(scope.row.regTime,'yyyy-MM-dd HH:mm') }}
        </template>

      </el-table-column>
      <cg-table-column prop="lockName" :page="paginationCurrentPage" :label="$t('zlkRoom.field.lockId')" align="left" >
        <template slot-scope="scope">
          {{ scope.row.lockName }}
        </template>

      </cg-table-column>
      <cg-table-column prop="isOccupy" :page="paginationCurrentPage" :label="$t('zlkRoom.field.isOccupy')" align="left" >
        <template slot-scope="scope">
          <cg-icon :color="scope.row.isOccupy?'#46a6ff':'grey'" :icon="scope.row.isOccupy?'fa fa-check-circle':'fa fa-circle-o'"/>
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
                  wrapperElement=".cg-list-room .el-table__body-wrapper"
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
        <cg-select v-model="queryRecord.searchFields" dictionary="roomName|zlkRoom.field.roomName," multiple/>
      </el-form-item>
      <el-divider />
      <div v-show="!queryRecord.search">
        <el-form-item :label="$t('zlkRoom.field.roomName')" prop="roomName" :size="$store.state.app.size">
          <el-input v-model="queryRecord.roomName" type="text" name="roomName"
                    :readonly="fixedQueryRecord.roomName?true:false" :label="$t('zlkRoom.field.roomName')" clearable resize autofocus/>
        </el-form-item>
      </div>
    </cg-query-condition>
  </div>
</template>

<script>
import {hasAuthority} from '@/utils/cg'
import ParentTable from '@/views/common-views/components/table'
const Comp = {
  name: 'CgListRoom',
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
      queryRecordFields: ['roomName'],
      formPath: '/apartment/zlkRoom/record',
      idField: 'id',
      dictionary: {
        dictAddressId: []
      },
      needLoadDictionary: true,
      paginationCurrentPage: 1,
      paginationPageSize: this.$store.state.app.device === 'mobile' ? 10 : 30,
      paginationTotalRecords: 0,
      listName: 'room',
      generatorName: 'zlkRoom',
      baseUrl: '/apartment/zlkRoom'
    }
  },
  computed: {
    additionalActions() {
      if (this.joinMode) return []
      else return [
        {
          action: 'userCache',
          icon: 'fa fa-search-plus',
          title: 'zlkRoom.action.userCache',
          groupid: 10,
          confirm: '',
          rowProperty: 'sr',
          actionProperty: 'pg',
          displayProperties: 'tb',
          appendClass: 'this.userCache()',
          needRefresh: true
        },
        {
          action: 'queryUser',
          icon: 'fa fa-search',
          title: 'zlkRoom.action.queryUser',
          groupid: 10,
          confirm: '',
          rowProperty: 'sr',
          actionProperty: 'pg',
          displayProperties: 'tb,rw',
          appendClass: 'this.queryUser()',
          needRefresh: false
        },
        {
          action: 'deleteUser',
          icon: 'fa fa-trash',
          title: 'zlkRoom.action.deleteUser',
          groupid: 10,
          confirm: '',
          rowProperty: 'sr',
          actionProperty: 'pg',
          displayProperties: 'tb,rw',
          appendClass: 'this.deleteType()',
          needRefresh: false
        },
        {
          action: 'deleteQuery',
          icon: 'fa fa-times',
          title: 'zlkRoom.action.deleteQuery',
          groupid: 10,
          confirm: '',
          rowProperty: 'sr',
          actionProperty: 'aj',
          displayProperties: 'tb',
          appendClass: '',
          needRefresh: false
        },
        {
          action: 'unfrozen',
          icon: 'fa fa-unlock',
          title: 'zlkRoom.action.unfrozen',
          groupid: 10,
          confirm: 'zlkRoom.action.unfrozenConfirm',
          rowProperty: 'sr',
          actionProperty: 'aj',
          displayProperties: 'tb',
          appendClass: '',
          needRefresh: false
        },
        {
          action: 'frozen',
          icon: 'fa fa-unlock-alt',
          title: 'zlkRoom.action.frozen',
          groupid: 10,
          confirm: '',
          rowProperty: 'sr',
          actionProperty: 'pg',
          displayProperties: 'tb,rw',
          appendClass: 'this.frozen()',
          needRefresh: false
        },
        {
          action: 'oplog',
          icon: 'fa fa-book',
          title: 'zlkRoom.action.oplog',
          groupid: 10,
          confirm: '',
          rowProperty: 'sr',
          actionProperty: 'pg',
          displayProperties: 'tb',
          appendClass: 'this.oplog()',
          needRefresh: false
        }
      ]
    },
    allActions() {
      if (this.joinMode) return 'refresh,query'
      else return 'query,,list,add,view,edit,delete,unfrozen,queryUser,oplog,frozen,deleteQuery,deleteUser,userCache,'
    }
  },
  mounted() {
    this.cgList.list_tableInit(this)
  },
  methods: {
    initialQueryRecord() {
      return Object.assign({
        addressId: null,
        roomName: null,
        regTime: null,
        lockName: null,
        isOccupy: null,
      }, this.fixedQueryRecord)
    },
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgListRoom-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
  mixins
}
</script>
