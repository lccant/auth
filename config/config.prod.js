/**
 * 正式环境
 * Created by xzh 2017-10-30
 */
exports = module.exports = {
  gateway_ip:'http://103.229.213.170:8500',
  redis: {
    host: '103.229.213.170',
    port: 6379,
    // password: null,
    // db: null,
    family: 4,
    prefix: 'lc-api'
  },
  mysql: {
    type: 'mysql',
    host: '103.229.213.170',
    port: 3306,
    database: 'loraasdb',
    user: 'root',
    passwd: 'Jz_123456'
  },
  mongodb:{
    host: '103.229.213.170',
    database:'base',
    port:27017,
    user:'root',
    passwd:'123456'
  },
  consul:{
    host: '103.229.213.170',
    port: '8500',
    promisify: true
  }
}