
<template>
  <div :class="joinMode?'cg-join-list':'cg-list'">
    <el-backtop v-if="isTableMode()" ref="cgListBacktop" class="el-backtop" target=".cg-list-userapply .el-table__body-wrapper" :visibility-height="200">
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
      <cg-table-column prop="realName" :page="paginationCurrentPage" :label="$t('zlkUserApply.field.realName')" align="left" >
        <template slot-scope="scope">
          {{ scope.row.realName }}
        </template>

      </cg-table-column>
      <cg-table-column prop="sex" type="dict" :page="paginationCurrentPage" :label="$t('zlkUserApply.field.sex')" align="right" >
        <template slot-scope="scope">
          {{ dictValue(scope.row.sex,dictionary.dictSex,false,true) }}
        </template>

      </cg-table-column>
      <cg-table-column prop="idType" type="dict" :page="paginationCurrentPage" :label="$t('zlkUserApply.field.idType')" align="right" >
        <template slot-scope="scope">
          {{ dictValue(scope.row.idType,dictionary.dictIdType,false,true) }}
        </template>

      </cg-table-column>
      <cg-table-column prop="idNumber" :page="paginationCurrentPage" :label="$t('zlkUserApply.field.idNumber')" align="left" >
        <template slot-scope="scope">
          {{ scope.row.idNumber }}
        </template>

      </cg-table-column>
      <cg-table-column prop="userType" type="dict" :page="paginationCurrentPage" :label="$t('zlkUserApply.field.userType')" align="right" >
        <template slot-scope="scope">
          {{ dictValue(scope.row.userType,dictionary.dictUserType,false,true) }}
        </template>

      </cg-table-column>
      <cg-table-column prop="phone" :page="paginationCurrentPage" :label="$t('zlkUserApply.field.phone')" align="left" >
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>

      </cg-table-column>
      <cg-table-column prop="employee" :page="paginationCurrentPage" :label="$t('zlkUserApply.field.employee')" align="left" >
        <template slot-scope="scope">
          {{ scope.row.employee }}
        </template>

      </cg-table-column>
      <cg-table-column prop="applyTime" type="datetime" :page="paginationCurrentPage" :label="$t('zlkUserApply.field.applyTime')" align="left" >
        <template slot-scope="scope">
          {{ time2String(scope.row.applyTime,'yyyy-MM-dd HH:mm') }}
        </template>

      </cg-table-column>
      <cg-table-column prop="status" type="dict" :page="paginationCurrentPage" :label="$t('zlkUserApply.field.status')" align="right" >
        <template slot-scope="scope">
          {{ dictValue(scope.row.status,dictionary.dictStatus,false,true) }}
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
                  wrapperElement=".cg-list-userapply .el-table__body-wrapper"
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
  name: 'CgListUserApply',
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
      defaultOrder: 'status desc',
      queryRecordFields: [],
      formPath: '/apartment/zlkUserApply/record',
      idField: 'id',
      dictionary: {
        dictAction: this.getDictionary('1,2','同意,不同意'),
        dictArea: [],
        dictSex: [],
        dictIdType: [],
        dictUserType: this.getDictionary('1,2,3','管理员,租户,安装人员'),
        dictStatus: this.getDictionary('1,2,3,4','同意,不同意,重审核,待审核')
      },
      needLoadDictionary: true,
      paginationCurrentPage: 1,
      paginationPageSize: this.$store.state.app.device === 'mobile' ? 10 : 30,
      paginationTotalRecords: 0,
      listName: 'userApply',
      multipleSelection: true,
      generatorName: 'zlkUserApply',
      baseUrl: '/apartment/zlkUserApply'
    }
  },
  computed: {
    allActions() {
      if (this.joinMode) return 'refresh'
      else return ',list,edit,export,import,'
    }
  },
  mounted() {
    this.cgList.list_tableInit(this)
  },
  methods: {
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /CgListUserApply-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
  mixins
}
</script>
