/**
 * 公共配置项
 */

// const os = require('os')
// var nwInterfaces = os.networkInterfaces();
// var address = '';
// var type = os.type();
// if (~type.indexOf('Windows')) {
//   address = nwInterfaces['本地连接'][0].address
// } else if (~type.indexOf('Linux')) {
//   address = nwInterfaces['eth0'].address;
// } else {
//   address = '127.0.0.1';
// }
const ADDR = process.env.HOST_IP || '10.2.15.75'; //服务ip地址，由环境变量传递
const HEALTHCHECK_PORT = 3003;                    //健康检查端口
const PRC_PORT = 3004;                            //微服务RPC端口
const SRV_NAME = 'auth';                          //服务名   
const SRV_ID = "auth_" + ADDR;                    //服务ID


exports = module.exports = {
  healthcheck_port:HEALTHCHECK_PORT,
  rpc_port: PRC_PORT,
  systemVersion: '10.0.0.01',
  secret_key: 'lc-auth',
  expire_time: 1200,
  //服务参数
  service_opts: {
    name: SRV_NAME,
    id: SRV_ID,
    tags: ['authservice'],
    address: ADDR,
    port: HEALTHCHECK_PORT,
    check: {
      http: `http://${ADDR}:${HEALTHCHECK_PORT}/health/check`,
      interval: '5s',
      timeout: '5s'
    }
  }
}