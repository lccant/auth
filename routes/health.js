const Router = require('koa-router')
const router = new Router();
const ctlHealth = require('../controller/health');
const role = require('../controller/role')
router.get('/health/check',ctlHealth.check)

// router.get('/role/getUserList', async function(ctx){
//     let ret = await role.getUserList(ctx.query);
//     ctx.body = ret;
// })

module.exports = router;