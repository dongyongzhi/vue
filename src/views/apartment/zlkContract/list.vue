<template>
  <div class="cg-list">
    <el-card shadow="hover">
      <div slot="header">
        <cg-header homeMenu icon="el-icon-s-operation" :hasMenu="hasMenu()"
                   :title="title" :content="content" @goBack="goBack" @menuAction="showActionSheet"
        />
        <div id="box_border">
                <ul id="fang_type">
                  <li style="width: 160px;"><span class="ui_txt_bold05">仅标识未注销的合同</span></li>
                  <li style="background-color: oldlace;">7-15天到期</li>
                  <li style="background-color: #f0e68c;">0-7天到期</li>
                  <li style="background-color: #ff6347;">已到期</li>
                </ul>
              </div>
      </div>
      <CgListContract ref="cgList" :height="clientHeight" @detail="doShowDetail" :fixedQueryRecord="fixedQueryRecord"/>
    </el-card>
  </div>
</template>

<script>
import CgListContract from './CgListContract.vue'
import ParentList from '@/views/common-views/components/list'
const Comp = {
  name: 'ContractList',
  components: { CgListContract },
  mixins: [ParentList],
  data() {
    return {
      path: 'list',
      generatorName: 'zlkContract',
      baseUrl: '/apartment/zlkContract'
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

<style>
  #box_border {
    text-align: center;
  }

  #fang_type {
    list-style-type: none;
    position: fixed;
    right: 25px;
  }

  #fang_type li{
    width: 120px;
    height: 22px;
    line-height: 22px;
    color: #000000;
    display: inline-block;
  }

  .ui_txt_bold05 {
      color: black;
      font-weight: bolder;
  }
</style>