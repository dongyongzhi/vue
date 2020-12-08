import { request } from '@/utils/request'
import cgForm from '@/utils/cgForm'
export default {
  created() {
    this.record.userNo = this.$route.params.name
  },
  methods: {
    useMixinMethodsFirst () {
      return true
    },
     extendActionFilter(action,row){
        if(action=='edit'){
          return false
        }
        return true
    },
    getActionParams(action, options, id) {
        if(action=='deleteSysUser2Room'){
          if (this.record.roomId==null||this.record.roomId=='') {
            this.$message.error('请选择房间');
            return
          }
          request({
            url: this.baseUrl+'/action/deleteSysUser2Room',
            method: 'post',
            params: { id : '',
              userNo: this.$route.params.userNo,
              userType: this.$route.params.userType,
              rooms: this.record.roomId
            }
          }).then((res)=>{
            res && res.success && cgForm.form_close(this)
          })
        }
    },
    deleteSysUser2Room(options) {

    }
  },
  watch: {
    recordChanged(newV,oldV){
      if(newV)this.recordChanged = oldV
    }
  }
}
