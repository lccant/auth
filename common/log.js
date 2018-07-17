/**
 * 文件日志
 * Created by xzh 2017-11-3
 */
const log4js = require('log4js')
const path = require('path')

log4js.configure({
  appenders: {
    info:{type:'file',filename:path.resolve(__dirname,'../logs/info.log')},
    warn:{type:'file',filename:path.resolve(__dirname,'../logs/warn.log')},
    debug:{type:'file',filename:path.resolve(__dirname,'../logs/debug.log')},
    error:{type:'file',filename:path.resolve(__dirname,'../logs/error.log')},
    trace:{type:'file',filename:path.resolve(__dirname,'../logs/trace.log')},
    console:{type:'console'}
  },
  categories: { 
    info:{appenders: ['info','console'], level: 'info' },
    warn:{appenders: ['warn'], level:'warn'},
    debug:{appenders:['debug'],levle:'debug'},
    error:{appenders:['error'],level:'error'},
    trace:{appenders:['trace'],level:'trace'}
  }
})

const log = {
  info(log){
    return log4js.getLogger('info').info(log)
  },
  warn(log){
    return log4js.getLogger('warn').warn(log);
  },
  debug(log){
    return log4js.getLogger('debug').warn(log);
  },
  error(log){
    return log4js.getLogger('error').warn(log);
  },
  trace(log){
    return log4js.getLogger('trace').warn(log);
  }
}

exports = module.exports = log