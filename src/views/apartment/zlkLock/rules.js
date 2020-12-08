
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
         modelComm:[
            { required: true, message: vueObject.$t('system.message.needValue') + ':' + vueObject.$t('zlkLock.field.modelComm'), trigger: 'blur' }
         ],
         lockSn:[
            { required: true, message: vueObject.$t('system.message.needValue') + ':' + vueObject.$t('zlkLock.field.lockSn'), trigger: 'blur' },
            {
                validator: (rule, value, callback) => {
                    if (!/^\d{20}$/.test(value)) callback(new Error(vueObject.$t(vueObject.$te('zlkLock.field.lockSnValid') ? 'zlkLock.field.lockSnValid' : 'system.message.errorValue')))
                    else callback()
                },
                trigger: 'blur'
            }
         ],
         lockImei:[
            { required: true, message: vueObject.$t('system.message.needValue') + ':' + vueObject.$t('zlkLock.field.lockImei'), trigger: 'blur' },
            {
                validator: (rule, value, callback) => {
                    if (!/^\d{15}$/.test(value)) callback(new Error(vueObject.$t(vueObject.$te('zlkLock.field.lockImeiValid') ? 'zlkLock.field.lockImeiValid' : 'system.message.errorValue')))
                    else callback()
                },
                trigger: 'blur'
            }
         ],
         lockName:[
            { required: true, message: vueObject.$t('system.message.needValue') + ':' + vueObject.$t('zlkLock.field.lockName'), trigger: 'blur' }
         ],
      }, typeof extendRules == 'function' ? extendRules(vueObject, _=>{ return vueObject.record ? vueObject.record : this_.record} ) : extendRules)
   }
}
