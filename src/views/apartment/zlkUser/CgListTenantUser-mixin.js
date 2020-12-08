const deleteHtml = '<form  id="database_delete_dialog_form">' +
  '<div style="width:100%">' +
  '  <div class="radio">' +
  '    <input type="radio" name="options" id="options0" value="0">' +
  '    <label for="options0">删除人员，并同步删除锁中用户信息</label>' +
  '  </div>' +
  '  <div class="radio">' +
  '    <input type="radio" name="options" id="options1" value="1" checked>' +
  '    <label for="options1">仅删除系统中存储的人员信息</label>' +
  '  </div>' +
  '</div>' +
  '</form>'

import cgList from '@/utils/cgList'
import { request } from '@/utils/request'
const vue = window.$vue
export default {
  mounted() {
    this.formPath = '/apartment/zlkUser/recordSelect'
  },
  methods: {
    getActionParams(action, options, id) {
      if (action === 'deleteUser') {
        vue.$alert(deleteHtml.replace('TABLE_ID', id), '删除人员', {
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
          const types = []
          const rows =  options.row ? options.row : cgList.list_checkSelections(this, true)
          rows.forEach(row =>{
            types.push(row.userType)
          })
          const params = { ids: id, checked: opts.join(','), types: types.join(',') }
          request({
            url: this.baseUrl+'/batdel',
            method: 'delete',
            params
          }).then((res)=>{
            if(res && res.success){
              cgList.list_removeRecord(this,id)
            }
          })
      })
    }
   },
   deleteUser(options){

   }
   }

}
