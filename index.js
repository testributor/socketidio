var port = process.env.PORT || 9000
var http = require('http').Server();
var io = require('socket.io')(http);
var redis = require("redis").createClient({url: process.env.REDIS_URL});

// Returns a socket object matching the specified socket id.
function socketFromId(socketId) {
  return io.sockets.sockets.filter(
    function(socket){ return socket.id == socketId; }
  )[0];
}

// TODO: This is only for debugging. No need to do anything on connection.
io.on('connection', function(socket){
  console.log('Opened new socket: ' + socket.id);
});

redisPublishCallbacks = {
  'LiveUpdates': function(msg){
    try {
      parsedMsg = JSON.parse(msg);
      room = parsedMsg["room"];
      data = parsedMsg["data"];
      io.to(room).emit(room, data);
    } catch (err) { console.log(err) }
  },
  // http://socket.io/docs/rooms-and-namespaces/#
  'RoomSubscriberAdd': function(msg) {
    try {
      parsedMsg = JSON.parse(msg);
      socketId = parsedMsg["socket_id"];
      if(socket = socketFromId(socketId)) {
        socket.join(parsedMsg["room"]);
      }
    } catch (err) { console.log(err) }
  }
}

// We subscribe to 2 different channels on Redis (Pub/Sub)
// Whenever we receive a message from redis we call the relevant callback
// for the channel.
redis.on("message", function(channel, message) {
  if(redisPublishCallbacks[channel]) {
    redisPublishCallbacks[channel](message);
  }
});
redis.subscribe("LiveUpdates"); // Where changes to be pushed to sockets are sent
redis.subscribe("RoomSubscriberAdd"); // Where new subscribers for rooms are sent

http.listen(port, function(){
  console.log('listening on *:' + port);
});
