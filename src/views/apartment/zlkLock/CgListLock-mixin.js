import cgList from '@/utils/cgList'
import { request } from '@/utils/request'
export default{
  data() {
        return {
          timer: ''
        };
   },
  methods:{
    getActionParams(action, options, id) {
       if(action=='deleteLock'){
         request({
           url: this.baseUrl+'/action/deleteLock',
           method: 'post',
           params: { id : id }
         }).then((res)=>{
             res && res.success && cgList.list_removeRecord(this,id)
        })
      }else if(action=='importLockFile'){
        request({
          url: this.baseUrl+'/action/importLockFile',
          method: 'post',
          params: { id : id }
        }).then((res)=>{
          res && res.success && this.doAction('refresh')
        })
      }
    },
    refresh(){
      this.doAction('refresh')
    }
  },
  mounted() {
        this.timer = setInterval(this.refresh, 30000);
      },
  beforeDestroy() {
        clearInterval(this.timer);
  }
}
