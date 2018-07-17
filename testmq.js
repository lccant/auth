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
    default_exchange = connection.exchange('logs',{autoDelete: false});
    let error = connection.queue('error');
    error.bind(default_exchange,'error');
    
    let warning = connection.queue('warning');
    warning.bind(default_exchange, 'warning');

    let system = connection.queue('system');
    system.bind(default_exchange,'system');

    let behavior = connection.queue('behavior');
    behavior.bind(default_exchange,'behavior');

    setInterval(publish_message, 5000);
})

let count= 0;
publish_message = function() {
    const e = new Error('123');
    var message;
    message = {
      service_name: 'hello.service',
      user_name: 'lcc',
      message: 'hello world ~',
      stack: 'this is a stack !'
    };
    message_s = JSON.stringify(message);
    
    default_exchange.publish('error', message);
    default_exchange.publish('warning', message);
    default_exchange.publish('system', message);
    default_exchange.publish('behavior', message);

    return console.log("my-queue message published: " + (JSON.stringify(message)) + " to queue: all");
  }; 


