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
          <CgListAddress ref="cgList" @detail="doShowDetail" @rowClick="rowClick" @refreshed="refreshed" :fixedQueryRecord="fixedQueryRecord" />
        </div>
        <el-tabs v-show="!showMaster" v-model="selectedSon" class="cg-child">
            <el-tab-pane :label="$t('zlkRoom.title.list')" name="cgList_son0" :style="{height: childHeight+'px'}">
              <CgListRoom ref="cgList_son0" :height="childHeight" :fixedQueryRecord.sync="son0Condition" />
            </el-tab-pane>
        </el-tabs>
      </div>
      <div v-else class="components-container" :style="'height:'+clientHeight+'px'">
        <split-pane :default-percent="20" split="vertical">
          <template slot="paneL">
            <div class="cg-father">
              <CgListAddress ref="cgList" @rowClick="rowClick" @refreshed="refreshed" :fixedQueryRecord="fixedQueryRecord" :height="fatherHeight" />
            </div>
          </template>
          <template slot="paneR">
            <el-tabs v-model="selectedSon" class="cg-child" type="border-card">
              <el-tab-pane :label="$t('zlkRoom.title.list')" name="cgList_son0" :style="{height: childHeight+'px'}">
                <CgListRoom ref="cgList_son0" :height="childHeight" :fixedQueryRecord.sync="son0Condition" />
              </el-tab-pane>
            </el-tabs>
          </template>
        </split-pane>
      </div>
    </el-card>
  </div>
</template>

<script>
import CgListAddress from './CgListAddress.vue'
import ParentList from '@/views/common-views/components/list-sons'
import CgListRoom from '@/views/apartment/zlkRoom/CgListRoom.vue'
const Comp = {
  name: 'AddressList',
  components: { CgListAddress, CgListRoom },
  mixins: [ParentList],
  data() {
    return {
      sonCount: 1,
      son0Condition: {
        addressId: 'null'
      },
      sonPkFields: ['id'],
      path: 'list',
      generatorName: 'zlkAddress',
      baseUrl: '/apartment/zlkAddress'
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
