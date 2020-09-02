const Utils = require('./build/utils')
const config = require('./build/vue.config')
const vConsolePlugin = require('vconsole-webpack-plugin');

const vueConfig = {
  publicPath: config.assetsPublicPath,
  outputDir: config.assetsRoot,
  assetsDir: config.assetsSubDirectory,
  // indexPath: 'views/index.html', //指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  // filenameHashing: false, // 文件名 hash
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false, // 生产环境关闭 sourceMap
  pages: config.spaMode ? { index: Utils.getSpaPage() } : Utils.getPages(),
  configureWebpack: config => {
    config.externals = {
      //包名 ： 全局变量
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex'
    }
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...

    } else {
      // 为开发环境修改配置...
      config.plugins = [
        ...config.plugins,
        new vConsolePlugin({
          filter: [], // 需要过滤的入口文件
          enable: true
        })
      ]
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    } else {
    }
    // config.module
    //   .rule('images')
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader') // 图片压缩loader
    // 公共资源提取，
    config.optimization.splitChunks({
      cacheGroups: {
        vendors: {
          chunks: 'initial',
          name: 'chunk-vendors',
          // minSize: 0,
          minChunks: 1,
          test: /node_modules/,
          priority: -10,
        },
        common: {
          chunks: 'initial',
          name: 'chunk-common',
          minSize: 0, // 当模块大于minSize 进行分割， 默认是30K
          minChunks: 2, // 被公共引用的次数
          priority: -20,
          reuseExistingChunk: true // 重复使用已经存在的块
        }
      }
    });
  }
}
module.exports = vueConfig;