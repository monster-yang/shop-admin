module.exports = {
  devServer: {
    open: true
  },
  configureWebpack: config => {
    config.externals = {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      axios: 'Axios',
      'element-ui': 'ELEMENT'
    }
  }
}
