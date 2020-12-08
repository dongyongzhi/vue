export default{
  methods: {
    getActionParams(action, options, id) {
      if(action=='deletePeople'){
        return {
          id : id,
          roomId: this.fixedQueryRecord.roomId
          }
        }
      }
   }
    
}
