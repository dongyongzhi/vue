export default {
  zlkContract: {
    title: {
      list: '合同',
      record: '合同',
      code: '合同'
    },
    action: {
      downloadUserConfirm: '请保证锁与房间建立了联系',
      downloadUser: '下发人员',
      cancelConfirm: '注销订单将删除订单中房间人员在锁中的信息，请唤醒相关锁设备',
      cancel: '注销合同'
    },
    route: {
      listTag: '合同',
      recordTag: '合同'
    },
    field: {
      id: '主键',
      name: '名称',
      contractNumber: '编号',
      roomIds: '房间信息',
      userNo: '人员信息',
      startTime: '开始时间',
      endTime: '结束时间',
      password: '密码',
      contractStatus: '合同状态',
      creator: '创建者',
      createTime: '创建时间',
      isChange: '需下发',
      applyIdNumber: '证件号码',
      applyIdType_0: '身份证',
      applyIdType_1: '手机号',
      applyIdType: '证件类型',
      detail: '详情'
    }
  }
}
