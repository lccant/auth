
const mongoose = require('mongoose');
const cfg = require('../config/index').sys.mongodb

// var dbpath = `mongodb://${cfg.user}:${cfg.passwd}@${cfg.host}:${cfg.port}/${cfg.database}`;
const dbpath = `mongodb://${cfg.host}:${cfg.port}/${cfg.database}`;
mongoose.connect(dbpath,{},function(err){
  if(err){
    console.log(`connect to server [${cfg.host}] error: `, err.message);
    process.exit(1);
  }
})


require('./user.js');
require('./role.js');
require('./user_role')


module.exports = {
  User:       mongoose.model('users'),
  Role:       mongoose.model('roles'),
  User_Role:  mongoose.model('user_role')
}