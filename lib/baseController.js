
const utils = require('../common/utils');
const redis = require('../common/redis');

class BaseController {
    constructor(){
        this.utils = utils;
        this.redis = redis;
        this.respSuccess = respSuccess;
        this.respError = respError;
        this.checkParams = checkParams;
    }
}

function respSuccess(data,msg = ''){
    let rest = {
        success: true,
        data: data,
        msg: msg
    }
    return rest;
}

function respError(msg='返回错误',errcode="-1"){
    let rest = {
        success: false,
        error_code: errcode,
        msg: msg
    }
    return rest;
}

/**
 * 检查参数是否有效
 * @param {Object} data 
 * @param {Array} keys 
 */
function checkParams(data={},keys=[]){

    keys.forEach(key=>{
        let value = data[key];
        if(value === undefined || value === 'undefined' || value === ''){
            throw new CError(`the value of param ${key} (${value}) is invalid `);
        }
    })
}

exports = module.exports = BaseController;