var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io') (server);
// Add view engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Home route
app.get('/', function(req, res) {
    res.render('index',{
        title:'hahah',
        components: ['potentiometer', 'piezo', 'phototransistor', 'pushbutton']
    })
    console.log('Hi there...')
})

var buttonValue = 0;

io.on('connection', function(socket) {
    //io.emit('clicked button', buttonValue);
    socket.on('clicked message', function(msg){
        console.log('Received message from client!',msg);
        buttonValue = 1 - buttonValue;
        io.emit('clicked message', buttonValue);
       
    });
    socket.on('disconnect',function(){
        console.log('Server has disconnected');
    });

})

// Server
server.listen(3000, function() {
  console.log('Listening on port 3000...');
});