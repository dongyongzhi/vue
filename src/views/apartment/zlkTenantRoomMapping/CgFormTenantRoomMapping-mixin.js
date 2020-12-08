import cgForm from '@/utils/cgForm'
export default{
  methods:{
    useMixinMethodsFirst () {
      return true
    },
    newRecord: function() {
      var date = new Date();
      var month=date.getMonth()+1;
      if(month<10){
      	 month="0"+month;
      }
      var day=date.getDate();
      if(day<10){
      	  day="0"+day;
      }
      var hours="00";
      var minutes="00";
      var seconds="00";
      var start=date.getFullYear()+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
      date.setDate(date.getDate()+365);
      if(month<10){
      	  month="0"+month;
       }
      day=date.getDate();
      if(day<10){
      	  day="0"+day;
      }
      var end =date.getFullYear()+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
        return {
            realName: '',
            starttime: start,
            endtime: end,
        }
    },
    submit: function() {
      var start = this.record.starttime
      var end = this.record.endtime
      var date = new Date();
      if(this.record.realName==""){
        this.$message.error('请选择租户');
        return
      }
      if(this.record.roomName==null){
        this.$message.error('请选择房间');
        return
      }
      if(end<=date){
         this.$message.error('时间不合法');
         return
      }
     if(start>=end){
        this.$message.error('时间不合法');
        return
     }
     if (this.recordChanged) cgForm.form_submit(this, 'save',true)
    }
  }
}
