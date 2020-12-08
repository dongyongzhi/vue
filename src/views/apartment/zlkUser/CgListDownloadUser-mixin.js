
import { request } from '@/utils/request'
export default{
  methods: {
    getActionParams(action, options, id) {
        if(action=='downloadUser'){
          return { id : id,
                     roomId: this.fixedQueryRecord.roomId
            }
        }else if(action=='deleteUser'){
          return { id : id,
                     roomId: this.fixedQueryRecord.roomId
            }
        }
    }
  }
}
