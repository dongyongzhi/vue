export default {
  cgTable: {
    title: {
      list: '代码定义列表',
      record: '代码定义',
      groupCgTableModule: '表定义',
      groupCgTableImports: '代码定义',
      code: '表单定义'
    },
    action: {
      create: '自动导入数据库表',
      syncConfirm: '同步操作不可逆，可能丢失数据。确定操作码',
      sync: '数据库同步',
      generatorConfirm: '是否需要生成当前选定表的cg代码',
      generator: '代码生成',
      scanCodeConfirm: '将自动扫描修改后的自定义代码，更新数据库数据。确认操作吗',
      scanCode: '自定义代码扫描',
      flowSyncConfirm: '该操作将会删除所有的流程控制表单字段定义，并以主表的定义来替代。',
      flowSync: '流程控制同步',
      fields: '字段获取'
    },
    route: {
      listTag: '代码定义列表',
      recordTag: '代码定义'
    },
    field: {
      id: '主键ID',
      codeValid: '小写字母开头的小写字符数字串,可使用下划线_为连字符',
      code: 'cg代码',
      nameValid: '项目简写_代码定义code',
      name: '数据库表',
      titleValid: '表格大标题',
      title: '标题',
      subPackageValid: '子包，一般为大项目的某一个模块名称，单个词，不允许包含.号',
      subPackage: '子包',
      entityValid: '对应的实体类名称,大写字母开头,仅允许使用字母和数字，要求为code的驼峰表达式',
      entity: 'Entity类名',
      templateValid: '生成的页面风格模板',
      template_0: '',
      template: '模板名',
      trialLicence: '试用licence',
      trialDays: '试用天数',
      actionListValid: '需要生成的主要操作',
      actionList_0: '',
      actionList_1: '',
      actionList_2: '',
      actionList_3: '',
      actionList_4: '',
      actionList_5: '',
      actionList_6: '',
      actionList_7: '',
      actionList_8: '',
      actionList_9: '',
      actionList_10: '',
      actionList: '功能列表',
      imports: 'import列表',
      controllerExtends: 'controller基类以及实现接口',
      pojoImports: 'pojo基类列表',
      pojoExtends: 'pojo实现接口和继承类',
      pojoJavaCode: 'pojo自定义代码',
      creator: '创建人',
      flowDynaFieldsOp: '处理人关联字段',
      flowDynaFieldsCp: '抄送人关联字段',
      projectId: '项目id'
    }
  }
}
