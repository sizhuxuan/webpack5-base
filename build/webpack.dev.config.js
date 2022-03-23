// webpack.dev.config.js
const path = require('path') // node.js 的路径模块
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.config')

const devConfig = {
  mode: 'development',

  devtool: 'eval-cheap-module-source-map',

  // 性能优化（tree shaking)
  optimization: {
    usedExports: true,
  },

  devServer: {
    static: {
      // 注意 webpack5 中已用 static 替代 contentBase
      directory: path.join(__dirname, 'dist'),
      publicPath: '/', // 服务器访问静态资源的默认路径，优先级高于 output.publicPath
    },
    compress: true, // 开启 gzip 压缩
    port: 9000, // 自定义端口号
    open: true, // 开启服务器时，自动打开页面
    hot: true, // 开启热更新
  },
}

module.exports = merge(commonConfig, devConfig) // 共用配置与开发配置合并
