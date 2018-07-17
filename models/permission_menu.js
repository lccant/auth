
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Permission_Menu = new Schema({
    permission_id: {type: Object, ref: 'permissions'},
    menu_id: {type: Object, ref: 'menus'}
})

mongoose.model('permission_menu', Permission_Menu);