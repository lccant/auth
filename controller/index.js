var fs = require('fs');

module.exports = {
  async prepareApi(data,cb){
    try {
      if(!data.controller || !data.action){
        return cb(new Error('missing args'));
      } 
      var controller = data.controller;
      var action = data.action;
      //判断controller文件是否存在
      var ctlPath = __dirname+'/'+controller+'.js';
      if(!fs.existsSync(ctlPath)){
        return cb(new Error('no controller available'))
      }

      //判断action是否是function
      var ctl = require('./'+controller);
      // var params = data.params;
      if(typeof eval('ctl.'+action) != 'function'){
        return cb(new Error('no action avaliable'));
      }

      //执行方法
      var ret =await eval(' ctl.'+action+'(data)');
      cb(null,ret);
    } catch (error) {
      cb(error);
    }
  }
}