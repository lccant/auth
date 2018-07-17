
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User_Role = new Schema({
    user_id: {type: Object, ref: 'users'},
    role_id: {type: Schema.ObjectId, ref: 'roles'}
}, {versionKey: false});

mongoose.model('user_role',User_Role);