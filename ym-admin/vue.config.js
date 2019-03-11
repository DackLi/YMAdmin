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
        target: 'https://www.easy-mock.com/mock/5c6525a7d758c80490517aba/vue3', // 对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
