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
connection.on('ready', function(){
    connection.queue('qqq', function(q){
        console.log('my-queue is already subscribing');
        q.bind('fans','qqq',function(){
            q.subscribe(function(message){
                console.log('----receiveMessage: ',message);
                console.log(message.count)
            })
        });
    })
})

