const path = require('path')

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/less/variable.less')] // 引入全局样式变量文件
    }
  },
  devServer: {
    port: '8089',
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
      }
    }
  }
}