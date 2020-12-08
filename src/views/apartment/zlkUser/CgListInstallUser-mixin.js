const deleteHtml = '<form  id="database_delete_dialog_form">' +
    '<div style="width:100%">' +
    '  <div class="radio">' +
    '    <input type="radio" name="options" id="options0" value="0" checked>' +
    '    <label for="options0">删除人员，并同步删除锁中用户信息</label>' +
    '  </div>' +
    '  <div class="radio">' +
    '    <input type="radio" name="options" id="options1" value="1">' +
    '    <label for="options1">仅删除系统中存储的人员信息</label>' +
    '  </div>' +
    '  <div class="radio">' +
    '    <input type="radio" name="options" id="options2" value="2">' +
    '    <label for="options2">仅删除所有房间中该用户信息</label>' +
    '  </div>' +
    '  <div class="radio">' +
    '    <input type="radio" name="options" id="options3" value="3">' +
    '    <label for="options3">仅删除所选房间中该用户信息</label>' +
    '  </div>' +
    '  <div style=" height: 30px;">' +
    '  <span style="right: 0px;position: absolute;margin-top: 10px;color: red;">注：最后一个选项只能选择一条数据</span>' +
    '  </div>' +
    '</div>' +
    '</form>'

const downloadHtml = '<form  id="database_download_dialog_form">' +
    '<div style="width:100%">' +
    '  <div class="radio">' +
    '    <input type="radio" name="options" id="options0" value="0" checked>' +
    '    <label for="options0">下发人员到具体的房间</label>' +
    '  </div>' +
    '  <div class="radio">' +
    '    <input type="radio" name="options" id="options1" value="1">' +
    '    <label for="options1">下发人员到所有的有锁的房间</label>' +
    '  </div>' +
    '</div>' +
    '</form>'

import cgList from '@/utils/cgList'
import { request } from '@/utils/request'
import { findRouteByUrl } from '@/utils/filterRoutes'
const vue = window.$vue
export default {
  mounted() {
    this.formPath = '/apartment/zlkUser/installForm'
  },
  methods: {
    getActionParams(action, options, id) {
      var $router = window.$vue.$router
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
            var checked = opts.join(',')
            if (checked == '2') {
              const userNos = []
              const userTypes = []
              const row = options.row ? options.row : cgList.list_checkSelections(this, true)
              row.forEach(r => {
                userNos.push(r.userNo)
                userTypes.push(r.userType)
              })
              const params = { id: id, userTypes: userTypes.join(','), userNos: userNos.join(',') }
              request({
                url: this.baseUrl + '/action/deleteUser',
                method: 'post',
                params
              }).then((res) => {
                if (res && res.success) {
                  // cgList.list_removeRecord(this, id)
                }
              })
            } else if (checked == '3') {
              const length = this.$refs.cgList.store.states.selection.length
              if (length > 1) {
                this.$message.error('此选项请选择一条记录');
                return
              }
              const row = options.row ? options.row : cgList.list_checkSelections(this, false)
              const userNo = row[0].userNo
              const userType = row[0].userType
              const name = row[0].realName
              if (userType == '0') {
                this.$message.error('超级管理员无房间删除');
                return
              }
              const params = { id: id, userType: userType, userNo: userNo, name: name }
              const route = findRouteByUrl("/apartment/zlkTenantRoomMapping/deleteForm",$router)
              $router.push({
                name: route.name,
                params: params
              })
            } else {
              const types = []
              const rows =  options.row ? options.row : cgList.list_checkSelections(this, true)
              rows.forEach(row => {
                types.push(row.userType)
              })
              const params = { ids: id, checked: checked, types: types.join(',') }
              request({
                url: this.baseUrl + '/batdel',
                method: 'delete',
                params
              }).then((res) => {
                if (res && res.success) {
                  cgList.list_removeRecord(this, id)
                }
              })
            }
          })
        } else if (action == 'downloadSysUser') {
          const row = options.row ? options.row : cgList.list_checkSelections(this, false)
          vue.$alert(downloadHtml.replace('TABLE_ID', id), '下发人员', {
            dangerouslyUseHTMLString: true,
            showCancelButton: true
          }).then(_ => {
            const form = document.getElementById('database_download_dialog_form')
            const opts = []
            form.elements.forEach(e => {
              if (e.type === 'radio') {
                if (e.checked) opts.push(e.value)
              }
            })
            var checked = opts.join(',')
            var start = row.vaildTime
            var end = row.expiredTime
            var name = row.realName
            var userNo = row.userNo
            var userType = row.userType
            var password = row.userPassword
            if (userType=='0') {
              this.$message.error('超级管理员无法下发');
              return
            }
            const params = { id: id, userType: userType, start: start, end: end, name: name, userNo: userNo, password: password }
            if (checked == '1') {
              const route = findRouteByUrl("/apartment/zlkTenantRoomMapping/downloadAllForm",$router)
              $router.push({
                name: route.name,
                params: params
              })
            } else if (checked == '0') {
              const route = findRouteByUrl("/apartment/zlkTenantRoomMapping/downloadForm",$router)
              $router.push({
                name: route.name,
                params: params
              })
            }
          })
        }
      },
      deleteUser(options) {

      },
      downloadUser(options) {

      }
   }

}
