import { request } from '@/utils/request'
import cgForm from '@/utils/cgForm'
export default {
    watch: {
        
        'record.type' :{
          handler(n,o){
            this.displayTabs(n)
          },
        } 
        },
    create(){
      this.ignoreRecordChanged = true
    },
    methods: {
        useMixinMethodsFirst() {
            return true
        },displayTabs(type){
          var n=type
          const that=this
          var v1=false;
          var v2=false;
            if(n&&(n.indexOf("D10")!=-1)){
                v1=true
            }else if(n&&(n.indexOf("D30")!=-1)){
                v1=true
                v2=true
            }
            that.displayTabpane(that.$refs.tabs,1,v1)
            that.displayTabpane(that.$refs.tabs,2,v2)
        },       
        disabledAction(btn) {
            return this.isNew
        } ,    
        initialized() {
         this.displayTabs(this.record.type)
        },
        initDynaDict(){
          const that=this
          return this.cgForm.form_request({ 
            formObject: that, 
            method: 'get', 
            params: {
              id: that.record.id
            }, 
            action: 'action/selectParam',
            onSuccess: res => {
              console.log(res)
              if (res && res.success&&res.status) {
                that.record.alignMethod=res.reader.alignMethod,
                that.record.blacklightTime=res.reader.blacklightTime,
                that.record.voiceprompt=res.reader.voiceprompt,
                that.record.menuTime=res.reader.menuTime,
                that.record.wengenform=res.reader.wengenform,
                that.record.wengenOutput=res.reader.wengenOutput,
                that.record.wengenOutArea=res.reader.wengenOutArea
                that.record.regfingerOutTime=res.reader.regfingerOutTime,
                that.record.authfingerOutTime=res.reader.authfingerOutTime
                if(that.record.type.indexOf("D30")!=-1){
                  that.record.wgOrder=res.reader.wgOrder,
                  that.record.relayTime=res.reader.relayTime,
                  that.record.fixedValue=res.reader.fixedValue,
                  that.record.alarmEnable=res.reader.alarmEnable,
                  that.record.openEnable=res.reader.openEnable,
                  that.record.doorbellEnable=res.reader.doorbellEnable,
                  that.record.relayEnable=res.reader.relayEnable,
                  that.record.doorState=res.reader.doorState,
                  that.record.wifiSsid=res.reader.wifiSsid,
                  that.record.wifiPsw=res.reader.wifiPsw
                }
              }
            } 
          }).then(_=>{
            this.recordChanged=false
          })
        }
    }
    , 
    mounted () {
      if(this.record.type.indexOf("D30")!=-1){
        this.dictionary.dictAlignMethod.splice(4,4)
      }else{
        cgForm.form_getDictionary(this)
      }
    }

}