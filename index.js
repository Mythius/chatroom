var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


const port = 5090;
const path = __dirname+'/';

app.use(express.static(path+'site/'));
app.get(/.*/,function(request,response){
	response.sendFile(path+'site/');
});

http.listen(port,()=>{console.log('Serving Port: '+port)});

io.on('connection',socket=>{
  var name = "";
  socket.on('name',function(n){
    name = n;
  });
  socket.on('msg',function(m){
    io.emit('mes',name + ": " + m);
  });
})