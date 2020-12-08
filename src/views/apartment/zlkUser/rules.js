
let extendRules = null
const mixinContext = require.context('.', false, /rules-mixin\.(js|vue)$/)
mixinContext.keys().forEach(key => { extendRules = mixinContext(key).default })
export default  {
   object: null,
   record: null,
   init: function(obj, rec) {
      this.object=obj
      if (rec) this.record=rec
      else if (this.object) this.record = this.object.record
   },
   getRules: function(obj, rec) {
      if (obj) this.init(obj,rec)
      else if (rec) this.record=rec
      const vueObject=this.object
      const this_ = this
      const getRecord = function() {
         if (vueObject.record) return vueObject.record
         else if (this_.record) return this_.record
         else return {}
      }
      return Object.assign({
         realName:[
            { required: true, message: vueObject.$t('system.message.needValue') + ':' + vueObject.$t('zlkUser.field.realName'), trigger: 'blur' },
            {
                validator: (rule, value, callback) => {
                    if (!/^[\u4e00-\u9fa5a-zA-Z]+$/.test(value)) callback(new Error(vueObject.$t(vueObject.$te('zlkUser.field.realNameValid') ? 'zlkUser.field.realNameValid' : 'system.message.errorValue')))
                    else callback()
                },
                trigger: 'blur'
            }
         ],
         idType:[
            { required: true, message: vueObject.$t('system.message.needValue') + ':' + vueObject.$t('zlkUser.field.idType'), trigger: 'blur' }
         ],
         idNumber:[
            { required: true, message: vueObject.$t('system.message.needValue') + ':' + vueObject.$t('zlkUser.field.idNumber'), trigger: 'blur' }
         ],
         area:[
            { required: true, message: vueObject.$t('system.message.needValue') + ':' + vueObject.$t('zlkUser.field.area'), trigger: 'blur' }
         ],
         phone:[
            { required: true, message: vueObject.$t('system.message.needValue') + ':' + vueObject.$t('zlkUser.field.phone'), trigger: 'blur' },
            {
                validator: (rule, value, callback) => {
                    if (!/^1(3|4|5|7|8)\d{9}$/.test(value)) callback(new Error(vueObject.$t(vueObject.$te('zlkUser.field.phoneValid') ? 'zlkUser.field.phoneValid' : 'system.message.errorValue')))
                    else callback()
                },
                trigger: 'blur'
            }
         ],
         vaildTime:[
            { required: true, message: vueObject.$t('system.message.needValue') + ':' + vueObject.$t('zlkUser.field.vaildTime'), trigger: 'blur' }
         ],
         expiredTime:[
            { required: true, message: vueObject.$t('system.message.needValue') + ':' + vueObject.$t('zlkUser.field.expiredTime'), trigger: 'blur' }
         ],
      }, typeof extendRules == 'function' ? extendRules(vueObject, _=>{ return vueObject.record ? vueObject.record : this_.record} ) : extendRules)
   }
}
