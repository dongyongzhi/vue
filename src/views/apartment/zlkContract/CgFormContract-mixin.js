import cgForm from '@/utils/cgForm'
import { request } from '@/utils/request'
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
            startTime: start,
            endTime: end,
            roomIds: '-1',
            userNo: '-1',
            applyIdType: '身份证',
        }
    },
    submit: function() {
      var start = this.record.startTime
      var end = this.record.endTime
      var password = this.record.password
      var date = new Date();
      var detail = this.contracts.detail
      var applyIdType = this.record.applyIdType
      var applyIdNumber = this.record.applyIdNumber
      if(applyIdType!=null&&applyIdType=='身份证'){
        if (!(/(^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$)/.test(applyIdNumber))) {
          this.$message.error('请输入正确的身份证号码');
          return
         }
      }else if(applyIdType!=null&&applyIdType=='手机号'){
        if (!(/(^1[3|4|5|7|8][0-9]{9}$)/.test(applyIdNumber))) {
          this.$message.error('请输入正确的手机号码');
          return
        }
      }

      if(detail.length>5){
        this.$message.error('订单房间最好不要超过5个');
        return
      }
      for (var key=0;key<detail.length;key++) {
        if(detail[key].roomId==null||detail[key].userNo==null){
          this.$message.error('订单含有未填项');
          return
        }
        for(var i=key+1;i<detail.length;i++){
          if(detail[key].roomId==detail[i].roomId){
            this.$message.error('订单中房间重复');
            return
          }
        }
      }
      this.record.detail = JSON.stringify(this.contracts.detail)
      if(password!=null&&password.length!=0){
        if (!(/(^[0-9]{8,16}$)/.test(password))) {
         this.$message.error('密码必须为8-16位纯数字');
         return
        }
      }
      if(start==null||end==null){
        this.$message.error('请选择时间');
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
    },
    initDynaDict(){
        const that=this
        return this.cgForm.form_request({
          formObject: that,
          method: 'get',
          params: {
            needLoadDictionary:true,
            id: that.record.id,
            silence: true
          },
          action: 'record'
        }).then((res)=>{
          if(res&&res.success){
            this.contracts.detail = JSON.parse(res.data.detail)
          }
        })
      },
   },

    mounted () {
      //cgForm.form_getDictionary(this)
      var formObject = this
      let params = {
        loadDictionaryOnly:true,
        needLoadDictionary:false,
        id: formObject.record.id
      }
      cgForm.form_request({ formObject, method: 'get', params, action: 'record', silence: true })
    }

}
