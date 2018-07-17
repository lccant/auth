const CError = require('../common/customError');
const {User, Role, User_Role} = require('../models/index');
const BaseController = require('../lib/baseController');
const controller = new BaseController();
const { checkParams } = require('../common/utils')
controller.postAddRole = async (data,respond)=>{
    try{
        controller.checkParams(data, ['roleName', 'key'])
        
        let {roleName, key, desc = '', is_sys = 0} = data;

        let role = await new Role({roleName,key,desc, is_sys}).save();

        respond(null,controller.respSuccess(role));

    }catch (e) {
        console.log(e.message);
        respond(null,controller.respError(e.code ? e.message : '保存失败'));
    }
}

controller.getRoleList = async (data,respond)=>{
    try{
        let {roleName, p , pageSize} = data;
        p = p || 1;
        pageSize = pageSize || 10;

        let condition = {};
        if(roleName){
            let reg = new RegExp(roleName, 'i');
            condition.roleName =  {$regex: reg};
        }

        let count = await Role.find(condition).count().exec();
        let roles = await Role.find(condition).skip((p-1)*pageSize).limit(pageSize).exec();
        respond(null,controller.respSuccess({count: count, data: roles}));
    }catch(e){
        console.log(e.message);
        respond(null,controller.respError(e.code ? e.message : '查询失败'));
    }
}


controller.postAddUser = async (data,respond)=>{
    try {
        controller.checkParams(data, ['userName','name','password','phone']);

        let {userName, name, password, email, phone} = data;

        email = email || '';

        let user = await new User({
            userName,
            name,
            password,
            email,
            phone
        }).save();

        delete user.password;

        respond(null,ontroller.respSuccess(user));

    }catch(e){
        console.log(e.message);
        respond(null,controller.respError(e.code ? e.message : '保存失败'));
    }
}

controller.getUserList = async (data,respond) => {
    try {
        let {userName, p, pageSize} = data;
        p = p || 1;
        pageSize = pageSize || 10;

        let condition = {};
        if(userName){
            let reg = new RegExp(userName,'i');
            condition.$or = [
                {userName: {$regex: reg}},
                {phone: {$regex: reg}}
            ]
        }
        let start = new Date().getTime();
        let count = await User.count(condition).exec();
        let users = await User.find(condition).skip((p-1)*pageSize).limit(pageSize).exec();
        console.log(new Date().getTime() - start);
        respond(null,controller.respSuccess({count: count,data: users}));
    }catch (e){
        respond(null,controller.respError(e.code ? e.message : '查询失败'));
    }
}

controller.getUserById = async (data, respond)=>{
    try {
        controllercheckParams(data,['user_id']);
        let {user_id} = data;

        let user = await User.findById(user_id).exec();

        respond(null, controller.respSuccess(user))

    }catch(e){
        respond(null,controller.respError(e.code ? e.message : '查询失败'));
    }
}

controller.postUpdateUserRole = async (data, respond)=>{
    try{
        controller.checkParams(data, ['user_id', 'role_ids']);
        let { user_id, role_ids } = data;
        role_ids = role_ids.split(',');

        let delRet = await User_Role.deleteMany({user_id}).exec();
        let userRoles = [];
        role_ids.forEach(role_id => userRoles.push({
            user_id,
            role_id
        }))
        let insertRet = await User_Role.insertMany(userRoles)

        respond(null,controller.respSuccess(insertRet));

    }catch (e) {
        respond(null,controller.respError(e.code ? e.message : '更新失败'));
    }
}

controller.getUserRole = async (data, respond) => {
    try {
        controller.checkParams(data, ['user_id']);
        let {user_id} = data;
        // let userRole = await User_Role.findOne({user_id}).populate('user_id').populate('role_id').exec();
        let userRole = await User_Role.findOne({user_id}).exec();
        userRole = userRole.toJSON();
        delete userRole.user_id;
        console.log(userRole.user_id);

        // let userRole = await User_Role.find({}).populate('user_id').populate('role_id').exec();

        respond(null, controller.respSuccess(userRole));

    }catch (e) {
        respond(null,controller.respError(e.code ? e.message : '查询失败'));
    }
}




exports = module.exports = controller;