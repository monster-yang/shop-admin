export default {
  data () {
    return {
      rolesData: [
        {
          roleName: '商品管理',
          roleDesc: 'goods'
        }
      ],
      dialogRolesVisible: false,
      // tree 的原本数据 后期 服务器数据赋值
      rightData: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      id: 0
    }
  },
  created () {
    this.renderListData()
    this.loadRightsData()
  },
  methods: {
    // 获取列表信息 list  发ajax
    async renderListData () {
      let v = await this.$axios.get('roles')
      if (v.data.meta.status === 200) {
        this.rolesData = v.data.data
      }
    },
    // 处理索引
    indexMethod (index) {
      return index
    },
    // 请求所有权限列表 发ajax
    async loadRightsData () {
      let v = await this.$axios.get('rights/tree')
      this.rightData = v.data.data
    },
    // 点击出现 对话框
    showDialog (row) {
      this.dialogRolesVisible = true
      this.id = row.id
      let keys = []

      row.children.forEach(v1 => {
        v1.children.forEach(v2 => {
          v2.children.forEach(v3 => {
            keys.push(v3.id)
          })
        })
      })
      console.log(keys)
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(keys)
      })
      console.log(row)
    },
    async setNewRightData () {
      let key1 = this.$refs.tree.getHalfCheckedKeys()
      let key2 = this.$refs.tree.getCheckedKeys()
      // 数组
      let keys = [...key1, ...key2]

      let v = await this.$axios.post(`roles/${this.id}/rights`, {
        rids: keys.join(',')
      })
      if (v.data.meta.status === 200) {
        this.dialogRolesVisible = false

        this.$message({
          message: '分配权限成功',
          type: 'success',
          duration: 800
        })
        this.renderListData()
      }
    }
  }
}
