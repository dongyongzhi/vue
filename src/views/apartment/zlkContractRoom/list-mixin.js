export default {
  data() {
    return {
      contractId: null,
      contractRoomId: null
    }
  },
  methods: {
    useMixinMethodsFirst() {
      return true
    },
    setChildrenParams( row) {
      this.super_setChildrenParams(row)
      if (row) {
        this.contractId = row.contractId
        this.contractRoomId = row.id
      } else {
        this.contractId = null
        this.contractRoomId = null
      }
    }
  }
}
