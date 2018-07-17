
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Permission = new Schema({
    name: {type: String, required: true},
    desc: {type: String}
}, { versionKey: false})

mongoose.model('permissions', Permission);