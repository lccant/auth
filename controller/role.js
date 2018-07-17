
const CError = require('../common/customError');
const {User, Role} = require('../models/index');
const BaseController = require('../lib/baseController');
const controller = new BaseController();

module.exports = function role(){
    this.add('init:role', function(msg, respond){
        this.act('role:web', {
            routes:{
                prefix: '/role',
                pin: 'role:*',
                map: {
                    getUserList: { GET: true },
                    addUser: { POST: true },
                    getRoleList: { GET: true },
                    addRole: { POST: true }
                }
            }
        }, respond)
    });

    this.wrap('role:getRoleList', function(msg, respond){
        console.log(msg)
        this.prior(msg,respond);
    })

    this.add('role:getUserList',async (data, respond)=>{
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
    })


    this.add('role:getRoleList',async (data, respond)=>{
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
    })

    this.add('role:addUser', async (data, respond)=>{
        try {
            const required_keys = ['userName','name','password','phone'];
            required_keys.forEach(key=>{
                let value = data[key];
                if(value === undefined || value === 'undefined' || value === ''){
                    throw new CError(`the value of param ${key} (${value}) is invalid `);
                }
            })

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
    })

    this.add('role:addRole', async (data, respond)=>{
        try{
            const required_keys = ['roleName','key'];
            required_keys.forEach(key=>{
                let value = data[key];
                if(value === undefined || value === 'undefined' || value === ''){
                    throw new CError(`the value of param ${key} (${value}) is invalid `);
                }
            })

            let {roleName, key, desc, is_sys} = data;
            desc = desc || '';
            is_sys = is_sys || 0;

            let role = await new Role({roleName,key,desc, is_sys}).save();

            respond(null,controller.respSuccess(true));

        }catch (e) {
            console.log(e.message);
            respond(null,controller.respError(e.code ? e.message : '保存失败'));
        }
    })

}
