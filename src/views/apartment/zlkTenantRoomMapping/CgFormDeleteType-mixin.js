
import { request } from '@/utils/request'
import cgForm from '@/utils/cgForm'
export default {
  methods: {
    useMixinMethodsFirst () {
      return true
    },
    getActionParams(action, options, id) {
        if(action=='deleteType'){
          request({
            url: this.baseUrl+'/action/deleteType',
            method: 'post',
            params: { id : this.$route.query.roomId,
              deleteType: this.record.deleteType
            }
          }).then((res)=>{
            res && res.success && cgForm.form_close(this)
          })
        }
    }
  },
  watch: {
    recordChanged(newV,oldV){
      if(newV)this.recordChanged = oldV
    }
  },
  mounted() {
       var a=document.getElementsByClassName('el-button cg-button el-button--primary el-button--medium is-disabled is-plain')[0]
       a.style.display='none'
  }
}
