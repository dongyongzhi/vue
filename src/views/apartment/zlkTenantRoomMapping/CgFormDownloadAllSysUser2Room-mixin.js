import { request } from '@/utils/request'
import cgForm from '@/utils/cgForm'
import time from '@/utils/time'
export default {
  created() {
    this.record.starttime = this.$route.params.start
    this.record.endtime = this.$route.params.end
    this.record.userNo = this.$route.params.name
    this.record.password = this.$route.params.password
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
        if(action=='downloadAllSysUser2Room'){
          var start = this.record.starttime
          var end = this.record.endtime
          var current = new Date()
          var password = this.record.password
          if(end<current){
            this.$message.error('时间不合法');
            return
          }
          if(start>=end){
             this.$message.error('时间不合法');
             return
          }
          if(password!=null&&password.length!=0){
            if (!(/(^[0-9]{8,16}$)/.test(password))) {
             this.$message.error('密码必须为8-16位纯数字');
             return
            }
          }
          request({
            url: this.baseUrl+'/action/downloadAllSysUser2Room',
            method: 'post',
            params: { id : '',
              starttime: time.toString(this.record.starttime),
              endtime: time.toString(this.record.endtime),
              userNo: this.$route.params.userNo,
              userType: this.$route.params.userType,
              password: this.record.password
            }
          }).then((res)=>{
            res && res.success && cgForm.form_close(this)
          })
        }
    },
    downloadAllSysUser2Room(options) {

    }
  },
  watch: {
    recordChanged(newV,oldV){
      if(newV)this.recordChanged = oldV
    }
  }
}
