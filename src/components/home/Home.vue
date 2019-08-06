<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8"><img
            src="../../assets/logo.png"
            alt=""
          ></el-col>
        <el-col :span="8">
          <h1 class="top">电商后台管理系统</h1>
        </el-col>
        <el-col :span="8">
          <p>恭喜上海前端43期月薪50万 <a
              @click.prevent='logout'
              href="#"
            >退出</a></p>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :router="true"
          :default-active="gaoLiang()"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu
            :index="v1.id+''"
            v-for=' v1 in leftData'
            :key=" v1.id"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{v1.authName}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="'/'+v2.path"
                v-for="v2 in v1.children"
                :key="v2.id"
              >{{v2.authName}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script scoped>
export default {
  data () {
    return {
      leftData: []
    }
  },
  created () {
    this.renderLeft()
  },
  methods: {
    async renderLeft () {
      let v = await this.$axios.get('menus')
      console.log(v)
      this.leftData = v.data.data
    },
    async logout () {
      try {
        await this.$confirm('此操作将退出账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        localStorage.removeItem('token')
        this.$message({
          type: 'success',
          message: '成功退出!',
          duration: 800
        })
        this.$router.push('/login')
      } catch (error) {
        this.$message({
          type: 'info',
          message: '取消退出',
          duration: 800
        })
      }
      //   this.$confirm('此操作将退出账户, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     localStorage.removeItem('token')
      //     this.$message({
      //       type: 'success',
      //       message: '成功退出!',
      //       duration: 800
      //     })
      //     this.$router.push('/login')
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '取消退出',
      //       duration: 800
      //     })
      //   })
    },
    gaoLiang () {
      if (this.$router.path === '/goods-add') {
        return '/goods'
      }
      if (this.$route.path.startsWith('/users')) {
        return '/users'
      }
      return this.$router.path
    }
  }
}
</script>

<style scoped>
.el-row {
  background: none;
}

.el-row .top {
  color: #fff;
  text-align: center;
  font-size: 30px;
}
.el-row p {
  text-align: right;
}
.el-row p a {
  color: #daa520;
}

.el-container {
  height: 100%;
}

.el-header {
  background: #b3c1cd;
  line-height: 60px;
}

.el-aside {
  background: #545c64;
}

.el-main {
  background: #eaeef1;
}
</style>
