const amqp = require('amqp');

let option = {
    host: '103.229.213.170',
    port: 5672,
    login: 'guest',
    password: 'guest',
    connectionTimeout: 10000,
    authMechanism: 'AMQPLAIN',
    vhost: '/',
    noDelay: true,
    ssl: {
        enabled: false
    }
}
const connection = amqp.createConnection(option);

connection.on('error',function(e){
    console.log("Error from amqp: ", e);
})
let default_exchange = {};
connection.on('ready', function(){
    default_exchange = connection.exchange('fans',{type:'fanout'});
    let q = connection.queue('my-queue');
    q.bind(default_exchange,'my-queue');
    
    let qq = connection.queue('qqq');
    qq.bind(default_exchange, 'qqq');
    setInterval(publish_message, 2000);
})

let count= 0;
publish_message = function() {
    const e = new Error('123');
    var message;
    message = {
      hello: 'world',
      time: Date.now(),
      count: count++
    };
    message_s = JSON.stringify(message);
    
    default_exchange.publish('', message);
    return console.log("my-queue message published: " + (JSON.stringify(message)) + " to queue: my-queue");
  }; 


