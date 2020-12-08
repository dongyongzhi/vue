import cgList from '@/utils/cgList'
import { request,closeProgress } from '@/utils/request'
import cg from '@/utils/cg'
export default{
  methods: {
    useMixinMethodsFirst () {
      return true
    },
     extendActionFilter(action,row){
       if(this.$store.state.user.roles.indexOf('apSM') >= 0){
         //this.additionalActions.splice(0,this.additionalActions.length)
         if(action=='queryUser'||action=='downloadUser'||action=='deleteUser'||action=='deleteQuery'||action=='unfrozen'||action=='oplog'||action=='frozen'){
           return false
         }else{
           return true
         }
       }else{
         return true
       }
    },
    download(options) {
      if (!options) return
      const row = options.row ? options.row : cgList.list_checkSelections(this, false)
      if (row && row.id){
        cg.jump2Url("/apartment/zlkUser/download",{roomId : row.id})
      }
    },
    oplog(options){
		if (!options) return
			  const row = options.row ? options.row : cgList.list_checkSelections(this, false)
			  if (row && row.id){
          cg.jump2Url("/apartment/zlkOplog/list",{roomId : row.id})
			  }
    },
    frozen(options){
		if (!options) return
			  const row = options.row ? options.row : cgList.list_checkSelections(this, false)
			  if (row && row.id){
				this.$router.push({
              path: "/apartment/zlkTenantRoomMapping/frozen",
              query: {
                roomId : row.id
              }
					  })
				 }
    },
    deleteType(options){
    if (!options) return
    	  const row = options.row ? options.row : cgList.list_checkSelections(this, false)
    	  if (row && row.id){
              this.$router.push({
              path: "/apartment/zlkTenantRoomMapping/deleteType",
              query: {
                roomId : row.id
              }
    			  })
    		 }
      },
    queryUser(options){
        if (!options) return
        const row = options.row ? options.row : cgList.list_checkSelections(this, false)
         request({
               url: this.baseUrl+'/action/queryUser',
               method: 'post',
               timeout: 0,
               params: {
                 id : row.id
               }
         }).then((res)=>{
            if(res && res.success){
              cg.jump2Url("/apartment/zlkUserTemp/list",{roomId : row.id})
            }else{
              closeProgress()
            }
         })
      },
      userCache(options){
        if (!options) return
        	  const row = options.row ? options.row : cgList.list_checkSelections(this, false)
        	  if (row && row.id){
              cg.jump2Url("/apartment/zlkUserCache/list",{roomId : row.id})
        	  }
      }


    }

}
