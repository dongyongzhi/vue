import cgForm from '@/utils/cgForm'
export default{
  created(){
    this.$on("submitted",()=>{
      this.$eventBus.$emit("updateDict")
    })
  },
  methods: {
    useMixinMethodsFirst () {
      return true
    },
    newRecord: function() {
      return {
          realName: '',
          sex: '1',
          idType: 1,
          idNumber: '',
          userType: 2,
      }
    },
    disabledAction(btn) {
      if (btn.action=='sample') return !this.record.userNo
      else return false
    },
     submit: function() {
       if(this.record.phone==""||this.record.phone==null){
         this.$message.error('请填写手机号');
         return
       }
       if (this.recordChanged) cgForm.form_submit(this, 'save',true)
     }
  }
}
