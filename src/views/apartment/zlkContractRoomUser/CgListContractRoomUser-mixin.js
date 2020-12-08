import cgList from '@/utils/cgList'
import { transfer } from '@/views/common-views/extend-views/CgTransferDialog'
import { request } from '@/utils/request'
export default{
  props: {
    contractId: {
      type: Number
    },
    contractRoomId: {
      type: Number
    }
  },
  data() {
    return {
      allFieldsInTable: [],
      //map: new Map(),
      super: {}
    }
  },
  watch: {
    // contractId: {
    //   handler(n,o) {
    //     if (n) {
    //       const req = {
    //         url: '/apartment/zlkContractUser/action/roomBindUser',
    //         method: 'get',
    //         params: {
    //           contractId: n
    //         }
    //       }
    //       request(req, 'show-error').then(res => {
    //         if (res && res.hasOwnProperty('success') && res.success) {
    //           this.allFieldsInTable = []
    //           if (res.data) {
    //             this.map = res.data
    //             res.data.forEach(r => {
    //               const txt = r.userName
    //               this.allFieldsInTable.push({ key: r.id, label: txt })
    //             })
    //           }
    //         }
    //       })
    //     }
    //   },
    //   immediate: true
    // },
    contractRoomId: {
      handler(n) {
        if(n){
          const req = {
            url: '/apartment/zlkContractUser/action/roomBindUser',
            method: 'get',
            params: {
              contractRoomId: n
            }
          }
          request(req, 'show-error').then(res => {
            if (res && res.hasOwnProperty('success') && res.success) {
              this.allFieldsInTable = []
              if (res.data) {
                res.data.forEach(r => {
                  const txt = r.userName
                  this.allFieldsInTable.push({ key: r.id, label: txt })
                })
              }
            }
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    useMixinMethodsFirst() {
      return true
    },
     extendActionFilter(action,row){
      if(action=='add'||action=='delete'||action=='edit'||action=='batdel'){
        return false
      }else{
        return true
      }
    },
    newRecord(contractUserId) {
      if (this.fixedQueryRecord.contractRoomId) return {
        contractRoomId: this.fixedQueryRecord.contractRoomId,
        contractUserId: contractUserId
      }
      else return {}
    },
    doAction(action,options) {
      this.showActionView = false
      const that = this
      if (action === 'select') {
        const selected = []
        that.rows.forEach(r => {
          selected.push(r.contractUserId)
        })
        // that.allFieldsInTable = []
        //  for (var key in that.map) {
        //    if(key==that.fixedQueryRecord.contractRoomId){
        //       that.map[key].forEach(r =>{
        //         const txt = r.userName
        //         that.allFieldsInTable.push({ key: r.id, label: txt })
        //       })
        //    }
        //   }
        if (that.allFieldsInTable.length >= 0) {
          transfer({
            title: that.title,
            data: that.allFieldsInTable,
            selected,
            onConfirm: function(selected) {
              const fields = Object.assign(selected)
              const fieldsNeedRemove = []
              that.rows.forEach(r => {
                const index = fields.indexOf(r.contractUserId)
                if (index < 0) fieldsNeedRemove.push(r.id)
                else fields.splice(index, 1)
              })
              if (fieldsNeedRemove.length > 0) {
                  cgList.list_request({
                    listObject: that, method: 'delete', silence: false,
                    params: { ids: fieldsNeedRemove.join(',') },
                    action: 'batdel'
                  })
              }
              fields.forEach(f => {
                cgList.list_request({
                  listObject: that, method: 'post', silence: true, action: 'save',
                  data: that.newRecord(f)
                })
              })
              if (fieldsNeedRemove.length > 0 || fields.length > 0) setTimeout(_ => { cgList.list_getDataFromServer(that) }, 1000)
            }
          })
        }
      }  else that.super_doAction(action,options)
    }
  }
}
