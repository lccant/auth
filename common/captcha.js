const captcha = require('captchapng');

/**
 * 生成验证码
 * 
 * @param {any} width 
 * @param {any} height 
 * @returns 
 */
let generate = (width, height) => {
  height = height || 30;
  width = width || 100;
  var cap = parseInt(Math.random() * 9000 + 1000);
  var p = new captcha(width, height, cap);
  p.color(180, 180, 180, 100); // 前景色: background (red, green, blue, alpha)
  p.color(parseInt(Math.random() * 255), parseInt(Math.random() * 255), parseInt(Math.random() * 255), 255); //背景色
  var img = p.getBase64();
  img = 'data:image/jpg;base64,' + img;
  //返回验证码数字和图片base64字符串
	return {
		text: cap,
		img: img
	}
}


exports = module.exports = {
  generate
}