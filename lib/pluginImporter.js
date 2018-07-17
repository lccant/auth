

    function importMethods(plguinPath, fileName){
        return function newRole() {
            let that = this;
            const plugin = require(plguinPath);
            const getKeys = Object.keys(plugin).filter(key => key.startsWith('get'));
            const postKeys = Object.keys(plugin).filter(key => key.startsWith('post'));

            doInit.apply(that, [fileName, getKeys, postKeys]);
            getKeys.forEach(key => that.add(`${fileName}:${key}`, plugin[key]))
            postKeys.forEach(key => that.add(`${fileName}:${key}`, plugin[key]))
            that.wrap(`${fileName}:*`,function(msg,respond){
                let data = {};
                if(msg.request$){
                    data = msg.request$.req.method == "GET" ? msg.args.query : msg.args.body;
                }else{
                    data = msg;
                }
                this.prior(data, respond);
            })
        }
    }

    function doInit(srvName,getKeys = [],postKeys = []){
        this.add(`init:${srvName}`, function(msg, respond){
            let map = {};
            getKeys.forEach(key=> map[key] = { GET: true });
            postKeys.forEach(key=> map[key] = { POST: true })
            this.act('role:web', {
                routes:{
                    prefix: `/${srvName}`,
                    pin: `${srvName}:*`,
                    map: map
                }
            }, respond)
        });
    }

module.exports = importMethods;