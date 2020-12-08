<template>
</template>
<script>
const deleteHtml = '<form  id="database_delete_dialog_form">' +
  '<div style="width:100%">' +
  '  <div class="radio">' +
  '    <input type="radio" name="options" id="options0" value="0">' +
  '    <label for="options0">注销订单，并同步删除锁中用户信息</label>' +
  '  </div>' +
  '  <div class="radio">' +
  '    <input type="radio" name="options" id="options1" value="1" checked>' +
  '    <label for="options1">仅注销订单</label>' +
  '  </div>' +
  '</div>' +
  '</form>'

const vue = window.$vue
import { request } from '@/utils/request'
import cgList from '@/utils/cgList'
import time from '@/utils/time'
export default {
  created(){
    var that = this
    that.$eventBus.$on('updateDict', () => {
      that.needLoadDictionary = true
      that.doAction('refresh')
    })
    // that.$eventBus.$on('updateDictUser', () => {
    //   that.needLoadDictionary = true
    //   that.doAction('refresh')
    // })
  },
  methods: {
    useMixinMethodsFirst () {
      return true
    },
    getActionParams(action, options, id) {
      if (action === 'cancel') {
        const row = options.row ? options.row : cgList.list_checkSelections(this, false)
        vue.$alert(deleteHtml.replace('TABLE_ID', id), '注销订单', {
          dangerouslyUseHTMLString: true,
          showCancelButton: true
        }).then(_ => {
          const form = document.getElementById('database_delete_dialog_form')
          const opts = []
          form.elements.forEach(e => {
            if (e.type === 'radio') {
              if (e.checked) opts.push(e.value)
            }
          })
          const params = { id: id, checked: opts.join(',') }
          request({
            url: this.baseUrl + '/action/cancel',
            method: 'post',
            params
          }).then((res) => {
            if (res && res.success) {
              row.contractStatus = false
            }
          })
        })
      }
    },
    cancel(options) {
    },
    rowClassName({row, rowIndex}){
      var endTime = time.toDate(row.endTime,'YYYY-MM-DD HH:mm:ss')
      var sectionTime = endTime.getTime()-(new Date().getTime())
      var sevenTime = 7*24*3600*1000
      var fifiteenTime = 15*24*3600*1000
      if (row.contractStatus) {
        if (sectionTime > sevenTime && sectionTime < fifiteenTime) {
          return 'fifteen'
        } else if (1 < sectionTime && sectionTime < sevenTime) {
          return 'seven'
        } else if (sectionTime < 0) {
          return 'denger'
        }
      }
    }
  }
}
</script>

<style>
  .fifteen td{
      background: oldlace !important
    }

  .seven td{
      background: #f0e68c !important
  }

  .denger td{
    background:  #ff6347 !important
  }
</style>
