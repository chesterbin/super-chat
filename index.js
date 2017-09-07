const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');
const escape_html = require('escape-html');

const server = http.createServer();
const io = socketio(server);
const port = 3000;

fs.readFile('./index.html', function(err, html_string){
  if (err) {
    throw err;
  }

io.on('connection', function(socket){
  socket.on('message', function(data) {
    if (data && typeof(data.nickname) =='string' && typeof(data.message) == 'string' && data.nickname && data.message){
      socket.broadcast.emit('message', {nickname: escape_html(data.nickname), message: escape_html(data.message)});
    }
  });
})

server.on('request', function(request, response) {
  response.writeHead(200, {'Content-type': 'text/html'});
  response.end(html_string);
})

server.listen(port, function() {
  console.log('Server running at port ' + port);
})


})
