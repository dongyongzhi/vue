
<template>
  <div :class="joinMode?'cg-join-list':'cg-list'">
    <el-backtop v-if="isTableMode()" ref="cgListBacktop" class="el-backtop" target=".cg-list-downloaduser .el-table__body-wrapper" :visibility-height="200">
      <i class="el-icon-caret-top" />
    </el-backtop>
    <el-table ref="cgList" v-if="isTableMode()" v-loading="listLoading" :data="rows" :class="className" row-key="userNo" :row-class-name="rowClassName" 
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
      <cg-table-column prop="userNo" :page="paginationCurrentPage" :label="$t('zlkUser.field.userNo')" align="left" >
        <template slot-scope="scope">
          {{ scope.row.userNo }}
        </template>

      </cg-table-column>
      <cg-table-column prop="realName" :page="paginationCurrentPage" :label="$t('zlkUser.field.realName')" align="left" >
        <template slot-scope="scope">
          {{ scope.row.realName }}
        </template>

      </cg-table-column>
      <cg-table-column prop="employeeNo" :page="paginationCurrentPage" :label="$t('zlkUser.field.employeeNo')" align="left" >
        <template slot-scope="scope">
          {{ scope.row.employeeNo }}
        </template>

      </cg-table-column>
      <cg-table-column prop="userType" type="dict" :page="paginationCurrentPage" :label="$t('zlkUser.field.userType')" align="left" >
        <template slot-scope="scope">
          {{ dictValue(scope.row.userType,dictionary.dictUserType,false,true) }}
        </template>

      </cg-table-column>
      <cg-table-column prop="idType" type="dict" :page="paginationCurrentPage" :label="$t('zlkUser.field.idType')" align="left" >
        <template slot-scope="scope">
          {{ dictValue(scope.row.idType,dictionary.dictIdType,false,true) }}
        </template>

      </cg-table-column>
      <cg-table-column prop="idNumber" :page="paginationCurrentPage" :label="$t('zlkUser.field.idNumber')" align="left" >
        <template slot-scope="scope">
          {{ scope.row.idNumber }}
        </template>

      </cg-table-column>
      <cg-table-column prop="sex" type="dict" :page="paginationCurrentPage" :label="$t('zlkUser.field.sex')" align="left" >
        <template slot-scope="scope">
          {{ dictValue(scope.row.sex,dictionary.dictSex,false,true) }}
        </template>

      </cg-table-column>
      <cg-table-column prop="vaildTime" type="datetime" :page="paginationCurrentPage" :label="$t('zlkUser.field.vaildTime')" align="left" >
        <template slot-scope="scope">
          {{ time2String(scope.row.vaildTime,'yyyy-MM-dd HH:mm') }}
        </template>

      </cg-table-column>
      <cg-table-column prop="expiredTime" type="datetime" :page="paginationCurrentPage" :label="$t('zlkUser.field.expiredTime')" align="left" >
        <template slot-scope="scope">
          {{ time2String(scope.row.expiredTime,'yyyy-MM-dd HH:mm') }}
        </template>

      </cg-table-column>
      <cg-action v-model="showActionView" mode="2" :url="baseUrl" :actions="cgList.list_allActions(myself,'main')" @actionClick="doAction" />
    </el-table>
    <cg-card-list v-else ref="cgList" v-loading="listLoading" :render="rowRender" :data="rows" :mainClass="className" row-key="userNo" :multiple="false" :height="tableHeight()" 
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
                  wrapperElement=".cg-list-downloaduser .el-table__body-wrapper"
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
  </div>
</template>

<script>
import {hasAuthority} from '@/utils/cg'
import ParentTable from '@/views/common-views/components/table'
const Comp = {
  name: 'CgListDownloadUser',
  mixins: [ParentTable],
  props: {
    selectionKey: {
      type: String,
      default: 'userNo'
    }
  },
  data() {
    return {
      path: 'download',
      defaultOrder: 'create_time desc',
      queryRecordFields: [],
      formPath: '/apartment/zlkUser/record',
      idField: 'userNo',
      dictionary: {
        dictUserType: [],
        dictIdType: [],
        dictSex: this.getDictionary('0,1','女,男')
      },
      needLoadDictionary: true,
      paginationCurrentPage: 1,
      paginationPageSize: this.$store.state.app.device === 'mobile' ? 10 : 30,
      paginationTotalRecords: 0,
      listName: 'downloadUser',
      multipleSelection: true,
      generatorName: 'zlkUser',
      baseUrl: '/apartment/zlkUser'
    }
  },
  computed: {
    additionalActions() {
      if (this.joinMode) return []
      else return [
        {
          action: 'downloadUser',
          icon: 'fa fa-arrow-down',
          title: 'zlkUser.action.downloadUser',
          groupid: 10,
          confirm: '',
          rowProperty: 'mr',
          actionProperty: 'aj',
          displayProperties: 'tb,rw',
          appendClass: '',
          needRefresh: false
        }
      ]
    },
    allActions() {
      if (this.joinMode) return 'refresh'
      else return ',list,downloadUser,'
    }
  },
  mounted() {
    this.cgList.list_tableInit(this)
  },
  methods: {
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgListDownloadUser-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
  mixins
}
</script>
