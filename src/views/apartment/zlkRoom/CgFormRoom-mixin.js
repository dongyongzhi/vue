export default{
   created(){
      this.$on("submitted",()=>{
        this.$eventBus.$emit("updateDict")
      })
   }
}
