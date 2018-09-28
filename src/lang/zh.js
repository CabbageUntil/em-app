export default {
  route: {
    Dashboard: '首页',
    DashboardVisitor: '游客面板',
    DashboardCreator: '创建者面板',
    DashboardMember: '成员面板',
    joinCom: '加入公司',
    createCom: '创建公司',
    joinComForm: '加入公司表单',
    orgForm: '创建公司表单',
    member: '成员',
    memberList: '成员列表',
    memberViewer: '查看成员',
    memberEdit: '编辑成员',
    memberCalendar: '成员日程',
    apartmentList: '部门管理',
    ScheduleList: '日程管理',
    GrouptList: '群组管理'
  },
  navbar: {
    logOut: '退出登录',
    dashboard: '首页',
    github: '项目地址',
    screenfull: '全屏',
    theme: '换肤'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  panelGroup: {
    joinCompany: '已加入公司数',
    ownCompany: '已拥有公司数'
  },
  permission: {
    roles: '你的权限',
    switchRoles: '切换权限'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  table: {
    searchBar: {
      hint: '搜索',
      search: '开始',
      clear: '清空'
    },
    pageSetting: {
      page: '前往'
    },
    setting: {
      btnText: '设置',
      dialog: {
        title: '设置',
        height: {
          label: '表格高度',
          hint: '请输入'
        },
        pagination: {
          label: '分页样式',
          hint: '请选择',
          type: {
            horizontal: '水平分页',
            vertical: '垂直分页'
          }
        },
        perPage: {
          label: '每页条数',
          hint: '请选择'
        },
        visibleCols: {
          label: '可见列'
        }
      }
    },
    fields: {
      joinCompany: {
        orgName: '公司名',
        entryDate: '加入日期',
        operation: '操作'
      },
      ownCompany: {
        orgName: '公司名',
        createDate: '创建日期',
        operation: '操作'
      },
      existCompany: {
        orgName: '公司名',
        createDate: '创建日期',
        operation: '操作'
      },
      memberList: {
        name: '姓名',
        department: '部门',
        post: '职位',
        education: '学历',
        marital: '婚否',
        sex: '性别',
        birthday: '生日',
        idCardExp: '身份证过期日',
        nativePlace: '籍贯',
        symbolicAnimal: '生肖',
        emergencyUser: '紧急联系人',
        emergencyTelNo: '紧急联系电话',
        applicateDate: '申请加入日期',
        entryDate: '入职日期',
        leaveDate: '离职日期',
        status: '状态',
        operation: '操作'
      },
      apartmentList: {
        deptName: '部门名称',
        deptId: '部门编号',
        orgId: '公司编号',
        parentId: '隶属部门编号',
        deptStatus: '部门状态',
        parentName: '隶属部门名称',
        deptCreateDatetime: '创建日期',
        deptRemoveDatetime: '解散日期',
        operation: '操作'
      },
      scheduleList: {
        agendaId: '日程编号',
        deptName: '部门名称',
        deptId: '部门编号',
        orgId: '公司编号',
        orgName: '公司名称',
        memberId: '员工编号',
        memberName: '员工名称',

        note1: '标题',
        note2: '安排事项',
        note3: '个人备注',
        createDatetime: '日期',
        operation: '操作'
      }
    },
    buttonHint: {
      joinCompany: {
        enter: '进入',
        exit: '退出'
      },
      ownCompany: {
        enter: '进入',
        dissolve: '解散'
      },
      existCompany: {
        join: '加入'
      },
      memberList: {
        add: '增加',
        view: '查看',
        edit: '编辑',
        calendar: '日程',
        remove: '移除'
      },
      apartment: {
        remove: '移除',
        radio: {
          note1: '正常',
          note2: '解散',
          note3: '全部'
        }
      },
      scheduleList: {
        add: '增加',
        view: '查看',
        edit: '编辑',
        remove: '移除',
        radio: {
          all_remove: '批量删除日程',
          edit_schedule: '编辑日程',
          create_schedule: '创建日程',
          schedule_detail: '查看日程'
        }
      }
    },
    buttonAction: {
      exitCompany: {
        message: {
          title: '警告',
          content: '是否要退出公司：%{name}?'
        },
        fail: '退出公司失败',
        success: '退出公司成功'
      },
      dissolveCompany: {
        message: {
          title: '警告',
          content: '是否要解散公司：%{name}?'
        },
        fail: '解散公司失败',
        success: '解散公司成功'
      },
      addMember: {
        message: {
          title: '警告',
          content: '是否要增加成员：%{name}?'
        },
        fail: '增加成员失败',
        success: '增加成员成功'
      },
      removeMember: {
        message: {
          title: '警告',
          content: '是否要移除成员: %{name}?'
        },
        fail: '移除成员失败',
        success: '移除成员成功'
      },
      removeApartment: {
        message: {
          title: '警告',
          content: '是否要移除部门: %{name}?'
        },
        fail: '移除部门失败',
        success: '移除部门成功'
      },
      removeSchedule: {
        message: {
          title: '警告',
          content: '是否要删除日程：%{name}?'
        },
        fail: '移除日程失败！',
        success: '移除日程成功！'
      },
      editSchedule: {
        fail: '编辑日程失败！',
        success: '编辑日程成功！'
      },
      addSchedule:{
        fail: '添加日程失败！',
        success: '添加日程成功！'
      }
    },
    detailRow: {
      memberList: {
        tel: '电话',
        email: '邮箱',
        address: '地址',
        other: '其他'
      },
      existCompany: {
        tel: '电话',
        email: '邮箱',
        address: '地址'
      }
    },
    radio: {
      member: {
        pending: '待审核',
        alreadyJoined: '已加入',
        resigned: '已离职',
        all: '全部'
      }
    }
  },
  form: {
    common: {
      message: {
        confirm: '确认',
        cancel: '取消'
      }
    },
    validate: {
      formatError: '该表单填写格式不正确'
    },
    personalInfo: {
      title: '个人信息表单',
      history: {
        label: '从历史选择',
        select: {
          hint: '选择一个已有的档案'
        }
      },
      validate: {
        notEmpty: '必填字段'
      },
      field: {
        name: {
          label: '姓名',
          hint: '请输入姓名'
        },
        education: {
          label: '学历',
          hint: '学历',
          option: {
            illiterate: '文盲',
            primary: '小学',
            junior: '初中',
            senior: '高中',
            juniorCollege: '大专',
            bachelor: '学士',
            Master: '硕士',
            Doctor: '博士',
            Post: '博士后'
          }
        },
        sex: {
          label: '性别',
          radio: {
            male: '男',
            female: '女'
          }
        },
        marital: {
          label: '婚否',
          radio: {
            single: '未婚',
            married: '已婚'
          }
        },
        birthday: {
          label: '生日',
          hint: '生日'
        },
        IDCardExp: {
          label: '身份证过期日',
          hint: '身份证过期日'
        },
        emergencyContact: {
          label: '紧急联系方式',
          hint: {
            name: '联系人姓名',
            tel: '联系人电话'
          }
        },
        tel: {
          label: '电话',
          hint: {
            label: '电话标签',
            value: '请输入电话'
          }
        },
        email: {
          label: '邮件',
          hint: {
            label: '邮箱标签',
            value: '请输入邮箱'
          }
        },
        address: {
          label: '地址',
          hint: {
            label: '地址标签',
            value: '请输入地址'
          }
        },
        other: {
          label: '其他',
          hint: {
            label: '自定义标签',
            value: '自定义值'
          }
        },
        nativePlace: {
          label: '籍贯',
          hint: '请输入籍贯'
        },
        idCard: {
          label: '身份证号',
          hint: '请输入身份证号'
        },
        blankCard: {
          label: '银行卡号',
          hint: '请输入银行卡号'
        },
        blankName: {
          label: '开户行',
          hint: '请输入开户行'
        },
        symbolicAnimal: {
          label: '生肖',
          hint: '生肖',
          option: {
            Rat: '鼠（子）',
            Ox: '牛（丑）',
            Tiger: '虎（寅）',
            Rabbit: '兔（卯）',
            Dragon: '龙（辰）',
            Snake: '蛇（巳）',
            Horse: '马（午）',
            Goat: '羊（未）',
            Monkey: '猴（申）',
            Rooster: '鸡（酉）',
            Dog: '狗（戌）',
            Pig: '猪（亥）'
          }
        },
        memberStatus: {
          pending: '待审核',
          alreadyJoined: '已加入',
          resigned: '已离职'
        }
      },
      btn: {
        save: '保存',
        next: '下一步',
        confirm: '确认',
        cancel: '取消'
      }
    },
    joinCompany: {
      message: {
        confirm: {
          title: '警告',
          content: '确认加入%{name}？'
        },
        fail: '加入失败',
        success: '加入%{name}成功'
      }
    },
    createCompany: {
      title: '公司表单',
      message: {
        confirm: {
          title: '警告',
          content: '确认创建?'
        },
        fail: '创建公司失败',
        success: '创建公司成功'
      },
      validate: {
        notEmpty: '必填字段',
        duplicate: '该公司已被注册'
      },
      field: {
        name: {
          label: '公司名',
          hint: '请输入公司名'
        },
        tel: {
          label: '电话',
          hint: '请输入联系电话'
        },
        email: {
          label: '邮件',
          hint: '请输入邮件'
        },
        address: {
          label: '地址',
          hint: '请输入地址'
        }
      },
      btn: {
        confirm: '确认',
        reset: '重置',
        cancel: '取消'
      }
    },
    editMember: {
      message: {
        fail: '保存失败',
        success: '保存员工信息成功'
      }
    },
    apartmentInfo: {
      field: {
        status: {
          label: '状态',
          radio: {
            onestatus: '正常',
            twostatus: '已解散'
          }
        }
      }
    }
  },
  dashboard: {
    welcomeText: {
      welcome: '欢迎来到',
      role: {
        creator: '创建人',
        admin: '管理员',
        member: '成员'
      },
      btn: {
        exit: '登出公司'
      }
    }
  },
  datetime: {
    common: {
      datePicker: {
        separator: '至',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        shortcuts: {
          latestWeek: '最近一周',
          lastMonth: '最近一个月',
          lastThreeMonths: '最近三个月'
        }
      }
    }
  },
  // 部门管理页面管理
  apartment: {
    button: {
      apartmentName: '部门名称',
      lead: '请输入部门名称',
      create: '新建',
      search: '查询',
      remove: '解散',
      editInfo: '编辑'
    },
    table: {

    }
  }
}
