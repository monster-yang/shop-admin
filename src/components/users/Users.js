export default {
  data () {
    return {
      userData: [
        {
          username: '小飞飞',
          email: 'feifie@163.com',
          mobile: '15545485555'
        },
        {
          username: '小飞',
          email: 'feifie@163.com',
          mobile: '15545485555'
        }
      ],
      total: 0,
      pagenum: 1,
      pagesize: 2,
      input3: '',
      dialogAddUserVisible: false,
      adduserform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 规则仅仅只是判断 不限制代码的执行
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: '格式不正确',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '格式不正确',
            trigger: 'blur'
          }
        ]
      },
      dialogEditUserVisible: false,
      edituserform: {
        username: '',
        email: '',
        mobile: '',
        id: 0
      },
      dialogAssignRoleVisible: false,
      AssignRoleform: {
        username: '',
        id: 0,
        rid: ''
      },
      roleData: []
    }
  },

  created () {
    let page = this.$route.params.page
    this.getUserData(page)
    this.loadRoleData()
  },
  methods: {
    // 进页面请求数据
    async getUserData (pagenum = 1, query = '') {
      let config = {
        params: {
          query,
          pagenum,
          pagesize: 2
        }
      }
      let v = await this.$axios.get('users', config)
      this.userData = v.data.data.users
      this.total = v.data.data.total
      this.pagenum = v.data.data.pagenum
      // this.$axios
      //   .get('users', {
      //     params: {
      //       query,
      //       pagenum,
      //       pagesize: 2
      //     }
      //     // headers: {
      //     //   Authorization: localStorage.getItem('token')
      //     // }
      //   })
      //   .then(v => {
      //     this.userData = v.data.data.users
      //     this.total = v.data.data.total
      //     this.pagenum = v.data.data.pagenum
      //   })
    },
    // 点击分页 时传入页码 和input3
    change (page) {
      this.$router.push('/users/' + page)
      this.getUserData(page, this.input3)
    },
    // input输入框 默认找第一页的搜索内容
    search () {
      this.getUserData(1, this.input3)
    },
    // 点击弹出add框
    addShow () {
      this.dialogAddUserVisible = true
    },
    // 添加发送ajxa
    addUser () {
      // 校验拦截
      this.$refs.dialogRef.validate(async valid => {
        // 不成功就拦截
        if (!valid) {
          console.log('格式不正确')
          return false
        }
        let v = await this.$axios.post('users', this.adduserform)
        if (v.data.meta.status === 201) {
          this.dialogAddUserVisible = false
          this.$message({
            message: v.data.meta.msg,
            type: 'success',
            duration: 800
          })
          this.getUserData()
        } else {
          this.$message({
            message: v.data.meta.msg,
            type: 'success',
            duration: 800
          })
        }
        // this.$axios.post('users', this.adduserform).then(v => {
        //   console.log(v)
        // if (v.data.meta.status === 201) {
        //   this.dialogAddUserVisible = false
        //   this.$message({
        //     message: v.data.meta.msg,
        //     type: 'success',
        //     duration: 800
        //   })
        //   this.getUserData()
        // } else {
        //   this.$message({
        //     message: v.data.meta.msg,
        //     type: 'success',
        //     duration: 800
        //   })
        // }
        // })
      })
    },
    // add框消失动画结束事件closed 文档
    dialogClose () {
      // ref绑定form表单resetFields()重置的方法
      this.$refs.dialogRef.resetFields()
    },
    // 删除 发ajax
    async delUser (id) {
      let v = await this.$axios.delete(`users/${id}`)
      if (v.data.meta.status === 200) {
        this.$message({
          message: v.data.meta.msg,
          type: 'success',
          duration: 800
        })
        this.getUserData(this.pagenum)
      }
      // this.$axios.delete(`users/${id}`).then(v => {
      //   if (v.data.meta.status === 200) {
      //     this.$message({
      //       message: v.data.meta.msg,
      //       type: 'success',
      //       duration: 800
      //     })
      //     this.getUserData(this.pagenum)
      //   }
      // })
    },
    // 开关状态改变
    async stateChange (row) {
      const { id, mg_state: mgState } = row
      // 传参不能是mg_state  上面是起别名
      let v = await this.$axios.put(`users/${id}/state/${mgState}`)
      this.$message({
        message: v.data.meta.msg,
        type: 'success',
        duration: 800
      })
      // this.$axios.put(`users/${id}/state/${mgState}`).then(v => {
      //   console.log(v, row)
      //   this.$message({
      //     message: v.data.meta.msg,
      //     type: 'success',
      //     duration: 800
      //   })
      // })
    },
    // 弹出编辑用户对话框
    showEditUser (row) {
      this.dialogEditUserVisible = true
      const { username, email, mobile, id } = row
      this.edituserform.username = username
      this.edituserform.email = email
      this.edituserform.mobile = mobile
      this.edituserform.id = id
    },
    // 编辑用户 发ajax
    async editUser () {
      // 校验拦截   必须在规则内
      // this.$refs.editRef.validate(valid => {
      //   // 不成功就拦截
      //   if (!valid) {
      //     console.log('格式不正确')
      //     return false
      //   }

      // })
      const { email, mobile, id } = this.edituserform
      let v = await this.$axios.put(`users/${id}`, { email, mobile })
      this.$message({
        message: v.data.meta.msg,
        type: 'success',
        duration: 800
      })
      this.dialogEditUserVisible = false
      this.getUserData(this.pagenum)
      // this.$axios
      //   .put(`users/${id}`, {
      //     email,
      //     mobile
      //   })
      //   .then(v => {
      //     this.$message({
      //       message: v.data.meta.msg,
      //       type: 'success',
      //       duration: 800
      //     })
      //     this.dialogEditUserVisible = false
      //     this.getUserData(this.pagenum)
      //   })
    },
    // 加载角色数据 发送ajax
    async loadRoleData () {
      let v = await this.$axios.get('roles')
      this.roleData = v.data.data
      console.log(this.roleData)
    },
    // show 对话框  发送ajax
    async showAssignRole (row) {
      this.dialogAssignRoleVisible = true
      // this.AssignRoleform = row
      // let id = row.id

      const { username, id } = row
      this.AssignRoleform.username = username
      this.AssignRoleform.id = id

      let v = await this.$axios.get(`users/${id}`)
      console.log(v)
      this.AssignRoleform.rid = v.data.data.rid === -1 ? '' : v.data.data.rid
    },
    async AssignRole () {
      const { id, rid } = this.AssignRoleform
      let v = await this.$axios.put(`users/${id}/role`, {
        rid
      })
      console.log(v)
      if (v.data.meta.status === 200) {
        this.dialogAssignRoleVisible = false
        this.$message({
          message: v.data.meta.msg,
          type: 'success',
          duration: 800
        })
        this.loadRoleData(this.pagenum, this.input3)
      }
    }
  }
}
