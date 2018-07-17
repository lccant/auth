/**
 * Created by xzh on 2017/12/27.
 */

var uuid = require('uuid'),
  moment = require('moment');
var _ = require('lodash');
var crypto = require('crypto');

moment.locale('zh-cn'); // 使用中文

/**
 * 格式化时间
 * @param  {[Date]} date   [时间]
 * @param  {[string]} format [格式 例如：'YYYY-MM-DD HH:mm:ss']
 * @return {[string]}        [格式化后的时间字符串]
 */
exports.formatDate = function (date, format) {
  format = format || 'YYYY-MM-DD HH:mm:ss';
  date = moment(date);
  return date.format(format);
};



/**
 * 获取两个时间之间的所有日期时间，以小时间隔
 * 
 * @param {any} begin 
 * @param {any} end 
 * @returns 所有时间数组
 * 
 * author:  xzh
 * date: 2017-12-27
 */
exports.getAllDaysByHour = function (begin, end) {
  var ab = begin.split("-");
  var ae = end.split("-");
  var db = new Date();
  db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
  var de = new Date();
  de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
  var unixDb = db.getTime();
  var unixDe = de.getTime();
  var allDays = [];
  for (var k = unixDb; k <= unixDe;) {
    allDays.push(exports.formatDate(k, 'YYYYMMDDHH'));
    k = k + 60 * 60 * 1000;
  }
  return allDays;
}
/**
 * 获取两个时间之间的所有日期时间，以天间隔
 * 
 * @param {any} begin 
 * @param {any} end 
 * @returns 所有时间数组
 * author:  xzh
 * date: 2017-12-27
 */
exports.getAllDaysByHour = function (begin, end) {
  var ab = begin.split("-");
  var ae = end.split("-");
  var db = new Date();
  db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
  var de = new Date();
  de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
  var unixDb = db.getTime();
  var unixDe = de.getTime();
  var allDays = [];
  for (var k = unixDb; k <= unixDe;) {
    allDays.push(exports.formatDate(k, 'YYYYMMDDHH'));
    k = k + 60 * 60 * 1000;
  }
  return allDays;
}
/**
 * 获取两个时间之间的所有日期时间，以天间隔
 * @param {any} begin 
 * @param {any} end 
 * @returns 所有时间数组
 * author:  zh
 * date: 2017-11-17
 */
exports.getDayAll = function (begin, end) {
  var dateAllArr = new Array();
  var ab = begin.split("-");
  var ae = end.split("-");
  var db = new Date();
  db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
  var de = new Date();
  de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
  var unixDb = db.getTime();
  var unixDe = de.getTime();
  for (var k = unixDb; k <= unixDe;) {
    dateAllArr.push(exports.formatDate(k, 'MM-DD'));
    k = k + 24 * 60 * 60 * 1000;
  }
  return dateAllArr;
}
/**
 * 获取两个时间之间的所有日期时间，以月间隔
 * @param {any} begin 
 * @param {any} end 
 * @returns 所有时间数组
 * author:  zh
 * date: 2017-11-17
 */
exports.getMonthAll = function (begin, end) {
  var d1 = begin;
  var d2 = end;
  var dateArry = new Array();
  var s1 = d1.split("-");
  var s2 = d2.split("-");
  var mCount = 0;
  if (parseInt(s1[0]) < parseInt(s2[0])) {
    mCount = (parseInt(s2[0]) - parseInt(s1[0])) * 12 + parseInt(s2[1]) - parseInt(s1[1]) + 1;
  } else {
    mCount = parseInt(s2[1]) - parseInt(s1[1]) + 1;
  }
  if (mCount > 0) {
    var startM = parseInt(s1[1]);
    var startY = parseInt(s1[0].substr(s1[0].length - 2));
    for (var i = 0; i < mCount; i++) {
      if (startM < 12) {
        dateArry[i] = startY + "-" + (startM > 9 ? startM : "0" + startM);
        startM += 1;
      } else {
        dateArry[i] = startY + "-" + (startM > 9 ? startM : "0" + startM);
        startM = 1;
        startY += 1;
      }
    }
  }
  return dateArry;
}
/**
 * 获取两个时间之间的所有日期时间，以年间隔
 * @param {any} begin 
 * @param {any} end 
 * @returns 所有时间数组
 * author:  zh
 * date: 2017-11-17
 */
