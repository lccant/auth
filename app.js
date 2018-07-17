
const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const http = require('http');
const Seneca = require('seneca');
const SenecaWeb = require('seneca-web');
const cfg = require('./config/index');
const ctl = require('./lib/ctl');
const health = require('./routes/health');
const {deregisterService, registerService} = require('./lib/api');
const seneca = Seneca()

const app = new Koa()
    .use(health.routes(),health.allowedMethods())
    .use(require('koa-bodyparser')())
    .use(require('koa2-cors')())

const senecaWebConfig = {
    context: health,
    adapter: require('seneca-web-adapter-koa2'),
    options: { parseBody: true }
}

seneca.use(SenecaWeb, senecaWebConfig);

//默认所有插件都在controllers文件夹下
const controllersDir = './controllers';
const paths = fs.readdirSync(controllersDir);
//装载seneca插件
paths.forEach(key=>{
    const fileName = path.basename(key, path.extname(key));
    const filePath = path.join(process.cwd(),controllersDir,key);
    seneca.use(require('./lib/pluginImporter')(filePath,fileName));
})

seneca.ready(()=>{
    app.use(seneca.export('web/context')().routes());
    http.createServer(app.callback()).listen(cfg.def.healthcheck_port);//启动服务
}).listen(cfg.def.healthcheck_port);

process.nextTick(()=>{
    deregisterService();
})

setImmediate(()=>{
    registerService();
})

process.on('uncaughtException',function(e){
    console.log('some uncaughtException appears: ', e.message);
})

process.on('unhandledRejection',function(e){
    console.log(e);
})




