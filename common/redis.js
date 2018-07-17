const redis = require('redis');
const opts = require('../config/index').sys.redis;

let client = redis.createClient(opts);

client.on('error', (err)=>{
  console.log('Redis 连接失败 ',err);
})

let get = (key,cb)=>{
  return new Promise((resovle, reject)=>{
    client.get(key,(err,data)=>{
      if(err){
        reject(err);
      }else{
        resovle(data);
      }
    })
  })
}

let set = (key, value, time)=>{
  value = JSON.string
  client.setex(key,time,value);
}

exports = module.exports = {
  get,
  set
}