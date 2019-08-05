<template>
  <div>
    <el-button
      plain
      type="success"
      @click='go2add'
    >添加商品</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="index">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="商品数量"
      >
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="创建时间"
      >
        <template slot-scope='scope'>
          <span>{{scope.row.add_time | dataFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      // 商品数据
      tableData: [{
        goods_name: '1',
        goods_price: '2',
        goods_number: '3',
        add_time: '4'
      }]
    }
  },
  filters: {
    dataFilter (v) {
      return moment(v).format('YYYY-MM-DD')
    }
  },
  created () {
    this.renderList()
  },
  methods: {
    async renderList () {
      let v = await this.$axios.get('goods', {
        params: {
          query: '',
          pagenum: 1,
          pagesize: 5
        }
      })
      console.log(v)
      this.tableData = v.data.data.goods
    },
    go2add () {
      console.log(1)
      this.$router.push('/goods-add')
    }
  }
}
</script>

<style>
</style>
