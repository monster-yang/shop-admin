<template>
  <div>
    <el-button
      type="success"
      plain
      @click='showAddCat'
    >添加分类</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">

          <el-tree
            :data="scope.row.children"
            :props="defaultProps"
          ></el-tree>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="cat_deleted"
        label="是否有效"
        width="180"
      >
        <template slot-scope='scope'>
          <span>{{ scope.row.cat_deleted? '否':'是'}}</span>

        </template>
      </el-table-column>
      <el-table-column
        prop="cat_level"
        label="层级"
      >
        <template slot-scope='scope'>
          <span v-if="scope.row.cat_level===0">一层</span>
          <span v-else-if="scope.row.cat_level===1">二层</span>
          <span v-else>三层</span>

        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog
      title="收货地址"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="addCatForm"
        label-width="80px"
      >
        <el-form-item label="活动名称">
          <el-input
            v-model="addCatForm.cat_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动区域">

          <!-- 联机选择器 -->
          <el-cascader
            :options="options"
            clearable
            :props="defaultProps1"
            v-model='addCatForm.cat_pid_arr'
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addCat"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        cat_name: '王小虎',
        cat_deleted: '是',
        cat_level: '0'
      }],
      // 树data
      data: [],
      defaultProps: {
        label: 'cat_name'
      },
      // 联机选择器Data
      options: [{
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      defaultProps1: {
        label: 'cat_name',
        value: 'cat_id'
      },
      dialogFormVisible: false,
      addCatForm: {
        cat_name: '',
        cat_pid_arr: []
      }
    }
  },
  created () {
    this.renderList()
    this.renderList2()
  },
  methods: {
    // 渲染商品列表 发ajax 3层
    async renderList () {
      let v = await this.$axios.get('categories', {
        params: {
          type: 3
        }
      })
      // console.log(v)
      this.tableData = v.data.data
    },
    // 渲染商品列表 发ajax 2层
    async renderList2 () {
      let v = await this.$axios.get('categories', {
        params: {
          type: 2
        }
      })
      console.log(v)
      this.options = v.data.data
    },
    // 点击show对话框
    async showAddCat () {
      this.dialogFormVisible = true
    },
    async addCat () {
      /* eslint-disable */
      let { cat_name, cat_pid_arr } = this.addCatForm
      let v = await this.$axios.post('categories', {
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1],
        cat_name,
        cat_level: 2
      })
      console.log(v)
      if (v.data.meta.status === 201) {
        this.dialogFormVisible = false
        this.$message({
          message: v.data.meta.msg,
          type: 'success',
          duration: 800
        })
        this.renderList()
      }
    }
  }
}
</script>

<style>
</style>
