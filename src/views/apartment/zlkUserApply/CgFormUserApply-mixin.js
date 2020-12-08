import cgForm from '@/utils/cgForm'
export default{
  created(){
    this.flag = false
    this.isNotSys = false
  },
  mounted() {
    if(this.record.action!=null&&this.record.action==1){
      this.flag = true
    }
    if(this.record.userType!=null&&this.record.userType==2){
      this.isNotSys = true
    }
    this.record.msg = null
  },
  methods: {
    useMixinMethodsFirst () {
      return true
    },
   submit: function() {
     var start = this.record.vaildTime
     var end = this.record.expiredTime
     var action = this.record.action
     var password = this.record.userPassword
     var msg = this.record.msg
     var area = this.record.area
     var userType = this.record.userType
     if(userType!=2){
       if(start>=end){
          this.$message.error('时间不合法');
          return
       }
       if(action==1&&area==null){
         this.$message.error('请选择管理区域');
         return
       }
       if(password!=null&&password.length!=0){
         if (!(/(^[0-9]{8,16}$)/.test(password))) {
          this.$message.error('密码必须为8-16位纯数字');
          return
         }
       }
     }
     if(action==2&&msg==null){
        this.$message.error('请填写回复信息');
        return
     }
     if (this.recordChanged) cgForm.form_submit(this, 'save',true)
   }
  }
}
