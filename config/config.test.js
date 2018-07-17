/**
 * 测试环境
 * Created by xzh 2017-10-30
 */
exports = module.exports = {
  gateway_ip:'http://10.2.15.75:8500',
  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: null,
    db: null,
    family: 4,
    prefix: 'lc-api'
  },
  mysql: {
    type: 'mysql',
    host: '10.2.15.69',
    port: 3306,
    database: 'loraasdb',
    user: 'root',
    passwd: 'Jz_123456'
  },
  mongodb:{
    host: '120.78.220.14',
    database:'base',
    port:27017,
    user:'root',
    passwd:'123456'
  },
  consul:{
    host: '10.2.15.142',
    port: '8500',
    promisify: true
  }
}