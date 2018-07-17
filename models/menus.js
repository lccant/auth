

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Menus = new Schema({
    name: {type: String, required: true},
    cName: {type: String, required: true},
    parent_id: {type: Schema.ObjectId},
    url: {type: String},
    icon: {type: String},
    order: {type: Number}
},{versionKey: false})

mongoose.model("menus", Menus);