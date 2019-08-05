// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      // 步骤条data
      activeIndex: 3,
      // 导航条data
      activeName: 'three',
      // 表单data
      addGoodsForm: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: [],
        goods_introduce: '',
        pics: [],
        resource: true
      },
      // 链级选择器data
      options: [],
      goodsProps: {
        label: 'cat_name',
        value: 'cat_id'
      },
      // 上传图片data
      dialogImageUrl: '',
      dialogVisible: false,
      headers: {
        Authorization: localStorage.getItem('token')
      },
      // 富文本
      content: '<p>example content</p>',
      editorOption: {
        placeholder: '请输入商品介绍'
      }
    }
  },
  created () {
    this.loadCatData()
  },

  methods: {
    // 导航条+步骤条
    tabClick (tab) {
      this.activeIndex = +tab.index + 1
    },
    // 按钮下一步
    next (index, name) {
      this.activeIndex = index
      this.activeName = name
    },
    // 链级 数据获取 发ajax
    async loadCatData () {
      let v = await this.$axios.get('categories', {
        params: {
          type: 3
        }
      })
      console.log(v)
      this.options = v.data.data
    },
    // 上传图片
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    picSuccess (v) {
      // 上传成功 获取路径
      this.addGoodsForm.pics.push({
        pic: v.data.tmp_path
      })
    },
    // 添加商品 发ajax
    async addGoods () {
      /* eslint-disable */
      const {
        goods_name,
        goods_price,
        goods_weight,
        goods_number,
        goods_cat,
        goods_introduce,
        pics
      } = this.addGoodsForm
      let v = await this.$axios.post('goods', {
        goods_name,
        goods_price,
        goods_weight,
        goods_number,
        goods_cat: goods_cat.join(','),
        goods_introduce,
        pics
      })
      this.$message({
        message: v.data.meta.msg,
        type: 'success',
        duration: 800
      })
      this.$router.push('/goods')
    }
  }
}
