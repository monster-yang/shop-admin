<template>
  <div>
    <!-- 步骤条 -->
    <el-steps
      :active="active"
      finish-status="success"
    >
      <el-step
        title="第一步"
        description="基本信息"
      ></el-step>
      <el-step
        title="第二步"
        description="商品图片"
      ></el-step>
      <el-step
        title="第三步"
        description="商品内容"
      ></el-step>
    </el-steps>
    <el-tabs
      :tab-position="tabPosition"
      style="height: 200px;"
    >
      <el-tab-pane label="基本信息">基本信息</el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 2,
      tabPosition: 'left'
    }
  }
}
</script>

<style>
</style>
