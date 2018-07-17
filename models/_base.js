const moment = require('moment')

exports = module.exports = function (schema) {
  //数据模型新增lastMod字段
  schema.add({
    lastMod: String
  });
  //保存之前更新lastMod字段
  schema.pre('update', function (next) {
    this.lastMod = moment().format('YYYY-MM-DD HH:mm:ss');
    next()
  })

  //统一添加log方法
  schema.methods.log = function () {
    console.log('this is a log for test');
  }
}