<template>
  <el-row
    type='flex'
    justify='center'
    align='middle'
  >
    <el-col :span="8">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm"
          >登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>

export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'

      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录
    submitForm () {
      this.$refs.loginForm.validate(async (valid) => {
        if (!valid) {
          console.log('格式不正确')
          return false
        }
        let v = await this.$axios.post('login', this.loginForm)
        if (v.data.meta.status === 200) {
          console.log(v)
          localStorage.setItem('token', v.data.data.token)
          this.$message({
            message: '恭喜你，登录成功',
            type: 'success',
            duration: 800
          })
          this.$router.push('/home')
        } else {
          this.$message({
            message: '很遗憾，登录失败',
            type: 'error',
            duration: 800
          })
        }
        // this.$axios.post('login', this.loginForm).then(v => {
        //   if (v.data.meta.status === 200) {
        //     console.log(v)
        //     localStorage.setItem('token', v.data.data.token)
        //     this.$message({
        //       message: '恭喜你，登录成功',
        //       type: 'success',
        //       duration: 800
        //     })
        //     this.$router.push('/home')
        //   } else {
        //     this.$message({
        //       message: '很遗憾，登录失败',
        //       type: 'error',
        //       duration: 800
        //     })
        //   }
        // })
      })
    },
    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>
<style scoped>
.el-row {
  height: 100%;
  background-color: #2d494c;
}
.el-form {
  background-color: #fff;
  padding: 50px 50px;
  border-radius: 15px;
}
</style>
