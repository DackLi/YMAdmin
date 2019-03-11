module.exports = {
  // 文件输入位置
  publicPath: '/',
  // 输入目录文件夹
  outputDir: 'dist',
  // 设置输出eslint语法错误
  lintOnSave: true,
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'https://www.fastmock.site/mock/82b2f92ab5bfed9bb60c8286a099327f/vue3', // 对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
