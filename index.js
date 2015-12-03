var http = require('http').Server();
var io = require('socket.io')(http);
var redis = require("redis").createClient({host: '192.168.1.106'});
var openSockets = [];

redis.on("message", function(channel, message) {
  console.log(channel + ": " + message);
  // TODO: Read the target subscribers from redis. Do not emit.
  //for(i=0;i < openSockets.size; i++) { openSockets[i].  }
  //"LiveUpdates:#{resource_key}:Subscribers", uid)


  io.emit('LiveUpdate', message);
});
// This LivUpdate need not be the same with the one above (the one is Redis
// the other is Socket.io/websockets.
redis.subscribe("LiveUpdate");

io.on('connection', function(socket){
  console.log('Opened new socket: ' + socket.id);
  openSockets.push(socket);
  console.log(openSockets);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
