export default {
  route: {
    Dashboard: 'Dashboard',
    DashboardVisitor: 'Visitor Dashboard',
    DashboardCreator: 'Creator Dashboard',
    DashboardMember: 'Member Dashboard',
    joinCom: 'Join Company',
    createCom: 'Create Company',
    joinComForm: 'Join Company Form',
    orgForm: 'Create Company Form',
    member: 'Member',
    memberList: 'Member List',
    memberViewer: 'View Member',
    memberEdit: 'Edit Member',
    memberCalendar: 'Member Calendar',
    apartmentList: 'Apartment List',
    ScheduleList: 'ScheduleList',
    GroupInfo: 'GroupManager',
    MemberReview: 'MemberReview',
    serverList: 'serverList',
    groupMemberList: 'groupMemberList',
    ownServerList: 'ownServerList'
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard',
    github: 'Github',
    screenfull: 'screenfull',
    theme: 'theme'
  },
  login: {
    title: 'Login Form',
    logIn: 'Log in',
    username: 'Username',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  panelGroup: {
    joinCompany: 'joined companies',
    ownCompany: 'owned companies'
  },
  permission: {
    roles: 'Your roles',
    switchRoles: 'Switch roles'
  },
  theme: {
    change: 'Theme change',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  table: {
    searchBar: {
      hint: 'search',
      search: 'go',
      clear: 'clear'
    },
    setting: {
      btnText: 'setting',
      dialog: {
        title: 'setting',
        height: {
          label: 'table height',
          hint: 'please input'
        },
        pagination: {
          label: 'pagination type',
          hint: 'please select',
          type: {
            horizontal: 'horizontal',
            vertical: 'vertical'
          }
        },
        perPage: {
          label: 'per page number',
          hint: 'please select'
        },
        visibleCols: {
          label: 'visible columns'
        }
      }
    },
    fields: {
      joinCompany: {
        orgName: 'company name',
        entryDate: 'entry date',
        operation: 'operation'
      },
      ownCompany: {
        orgName: 'company name',
        createDate: 'create date',
        operation: 'operation'
      },
      existCompany: {
        orgName: 'company name',
        createDate: 'create date',
        operation: 'operation'
      },
      memberList: {
        name: 'name',
        department: 'department',
        post: 'post',
        education: 'education',
        marital: 'marital',
        sex: 'sex',
        birthday: 'birthday',
        idCardExp: 'expire date of ID Card',
        nativePlace: 'native place',
        symbolicAnimal: 'symbolic animal',
        emergencyUser: 'emergency user',
        emergencyTelNo: 'emergency TelNo',
        applicateDate: 'applicate date',
        entryDate: 'entry date',
        leaveDate: 'leaveDate',
        status: 'status',
        operation: 'operation'
      },
      apartmentList: {
        deptName: 'departmentName',
        deptId: 'departmentID',
        orgId: 'companyID',
        parentId: 'parent of ID',
        deptStatus: 'Status',
        parentName: 'parentName',
        deptCreateDatetime: 'create of date',
        deptRemoveDatetime: 'remove of date',
        operation: 'operation'
      },
      scheduleList: {
        agendaId: 'agenda of ID',
        deptName: 'departmentName',
        deptId: 'departmentID',
        orgId: 'companyID',
        orgName: 'companyName',
        memberId: 'member of ID',
        memberName: 'memberName',
        note1: 'Title',
        note2: 'Class of Arrangement',
        note3: 'Personal of Arrangement',
        createDatetime: 'CreateDatetime',
        operation: 'operation'
      }
    },
    buttonHint: {
      joinCompany: {
        enter: 'enter',
        exit: 'exit'
      },
      ownCompany: {
        enter: 'enter',
        dissolve: 'dissolve'
      },
      existCompany: {
        join: 'join'
      },
      memberList: {
        add: 'add',
        view: 'view',
        edit: 'edit',
        calendar: 'calendar',
        remove: 'remove',
        server_view: 'server of view',
        assign_server: 'assign server'
      },
      apartment: {
        remove: 'remove',
        radio: {
          note1: 'normal',
          note2: 'removed',
          note3: 'all'
        }
      },
      scheduleList: {
        add: 'add',
        view: 'view',
        edit: 'edit',
        remove: 'remove',
        radio: {
          all_remove: 'delect_more',
          create_schedule: 'createSchedule',
          edit_schedule: 'editSchedule',
          schedule_detail: 'Schedule of Detail'
        }
      }
    },
    buttonAction: {
      exitCompany: {
        message: {
          title: 'WARNING',
          content: 'Confirm to exit company: %{name}?'
        },
        fail: 'faied to exit company',
        success: 'succeed in exiting company'
      },
      dissolveCompany: {
        message: {
          title: 'WARNING',
          content: 'Confirm to dissolve company: %{name}?'
        },
        fail: 'faied to dissolve company',
        success: 'succeed in dissolving company'
      },
      addMember: {
        message: {
          title: 'WARNING',
          content: 'Confirm to add member: %{name}?'
        },
        fail: 'faied to add member',
        success: 'succeed in adding member'
      },
      removeMember: {
        message: {
          title: 'WARNING',
          content: 'Confirm to remove member: %{name}?'
        },
        fail: 'faied to remove member',
        success: 'succeed in removing member'
      },
      removeApartment: {
        message: {
          title: 'WARNING',
          content: 'Confirm to remove apartment: %{name}?'
        },
        fail: 'faied to remove apartment',
        success: 'succeed in removing apartment'
      },
      removeSchedule: {
        message: {
          title: 'WARNING',
          content: 'Confirm to remove schedule: %{name}?'
        },
        fail: 'faied to remove schedule!',
        success: 'succeed in removing schedule!'
      },
      addSchedule: {
        fail: 'faied to add schedule!',
        success: 'succeed in add schedule!'
      }
    },
    detailRow: {
      memberList: {
        tel: 'TEL',
        email: 'email',
        address: 'address',
        other: 'other'
      },
      existCompany: {
        tel: 'TEL',
        email: 'email',
        address: 'address'
      }
    },
    radio: {
      member: {
        pending: 'pending',
        alreadyJoined: 'aleady joined',
        resigned: 'resigned',
        all: 'all'
      }
    }
  },
  form: {
    common: {
      message: {
        confirm: 'confirm',
        cancel: 'cancel'
      }
    },
    validate: {
      formatError: 'the format of this form is incorrect'
    },
    personalInfo: {
      title: 'personal info form',
      history: {
        label: 'choose from history',
        select: {
          hint: 'choose one existed archive'
        }
      },
      validate: {
        notEmpty: 'Must filled-in subjects'
      },
      field: {
        name: {
          label: 'name',
          hint: 'please input your name'
        },
        education: {
          label: 'education',
          hint: 'education',
          option: {
            illiterate: 'illiterate',
            primary: 'primary',
            junior: 'junior',
            senior: 'senior',
            juniorCollege: 'juniorCollege',
            bachelor: 'bachelor',
            Master: 'Master',
            Doctor: 'Doctor',
            Post: 'Post'
          }
        },
        sex: {
          label: 'sex',
          radio: {
            male: 'male',
            female: 'female'
          }
        },
        marital: {
          label: 'marital',
          radio: {
            single: 'single',
            married: 'married'
          }
        },
        birthday: {
          label: 'birthday',
          hint: 'birthday'
        },
        IDCardExp: {
          label: 'IDCardExp',
          hint: 'expire date of ID Card'
        },
        emergencyContact: {
          label: 'emergencyContact',
          hint: {
            name: 'name',
            tel: 'TelNo'
          }
        },
        tel: {
          label: 'TEL',
          hint: {
            label: 'TEL label',
            value: 'please input your TelNo'
          }
        },
        email: {
          label: 'email',
          hint: {
            label: 'email label',
            value: 'please input your email'
          }
        },
        address: {
          label: 'address',
          hint: {
            label: 'address label',
            value: 'please input your address'
          }
        },
        other: {
          label: 'other',
          hint: {
            label: 'custom label',
            value: 'custom value'
          }
        },
        nativePlace: {
          label: 'nativePlace',
          hint: 'please input your native place'
        },
        idCard: {
          label: 'IDCard',
          hint: 'please input your idCard'
        },
        blankCard: {
          label: 'blankCard',
          hint: 'please input your blankCard'
        },
        blankName: {
          label: 'blankName',
          hint: 'please input your blankName'
        },
        symbolicAnimal: {
          label: 'symbolicAnimal',
          hint: 'symbolic animal',
          option: {
            Rat: 'Rat',
            Ox: 'Ox',
            Tiger: 'Tiger',
            Rabbit: 'Rabbit',
            Dragon: 'Dragon',
            Snake: 'Snake',
            Horse: 'Horse',
            Goat: 'Goat',
            Monkey: 'Monkey',
            Rooster: 'Rooster',
            Dog: 'Dog',
            Pig: 'Pig'
          }
        },
        memberStatus: {
          pending: 'pending',
          alreadyJoined: 'alreadyJoined',
          resigned: 'resigned'
        }
      },
      btn: {
        save: 'save',
        next: 'next',
        confirm: 'confirm',
        cancel: 'cancel'
      }
    },
    joinCompany: {
      message: {
        confirm: {
          title: 'WARNING',
          content: 'Comfirm to join %{name}?'
        },
        fail: 'failed to join',
        success: 'succeed in joining %{name}'
      }
    },
    createCompany: {
      title: 'company form',
      message: {
        confirm: {
          title: 'WARNING',
          content: 'Comfirm to create?'
        },
        fail: 'failed to create',
        success: 'succeed in creating company'
      },
      validate: {
        notEmpty: 'Must filled-in subjects',
        duplicate: 'the name has been registered'
      },
      field: {
        name: {
          label: 'name',
          hint: "please input company's name"
        },
        tel: {
          label: 'TEL',
          hint: "please input company's TelNo"
        },
        email: {
          label: 'email',
          hint: "please input company's email"
        },
        address: {
          label: 'address',
          hint: "please input company's address"
        }
      },
      btn: {
        confirm: 'confirm',
        reset: 'reset',
        cancel: 'cancel'
      }
    },
    editMember: {
      message: {
        fail: 'failed to save',
        success: 'succeed in saving member profile'
      }
    },
    apartmentInfo: {
      field: {
        status: {
          label: 'status',
          radio: {
            onestatus: 'normal',
            twostatus: 'removed'
          }
        }
      }
    }
  },
  dashboard: {
    welcomeText: {
      welcome: 'welcome to',
      role: {
        creator: 'creator',
        admin: 'admin',
        member: 'member',
        groupMember: 'groupMember',
        groupLeader: 'groupLeader'
      },
      btn: {
        exit: 'logout company',
        exit1: 'Logout Group'
      }
    }
  },
  datetime: {
    common: {
      datePicker: {
        separator: 'to',
        startPlaceholder: 'start date',
        endPlaceholder: 'end date',
        shortcuts: {
          latestWeek: 'Latest Week',
          lastMonth: 'Last Month',
          lastThreeMonths: 'Last Three Months'
        }
      }
    }
  },
  // Department management webpage
  apartment: {
    button: {
      apartmentName: 'apartName',
      lead: 'please input apartName!',
      create: 'create',
      search: 'search',
      remove: 'remove',
      editInfo: 'edit'
    }
  }
}
