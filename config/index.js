/**
 * 配置输出口
 * Created by xzh 2017-10-30
 */

const prod = require('./config.prod')
const dev = require('./config.dev')
const test = require('./config.test')
const env = process.env.NODE_ENV || 'production'
const def = require('./config.default')

exports = module.exports = {
  sys : env == 'production' ? prod : (env == 'development' ? dev : test),
  def : def
}