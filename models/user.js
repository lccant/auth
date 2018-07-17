const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment')

var token = new Schema({
  token         : {type: String, required: true},
  expire_time   : {type: String, required: true},
  visit_times   : {type: Number, default: 0}
},{
    versionKey: false
})

var User = new Schema({
  userName      : {type: String, required: true},
  name          : {type: String, required: true},
  password      : {type: String, required: true},
  email         : {type: String},
  phone         : {type: String, required: true},
  active        : {type: Boolean, default: false},
  token         : token,
  create_at     : {type: String, default: moment().format('YYYY-MM-DD HH:mm:ss')},
},{
    versionKey: false
})

User.index({user_name:1, create_at:-1});

mongoose.model('users', User);



