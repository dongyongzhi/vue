export default {
  methods: {
    initialQueryRecord() {
      return Object.assign(this.fixedQueryRecord,{userNo:this.$route.params.userNo} )
    },
  }

}
