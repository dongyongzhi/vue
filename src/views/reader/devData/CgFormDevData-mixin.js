
export default {
    create() {
        this.ignoreRecordChanged = true
    },
    methods: {
        extendActionFilter(action) {
            return action!='add'
      }
     }
  }