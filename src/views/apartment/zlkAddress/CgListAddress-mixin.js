export default{
  mounted() {
    if(this.$store.state.user.roles.indexOf('apM') >= 0){
      this.additionalActions.splice(0,this.additionalActions.length)
    }
  }
}