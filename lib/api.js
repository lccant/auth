
const cfg = require('../config/index');
const consul = require('consul')(cfg.sys.consul);

/**
 * 注册服务
 * 
 * by:xzh
 */
let registerService = async () => {
  consul.agent.service.register(cfg.def.service_opts)
    .then(result => {
      console.log('服务注册成功');
    })
    .catch(err => {
      console.log('服务注册失败', err);
    })
}

/**
 * 注销服务
 * 
 * by:xzh
 */
let deregisterService = async () => {
  consul.agent.service.deregister(cfg.def.service_opts.id)
    .then(result => {
      console.log('注销服务成功');
    })
    .catch(err => {
      console.log('注销服务失败', err);
    })
}


/**
 * 获取所有的服务
 * 
 * by:xzh
 */
let getAllServices = async ()=>{
  return consul.agent.services({stale:true,consistent:false});
}


/**
 * 获取健康的服务
 * 
 * @param {string} serviceName  服务名
 * 
 * by:xzh
 */
let getHealthyService = (serviceName)=>{
  return consul.health.service({service:serviceName,passing:true});
}


let getAllServiceHealth = () => consul.agent.checks(); 

module.exports = {
  registerService,
  deregisterService,
  getAllServices,
  getHealthyService,
  getAllServiceHealth
}