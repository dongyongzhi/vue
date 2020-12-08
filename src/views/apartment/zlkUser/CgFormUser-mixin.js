import cgForm from '@/utils/cgForm'
export default{
	computed: {
	  apSM() {
      if(this.$store.state.user.roles.indexOf('admin') >= 0){
        return true
      }else{
        return this.$store.state.user.roles.indexOf('apSM') >= 0
      }
	  }
	},
  methods: {
    useMixinMethodsFirst () {
      return true
    },
    disabledAction(btn) {
      if (btn.action=='sample') return !this.record.userNo
      else return false
    },
    newRecord: function() {
        var date = new Date();
        var month=date.getMonth()+1;
        if(month<10){
           month="0"+month;
        }
        var day=date.getDate();
        if(day<10){
            day="0"+day;
        }
        var hours="00";
        var minutes="00";
        var seconds="00";
        var start=date.getFullYear()+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
        date.setDate(date.getDate()+365);
        if(month<10){
            month="0"+month;
         }
        day=date.getDate();
        if(day<10){
            day="0"+day;
        }
        var end =date.getFullYear()+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
            return {
          realName: '',
          sex: '1',
          idType: 1,
          idNumber: '',
          userType: 1,
		  vaildTime: start,
		  expiredTime: end,
      }
    },
    submit: function() {
      var start = this.record.vaildTime
      var end = this.record.expiredTime
      var type = this.record.idType
      var idNumber = this.record.idNumber
      var password = this.record.userPassword
      if(type==1){
        if (!(/(^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$)/.test(idNumber))) {
          this.$message.error('请输入正确的身份证号码');
          return
        }
      }else if(type==2){
        if (!(/(^1[3|4|5|7|8][0-9]{9}$)/.test(idNumber))) {
          this.$message.error('请输入正确的手机号码');
          return
        }
      }else if(type==3){
        if (!(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(idNumber))) {
          this.$message.error('请输入正确的邮箱号码');
          return
        }
      }

     if(start>=end){
        this.$message.error('时间不合法');
        return
     }
     if(this.record.phone==""||this.record.phone==null){
       this.$message.error('请填写手机号');
       return
     }
     var em = this.record.employeeNo

     if(em==""||em==null){
       this.$message.error('请填写工号');
       return
     }
     if(em!=null&&em.trim().length==0){
       this.$message.error('请填写有效的工号');
       return
     }
     
     if(password!=null&&password.length!=0){
       if (!(/(^[0-9]{8,16}$)/.test(password))) {
        this.$message.error('密码必须为8-16位纯数字');
        return
       }
     }
     if (this.recordChanged) cgForm.form_submit(this, 'save',true)
    }
  }
}
