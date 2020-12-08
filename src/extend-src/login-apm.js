import { hideMenu } from '@/utils/menu'
import store from'@/store/index'
export default {
  doSomethingAfterLogin: function() {
    if(store.state.user.roles.indexOf('apM')>=0){
      setTimeout(_=>{
         hideMenu('/apartment/zlkUser/list')
         hideMenu('/apartment/zlkUser/installList')
      },200)
    }
  }
}