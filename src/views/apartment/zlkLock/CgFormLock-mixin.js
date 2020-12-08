import { request } from '@/utils/request'
import cgForm from '@/utils/cgForm'
export default{
  methods:{
    useMixinMethodsFirst () {
      return true
   },
    newRecord: function() {
      return {
          modelComm: 0,
      }
    },
	extendActionFilter(action,row){
		if(this.idSaved==null){
			if(action=='addLock'){
				return true
			}else{
				return false
			}
		}else{
			if(action=='updateLock'){
				return true
			}else{
				return false
			}
		}
	},
   getActionParams(action, options, id) {
     const form = this.$refs.cgForm
     form.validate((valid) => {
       if (valid) {
         if(action=='updateLock'){
           request({
             url: this.baseUrl+'/action/updateLock',
             method: 'post',
             params: { id : id,
                      lock:JSON.stringify(this.record)
             }
           }).then((res)=>{
            if(res && res.success){
              const pam = { record: this.record, isNew: this.isNew }
              this.$emit('change', pam)
              if (typeof this.onChange === 'function') this.onChange(pam)
              this.recordChanged = false
              cgForm.form_close(this)
             }
           })
         }else if(action=='addLock'){
           request({
             url: this.baseUrl+'/action/addLock',
             method: 'post',
             params: { id : id,
                      lock:JSON.stringify(this.record)
             }
           }).then((res)=>{
             if(res && res.success){
               this.record.onlineStatus = 2
               this.record.regTime = new Date()
               const pam = { record: this.record, isNew: this.isNew }
               this.$emit('change', pam)
               if (typeof this.onChange === 'function') this.onChange(pam)
               this.recordChanged = false
               cgForm.form_close(this)
             }
           })
         }
       }
    })
   }
  }
}
