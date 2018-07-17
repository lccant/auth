const moment = require('moment');
const uuid = require('uuid')
moment.locale('zh-cn'); // 使用中文
/**
 * 格式化时间
 * @param  {[Date]} date   [时间]
 * @param  {[string]} format [格式 例如：'YYYY-MM-DD HH:mm:ss']
 * @return {[string]}        [格式化后的时间字符串]
 */
let formatDate = (date, format) => {
  date = moment(date || new Date());
  format = format || 'YYYY-MM-DD HH:mm:ss';
  return date.format(format);
};


/**
 * 添加时间
 * @param {[number]} value [要添加的数值]
 * @param {[string]} type  [要添加的类型 年：y|月：M|日：d|时：h|分：m|秒：s]
 * @param {[object]} date  [时间基数，默认为当前时间]
 */
let addTime = (value, type, date) => {
  date = date || new Date();
  date = moment(date);
  if (isNaN(value)) value = 0;
  type = type || 's';
  switch (type) {
    case 'y':
      date.add(value, 'year');
      break;
    case 'M':
      date.add(value, 'month');
      break;
    case 'd':
      date.add(value, 'day');
      break;
    case 'h':
      date.add(value, 'hour');
      break;
    case 'm':
      date.add(value, 'minute');
      break;
    case 's':
      date.add(value, 'second');
      break;
    case 'ms':
      date.add(value, 'milliseconds');
      break;
  }
  return date.toDate();
}

/**
 * 获取guid
 * @param needSplit 是否需要分隔符
 * @returns {*}
 */
let newGuid = (needSplit)=> {
  var guid = uuid.v4();
  if (!needSplit) {
    guid = guid.replace(/\-/g, '');
  }
  return guid;
};

/**
 * 获取unix时间
 * @return {[type]} [description]
 */
let unix = () => {
  return moment().unix();
}

/**
 * 获取随机字符串
 * @return {[type]} [description]
 */
let getNonceStr = () => {
  return parseInt((Math.random() * 10000000000), 10);
}

/**
 * MD5加密
 * @param inputstr
 * @returns {*}
 */
let md5 = (inputstr) => {
  var md5 = crypto.createHash('md5');
  return md5.update(inputstr).digest('hex');
}

/**
 * sha1加密
 * @param inputstr
 * @returns {string}
 */
let sha1 = (inputstr) => {
  var sha1 = crypto.createHash('sha1');
  return sha1.update(inputstr).digest('hex');
}

/**
 * 按base64加密
 * @param data [加密数据]
 * @param inType [输入参数类型]
 */
let base64Encrypt = (data, inType)=> {
  if (inType && inType.length > 0) {
    var b = new Buffer(data, inType);
  } else {
    var b = new Buffer(data);
  }
  return b.toString('base64');
}

/**
 * 按base64解密
 * @param data [解密数据]
 * @param inType [输出类型]
 */
let base64Decrypt = (data, outType)=> {
  var b = new Buffer(data, 'base64');
  if (outType && outType.length > 0) {
    return b.toString(outType);
  }
  return b.toString();
}

/**
 * aes按ecb模式加密
 * @param data [加密数据]
 * @param key [密钥]
 */
let aesEcbEncrypt = (data, key)=> {
  var buffer = Buffer.from(key, 'hex');
  var cipher = crypto.createCipheriv('aes-128-ecb', buffer, "");
  return cipher.update(data, 'ascii', 'hex');
}

/**
 * aes按ecb模式加密
 * @param data [加密数据]
 * @param key [密钥]
 */
let aesEcbEncryptLatin1 = (data, key)=> {
  var buffer = Buffer.from(key, 'hex');
  var cipher = crypto.createCipheriv('aes-128-ecb', buffer, '');
  return cipher.update(data, 'latin1', 'hex');
}

/**
 * aes按ecb模式解密
 * @param data [解密数据]
 * @param key [密钥]
 */
let aesEcbDecryptLatin1 = (data, key)=> {
  var buffer = Buffer.from(key, 'hex');
  var cipher = crypto.createDecipheriv('aes-128-ecb', buffer, '');
  cipher.setAutoPadding(auto_padding = false);
  return cipher.update(data, 'hex', 'latin1') + cipher.final('latin1'); // + cipher.final('ascii')
}

/**
 * 获取用户ip地址
 * 
 * @param {any} req 
 * @returns 
 * 
 */
let getClientIP = (req)=> {
  var ipAddress;
  var headers = req.headers;
  var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
  forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
  if (!ipAddress) {
      ipAddress = req.connection.remoteAddress;
  }
  return ipAddress.replace('::ffff:', '');
}

const CError = require('./customError');
let checkParams = (keys,params)=>{
    keys.forEach(key => {
      var value = params[key];
      if(value == undefined || value === 'undefined' || value === ''){
          throw new CError(`the value of param ${key} (${value}) is invalid `);
      }
    })
}


exports = module.exports = {
  formatDate,
  addTime,
  unix,
  newGuid,
  getNonceStr,  
  getClientIP,
  md5,
  sha1,
  base64Encrypt,
  base64Decrypt,
  aesEcbEncrypt,
  aesEcbEncryptLatin1,
  aesEcbDecryptLatin1,
  checkParams
}