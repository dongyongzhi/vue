<template>
  <div class="cg-list">
    <el-card shadow="hover">
      <div slot="header">
        <cg-header homeMenu :showMaster="getShowMaster()" icon="el-icon-s-operation" :hasMenu="hasMenu()"
                   :title="title" :content="content" @goBack="goBack" @menuAction="showActionSheet" @showDetail="showDetail"
        />
      </div>
      <div v-if="mobile">
        <div v-show="showMaster" class="cg-father">
          <CgListContractRoom ref="cgList" @detail="doShowDetail" @rowClick="rowClick" @refreshed="refreshed" :fixedQueryRecord="fixedQueryRecord" />
        </div>
        <el-tabs v-show="!showMaster" v-model="selectedSon" class="cg-child">
            <el-tab-pane :label="$t('zlkContractRoomUser.title.list')" name="cgList_son0" :style="{height: childHeight+'px'}">
              <CgListContractRoomUser ref="cgList_son0" :contractId="contractId" :contractRoomId="contractRoomId" :height="childHeight" :fixedQueryRecord.sync="son0Condition" />
            </el-tab-pane>
        </el-tabs>
      </div>
      <div v-else class="components-container" :style="'height:'+clientHeight+'px'">
        <split-pane :default-percent="35" split="horizontal" @resize="resize">
          <template slot="paneL">
            <div class="cg-father">
              <CgListContractRoom ref="cgList" @rowClick="rowClick" @refreshed="refreshed" :fixedQueryRecord="fixedQueryRecord" :height="fatherHeight" />
            </div>
          </template>
          <template slot="paneR">
            <el-tabs v-model="selectedSon" class="cg-child" type="border-card">
              <el-tab-pane :label="$t('zlkContractRoomUser.title.list')" name="cgList_son0" :style="{height: childHeight+'px'}">
                <CgListContractRoomUser ref="cgList_son0" :contractId="contractId" :contractRoomId="contractRoomId" :height="childHeight" :fixedQueryRecord.sync="son0Condition" />
              </el-tab-pane>
            </el-tabs>
          </template>
        </split-pane>
      </div>
    </el-card>
  </div>
</template>

<script>
import CgListContractRoom from './CgListContractRoom.vue'
import ParentList from '@/views/common-views/components/list-sons'
import CgListContractRoomUser from '@/views/apartment/zlkContractRoomUser/CgListContractRoomUser.vue'
const Comp = {
  name: 'ContractRoomList',
  components: { CgListContractRoom, CgListContractRoomUser },
  mixins: [ParentList],
  data() {
    return {
      fatherHeightPercent: 35,
      titleField: 'roomName',
      sonCount: 1,
      son0Condition: {
        contractRoomId: 'null'
      },
      sonPkFields: ['id'],
      path: 'list',
      generatorName: 'zlkContractRoom',
      baseUrl: '/apartment/zlkContractRoom'
    }
  }
}
const mixins = [Comp]
const mixinContext = require.context('.', false, /list-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { mixins.push(mixinContext(key).default) })
export default mixins.length < 2 ? Comp : {
  mixins
}
</script>
