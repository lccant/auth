
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let Role = new Schema({
    roleName    : {type: String, required:true},
    key         : {type: String, required: true},
    desc        : {type: String},
    is_sys      : {type: Boolean, default: false}
},{ versionKey: false })

Role.index({roleName: 1});

mongoose.model('roles', Role);

// const Model = require('../lib/baseModel');
//
// const model = new Model('roles',{
//     roleName    : {type: String, required:true},
//     key         : {type: String, required: true},
//     desc        : {type: String},
//     is_sys      : {type: Boolean, default: false}
// })
//
// module.exports = model;