exports.getYearAll = function (begin, end) {
  var d1 = begin;
  var d2 = end;
  var dateArry = new Array();
  var s1 = d1.split("-");
  var s2 = d2.split("-");
  var mYearCount = parseInt(s2[0]) - parseInt(s1[0]) + 1;
  var startY = parseInt(s1[0].substr(s1[0].length - 2));
  for (var i = 0; i < mYearCount; i++) {
    dateArry[i] = startY;
    startY += 1;
  }
  return dateArry;
}

/**
 * 添加时间
 * @param {[number]} value [要添加的数值]
 * @param {[string]} type  [要添加的类型 年：y|月：M|日：d|时：h|分：m|秒：s]
 * @param {[object]} date  [时间基数，默认为当前时间]
 */
exports.addTime = function (value, type, date) {
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
 * 获取unix时间
 * @return {[type]} [description]
 */
exports.unix = function () {
  return moment().unix();
}

/**
 * 获取当月的最后一天
 */
exports.getMouthLastDay = function (date) {
  var dateNow = new Date();
  date = date || dateNow;
  return moment(date).endOf('month').format('YYYY-MM-DD');
}

/**
 * 获取guid
 * @param needSplit 是否需要分隔符
 * @returns {*}
 */
exports.newGuid_v1 = function (needSplit) {
  var guid = '';
  for (var i = 1; i <= 32; i++) {
    var n = Math.floor(Math.round() * 16.0).toString(16);
    guid += n;
    if (needSplit && (i == 8 || i == 12 || i == 16 || i == 20)) {
      guid += '-';
    }
  }
  return guid;
};

/**
 * 获取guid
 * @param needSplit 是否需要分隔符
 * @returns {*}
 */
exports.newGuid_v2 = function (needSplit) {
  var guid = uuid.v4();
  if (!needSplit) {
    guid = guid.replace(/\-/g, '');
  }
  return guid;
};


/**
 * 将json数据转换为属性结构
 * @param jsonobj
 * @returns {Array}
 */
exports.convertToTree = function (jsonobj) {
  var result = {};
  result.root = [];
  var root = jsonobj;
  for (var i = 0; i < root.length; i++) {
    var ri = root[i];
    ri.text = ri.name;
    for (var j = 0; j < root.length; j++) {
      root[j].leaf = true;
      for (var k = 0; k < root.length; k++) {
        if (root[k].preFormID == root[j].formID) {
          root[j].leaf = false;
          break;
        }
      }
    }

    if (ri.preFormID != null && ri.preFormID != 'null' && ri.preFormID != -1 && ri.preFormID != -2) {
      for (var j = 0; j < root.length; j++) {
        var rj = root[j];
        if (rj.formID == ri.preFormID) {
          rj.children = !rj.children ? [] : rj.children;
          rj.children.push(ri);
          break;
        }
      }
    }
    if (ri.preFormID == null || ri.preFormID == 'null' || ri.preFormID == -1 || ri.preFormID == -2) {
      result.root.push(ri);
    }
  }

  return result.root;
}

/**
 * MD5加密
 * @param inputstr
 * @returns {*}
 */
exports.md5 = function (inputstr) {
  var md5 = crypto.createHash('md5');
  return md5.update(inputstr).digest('hex');
}


/**
 * sha1加密
 * @param inputstr
 * @returns {string}
 */
exports.sha1 = function (inputstr) {
  var sha1 = crypto.createHash('sha1');
  return sha1.update(inputstr).digest('hex');
}


/**
 * 获取随机字符串
 * @return {[type]} [description]
 */
exports.getNonceStr = function () {
  return parseInt((Math.random() * 10000000000), 10);
}


/**
 * HTML 编码
 * @param {[type]} str [description]
 */
exports.HTMLEnCode = function (str) {
  var s = "";
  if (str.length == 0) return "";
  s = str.replace(/&/g, "&gt;");
  s = s.replace(/</g, "&lt;");
  s = s.replace(/>/g, "&gt;");
  s = s.replace(/ /g, "&nbsp;");
  s = s.replace(/\'/g, "'");
  s = s.replace(/\"/g, "&quot;");
  s = s.replace(/\n/g, "<br>");
  return s;
}

/**
 * HTML解码
 * @param {[type]} str [description]
 */
exports.HTMLDeCode = function (str) {
  var s = "";
  if (str.length == 0) return "";
  s = str.replace(/&gt;/g, "&");
  s = s.replace(/&lt;/g, "<");
  s = s.replace(/&gt;/g, ">");
  s = s.replace(/&nbsp;/g, "");
  s = s.replace(/'/g, "\'");
  s = s.replace(/&quot;/g, "\"");
  s = s.replace(/<br>/g, "\n");
  return s;
}

/**
 * 对象字符串去除前后空格
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
exports.trimObject = function trimObject(obj) {

  switch (typeof obj) {
    case 'object':
      for (var i in obj) {
        obj[i] = trimObject(obj[i]);
      }
      break;
    case 'string':
      obj = obj.trim();
      break;
  }
  return obj;
}

/**
 * 递归菜单项
 * @param forms
 * @param btns
 * @returns {Array}
 */
exports.RecursionMenusToTree = function (isBackstage, forms, btns) {
  //顶级菜单
  var topArray = [];
  var hou = {
    text: '后端系统',
    nodeId: -1,
    preFormID: 0,
    //icon: 'glyphicon glyphicon-list',
    nodes: []
  };
  var qian = {
    text: '前端系统',
    nodeId: -2,
    preFormID: 0,
    //icon: 'glyphicon glyphicon-list',
    nodes: []
  };
  if (isBackstage > 0) {
    topArray.push(hou);
    //后端数组
    topArray[0].nodes = getRecursionArray(forms, btns, -1);
    if (topArray[0].nodes.length > 0) {
      topArray[0].state = {};
      topArray[0].state.checked = true;

    }
  } else {
    topArray.push(qian);
    //前端数组
    topArray[0].nodes = getRecursionArray(forms, btns, -2);
    if (topArray[0].nodes.length > 0) {
      topArray[0].state = {};
      topArray[0].state.checked = true;
    }
  }


  return topArray;

}



/**
 * 递归数组
 * @param array
 * @param pid
 * @returns {Array}
 */
var getRecursionArray = function (forms, btns, pid) {
  var rtn = [];
  for (var item of forms) {
    if (item.preFormID == pid) {
      if (item.has_form_permission > 0) { //判断选中状态
        item.state = {};
        item.state.checked = true;
      } else {
        item.state = {};
        item.state.checked = false;

      }
      item.nodes = getRecursionArray(forms, btns, item.nodeId);
      //组装按钮列表到页面
      var btn_arr = btns.filter(function (m) {
        return m.preFormID == item.nodeId;
      })
      for (var n of btn_arr) {
        n.nodeId = item.nodeId.toString() + '-' + n.nodeId.toString();
        //n.icon = 'fa fa-fw fa-minus-square-o';
        if (n.has_opt_permission > 0) { //判断选中状态
          n.state = {};
          n.state.checked = true;
        } else {
          n.state = {};
          n.state.checked = false;
        }
        item.nodes.push(n);
      }
      // if (btn_arr.length > 0)
      //     item.nodes = btn_arr;
      rtn.push(item);
    }
  }
  return rtn;
}
/**
 * 按base64加密
 * @param data [加密数据]
 * @param inType [输入参数类型]
 */
exports.base64Encrypt = function (data, inType) {
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
exports.base64Decrypt = function (data, outType) {
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
exports.aesEcbEncrypt = function (data, key) {
  var buffer = Buffer.from(key, 'hex');
  var cipher = crypto.createCipheriv('aes-128-ecb', buffer, "");
  // cipher.setAutoPadding(auto_padding = false);
  return cipher.update(data, 'ascii', 'hex'); //+ cipher.final('hex')
}

/**
 * aes按ecb模式加密
 * @param data [加密数据]
 * @param key [密钥]
 */
exports.aesEcbEncryptLatin1 = function (data, key) {
  var buffer = Buffer.from(key, 'hex');
  var cipher = crypto.createCipheriv('aes-128-ecb', buffer, '');
  // cipher.setAutoPadding(auto_padding = false);
  return cipher.update(data, 'latin1', 'hex'); //+ cipher.final('hex')
}

/**
 * aes按ecb模式解密
 * @param data [解密数据]
 * @param key [密钥]
 */
exports.aesEcbDecryptLatin1 = function (data, key) {
  var buffer = Buffer.from(key, 'hex');
  var cipher = crypto.createDecipheriv('aes-128-ecb', buffer, '');
  cipher.setAutoPadding(auto_padding = false);
  return cipher.update(data, 'hex', 'latin1') + cipher.final('latin1'); // + cipher.final('ascii')
}

/**
 * 从字符串中取指定位置数据转化为数值返回(倒序)
 * @param {[string]} data 字符串数据源
 * @param {[start]} 起始位置
 * @param {[leng]} 截取长度
 */
exports.getIntByHex = function (data, start, leng) {
  var sub = data.substr(start, leng);
  var srcData = invertHexStr(sub);
  return parseInt(srcData, 16);
}

/**
 * 从字符串中取指定位置数据转化为数值返回(正序)
 * @param {[string]} data 字符串数据源
 * @param {[start]} 起始位置
 * @param {[leng]} 截取长度
 */
exports.getIntByHexAsc = function (data, start, leng) {
  var sub = data.substr(start, leng);
  var srcData = ToHexStr(sub);
  return parseInt(srcData, 16);
}

/**
 * 从字符串中取指定位置数值转化为数值数组返回(倒序)
 * @param data [数据]
 * @param start [起始位置]
 * @param leng  [截取长度]
 */
exports.getIntArrayByHexStr = function (data, start, leng) {
  var sub = data.substr(start, leng);
  return hexToArray(sub);
}

/**
 * 将数组指定范围的内容转为数值返回(高字节在前)
 */
exports.getIntByArray = function (data, start, leng) {
  if (data.length < start + leng) {
    return 0;
  }
  var val = 0;
  for (var i = start; i < start + leng; i++) {
    val = val << 8;
    val += data[i];
  }
  return val;
}

/**
 * 从字符串中取指定位置数据转为字符串返回
 * @param data [数据]
 * @param start [起始位置]
 * @param leng  [截取长度]
 */
exports.getStrByHex = function (data, start, leng) {
  var sub = data.substr(start, leng);
  var srcData = invertHexStr(sub);
  return srcData;
}

/**
 * 从字节数组取指定位置数据转为字符串返回
 */
exports.getStrByArray = function (data, start, leng) {
  if (!data || data.length < start + leng) {
    return;
  }
  var sliData = data.slice(start, leng);
  return byteToString(sliData);
}

function byteToString(arr) {
  if (typeof arr === 'string') {
    return arr;
  }
  var str = '',
    _arr = arr;
  for (var i = 0; i < _arr.length; i++) {
    var one = _arr[i].toString(2),
      v = one.match(/^1+?(?=0)/);
    if (v && one.length == 8) {
      var bytesLength = v[0].length;
      var store = _arr[i].toString(2).slice(7 - bytesLength);
      for (var st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2);
      }
      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(_arr[i]);
    }
  }
  return str;
}

/**
 * 给字符串前补0
 * @param str [字符串]
 * @param len [总长度]
 */
function padLeft(str, len) {
  var temp = str;
  while (temp.length < len) {
    temp = '0' + temp;
  }
  return temp;
}

exports.padLeft = padLeft;

/**
 * 转十六进制字符串
 */
function ToHexStr(data) {
  if (data.length % 2 == 1) {
    return data;
  }
  var len = data.length / 2;
  var str = '';
  for (var i = 0; i < len; i++) {
    str = str + data[i * 2] + data[i * 2 + 1];
  }
  return str;
}

/**
 * 倒序十六进制字符串
 */
function invertHexStr(data) {
  if (data.length % 2 == 1) {
    return data;
  }
  var len = data.length / 2;
  var str = '';
  for (var i = len - 1; i >= 0; i--) {
    str = str + data[i * 2] + data[i * 2 + 1];
  }
  return str;
}

exports.invertHexStr = invertHexStr;

/**
 * 将int数值转换为占四个字节的byte数组，本方法适用于(高位在前)的顺序。 和bytesToInt配套使用
 * @param {string} data 要转换的int值
 * @return byte数组
 */
function int16ToBytes(data) {
  var value = parseInt(data);
  var src = Array(2).fill(0);
  src[0] = (value >> 8) & 0xFF;
  src[1] = value & 0xFF;
  return src;
}

exports.int16ToBytes = int16ToBytes;

/**
 * 将数值转为字节并插入数组
 */
exports.intToBytesInArray = function (array, val, length) {
  var data = val.toString(16);
  if (data.length % 2 != 0) {
    data = padLeft(data, data.len + 1);
  }
  if (length) {
    data = padLeft(data, length);
  }

  var len = data.length / 2;

  for (var i = len - 1; i >= 0; i--) {
    var s = data.substr(i * 2, 2);
    var v = parseInt(s, 16);
    array.push(v);
  }

  return array;
}

/**
 * 将数值转为字节并插入数组(高字节在前)
 */
exports.intToBytesInArrayDesc = function (array, val, length) {
  var data = val.toString(16);
  if (data.length % 2 != 0) {
    data = padLeft(data, data.len + 1);
  }
  if (length) {
    data = padLeft(data, length);
  }

  var len = data.length / 2;

  for (var i = 0; i < len; i++) {
    var s = data.substr(i * 2, 2);
    var v = parseInt(s, 16);
    array.push(v);
  }

  return array;
}

/**
 * 将16进制字符串拆分字节插入数组
 */
function hexToArray(data) {
  var array = [];
  var len = data.length / 2;

  for (var i = 0; i < len; i++) {
    var s = data.substr(i * 2, 2);
    var v = parseInt(s, 16);
    array.push(v);
  }
  return array;
}

exports.hexToArray = hexToArray;

/**
 * 将数组转为十六进制字符串
 * @param {*} data 
 */
function arrayToHexStr(data) {
  var str = "";

  for (var i = 0; i < data.length; i++) {
    var tmp = data[i].toString(16);
    if (tmp.length == 1) {
      tmp = "0" + tmp;
    }
    str += tmp;
  }

  return str;
}

exports.arrayToHexStr = arrayToHexStr;

/**
 * 16进制字符串转字符串
 */
exports.HexStrToStr = function (data) {
  var array = [];
  var len = data.length / 2;
  var curchar;

  for (var i = 0; i < len; i++) {
    curchar = String.fromCharCode(parseInt(data.substr(i * 2, 2), 16));
    array.push(curchar);
  }
  return array.join('');
}

/**
 * 数值数组转字符串
 */
exports.intArrayToStr = function (data) {
  var array = [];
  var curvar;
  for (var i = 0; i < data.length; i++) {
    curvar = String.fromCharCode(data[i]);
    array.push(curvar);
  }

  return array.join('');
}

/**
 * 字符串转数值数组
 */
exports.strToIntArray = function (data) {
  var array = [];
  var val;

  for (var i = 0; i < data.length; i++) {
    val = data.charCodeAt(i);
    array.push(val);
  }

  return array;
}

/**
 * 对象字符串去除前面0
 */
function trimZero(data) {
  return data.replace(/\b(0+)/gi, "");
}


exports.getAreaList = function (arealist, pid) {
  // var ss=[{
  //    val:'1',
  //    label:'asdas1',
  //    parentId:'0'
  // },
  // {
  //    val:'2',
  //    label:'asdas2',
  //    parentId:'1'
  // },
  // {
  //    val:'3',
  //    label:'asdas3',
  //    parentId:'2'
  // }];
  var list = getAreaArray(arealist, pid);
  return list;
}
/**
 * 递归省市区
 * @param array
 * @returns {Array}
 */
var getAreaArray = function (arealist, pid) {
  var rtn = [];
  for (var item of arealist) {
    if (item.parentId == pid) {
      item.children = getAreaArray(arealist, item.val);
      rtn.push(item);
    }
  }
  return rtn;
}

/**
 * 生成随机字符串
 ** randomWord 产生任意长度随机字母数字组合
 ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
 ** xuanfeng 2014-08-28
 */
exports.randomWord = function (randomFlag, min, max) {
  var str = "",
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}

/**
 * 字符串每隔n个字符加一个分隔符
 * @param str (字符串)
 * @param n （位数）
 * @param delimiter （分隔符）
 * @returns {string}
 */
exports.getstringdelimi = function (str, n, delimiter) {
  var tpstr = '';
  var charlist = str.split('');
  var newlist = [];
  var num = Math.ceil(charlist.length / n);
  for (var i = 0; i < num; i++) {
    newlist.push(charlist.slice(i * n, (i + 1) * n).join(''));
  }
  tpstr = newlist.join(delimiter);
  return tpstr;
}

/**
 * 数组赋值
 * @param {int[]} v [dest数组]
 * @param {int[]} r [src数组]
 * @param {int} vindex [dest数组起始位置]
 * @param {int} rindex [src数组起始位置]
 * @param {int} length [复制的长度]
 */
function memcpy(v, r, vindex, rindex, length) {
  for (var i = 0; i < length; i++) {
    v[vindex + i] = r[i + rindex];
  }
  return v;
}

exports.memcpy = memcpy;

/**
 * 判断月初还是月末
 * @param {int} type [类型， 0：月初；1：月末]
 */
exports.isMouthEndOrStart = function (type) {
  var res = false;
  var date = new Date();
  if (type == 0) {
    if (date.getDate() == 1) {
      res = true;
    }
  } else {
    var currentMouth = date.getMonth();
    date = exports.addTime(1, 'd', date);
    if (currentMouth != date.getMonth()) {
      res = true;
    }
  }
  return res;
}


/**
 * 获取用户ip地址
 * 
 * @param {any} req 
 * @returns 
 * 
 * author:  xzh
 * date: 2017-5-17
 */
exports.getClientIP = function (req) {
  var ipAddress;
  var headers = req.headers;
  var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
  forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
  if (!ipAddress) {
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress.replace('::ffff:', '');
}