import axios from 'axios'
export default {
  data () {
    return {
      userData: [{
        username: '小飞飞',
        email: 'feifie@163.com',
        mobile: '15545485555'
      }, {
        username: '小飞',
        email: 'feifie@163.com',
        mobile: '15545485555'
      }],
      total: 0,
      pagenum: 1,
      pagesize: 2,
      input3: ''

    }
  },
  created () {
    this.getUserData()
  },
  methods: {
    getUserData (pagenum = 1, query = '') {
      axios.get('http://localhost:8888/api/private/v1/users', {
        params: {
          query,
          pagenum,
          pagesize: 2
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(v => {
        this.userData = v.data.data.users
        this.total = v.data.data.total
        this.pagenum = v.data.data.pagenum
      })
    },
    // 点击分页 时传入页码 和input3
    change (page) {
      this.getUserData(page, this.input3)
    },
    // input输入框 默认找第一页的搜索内容
    search () {
      this.getUserData(1, this.input3)
    }
  }
}
