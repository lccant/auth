const util = require('util');

/**
 * 自定义错误类
 * 
 * @class CustomError
 */
class CustomError{
  
  /**
   * CustomError 构造函数.
   * @param {any} ecode 
   * @param {any} message 
   * 
   * @memberOf CustomError
   */
  constructor(message){
    this.code = 'custom_error';
    this.message = message;
  }


  toString(){
    return this.message;
  }
}
//继承Error基类
util.inherits(CustomError,Error);

exports = module.exports = CustomError;