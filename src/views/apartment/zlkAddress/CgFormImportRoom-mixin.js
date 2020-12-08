import { request } from '@/utils/request'
import cgForm from '@/utils/cgForm'
export default{
  methods:{
    useMixinMethodsFirst () {
      return true
    },
    getActionParams(action, options, id) {
        if(action=='importRoomFile'){
          var file= this.blobRecord.roomFile.blob
          if(file==null){       //判空处理
                  this.$message.error('上传文件为空');
                  return;
           }
          if(file.name.toUpperCase().includes(".XLSX")||file.name.toUpperCase().includes(".XLS")){
            let fd = new FormData()
            fd.append("file", file);//将files的内容通过form传参给后端
            const req = {
                url: this.baseUrl + '/' + 'importFile',
                method: 'post',
                data: fd
              }
              request(req).then(res => {
                if(res.success){
                  this.recordChanged = false
                  cgForm.form_close(this);
                }else{
                  this.$message.error(res.message);
                }
              })
          }else{
             this.$message.error('只能上传xlsx或是xls格式文件!');
             return
          }

        }
    }
  },mounted() {
         var a=document.getElementsByClassName('el-button cg-button el-button--primary el-button--medium is-plain')[0]
         a.style.display='none'
    }
}
