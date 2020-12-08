export default {
  zlkTenantRoomMapping: {
    title: {
      list: 'tenantRoomMapping',
      deleteForm: 'deleteSysUser2Room',
      deleteType: 'deleteType',
      downloadAllForm: 'downloadAllSysUser2Room',
      downloadForm: 'downloadSysUser2Room',
      frozen: 'frozenLock',
      record: 'tenantRoomMapping',
      code: 'ZlkTenantRoomMapping'
    },
    action: {
      downloadSysUser2Room: 'DownloadSysUser2Room',
      deleteSysUser2Room: 'DeleteSysUser2Room',
      deleteType: 'DeleteType',
      frozen: 'Frozen',
      downloadAllSysUser2Room: 'DownloadAllSysUser2Room'
    },
    route: {
      listTag: 'tenantRoomMapping',
      deleteFormTag: 'deleteSysUser2Room',
      deleteTypeTag: 'deleteType',
      downloadAllFormTag: 'downloadAllSysUser2Room',
      downloadFormTag: 'downloadSysUser2Room',
      frozenTag: 'frozenLock',
      recordTag: 'tenantRoomMapping'
    },
    field: {
      id: 'Id',
      contractStatus: 'ContractStatus',
      password: 'Password',
      starttime: 'Starttime',
      endtime: 'Endtime',
      token: 'Token',
      userNameTemp: 'UserNameTemp',
      roomNameTemp: 'RoomNameTemp',
      userNo: 'UserNo',
      roomId: 'RoomId',
      contractId: 'ContractId',
      deleteType: 'DeleteType',
      frozenUserType: 'FrozenUserType',
      frozenType: 'FrozenType'
    }
  }
}
