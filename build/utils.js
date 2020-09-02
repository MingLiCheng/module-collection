const config = require('./vue.config')
const glob = require('glob')
const env = process.env.NODE_ENV
const vConsolePlugin = require('vconsole-webpack-plugin');

function getSPAEntry() {
  return config.entry()
}

exports.getSpaPage = function () {
  return {
    entry: config.entry(),
    template: config.htmlTemplate(),
    filename: config.viewOutputRoot() + 'index.html',
    chunks: ['chunk-vendors', 'chunk-common', 'index'], // 这里的 chunk-vendors 和 chunk-common是 cli 3.x 自动 提取的
    cdn: config.cdn || {}
  }
}

// 生成 vue.config.js 需要的多页面pages 配置
exports.getPages = function () {
  const map = {}
  const entries = getEntries()
  const htmlTemplates = getHtmlTemplates()
  Object.keys(entries).forEach(key => {
    map[key] = {
      entry: entries[key],
      template: htmlTemplates[key],
      filename: config.viewOutputRoot() + key + '.html',
      title: key,
      cdn: config.cdn || {},
      chunks: ['chunk-vendors', 'chunk-common', key] // 这里的 chunk-vendors 和 chunk-common是 cli 3.x 自动 提取的
    }
  })
  return map
}

const plugins = [
  new vConsolePlugin({
    filter: [], // 需要过滤的入口文件
    enable: true
  })
]

exports.getWebpackConfig = function () {
  return {

  }
}

// 获取多页面的 入口实例
function getEntries() {
  const map = {}
  const entryFiles = glob.sync(config.entry(), { matchBase: true })
  for (let i = 0; i < entryFiles.length; i++) {
    // 截取文件夹的名字
    const moduleName = entryFiles[i].substring(entryFiles[i].indexOf('views/') + 6, entryFiles[i].lastIndexOf('/'))
    map[moduleName] = entryFiles[i]
  }
  return map
}
// 获取多页面的  HtmlTemplate
function getHtmlTemplates() {
  const map = {}
  const entryFiles = glob.sync(config.htmlTemplate(), { matchBase: true })
  for (let i = 0; i < entryFiles.length; i++) {
    // 截取文件名字
    const moduleName = entryFiles[i].substring(entryFiles[i].indexOf('views/') + 6, entryFiles[i].lastIndexOf('/'))
    map[moduleName] = entryFiles[i]
  }
  return map
}